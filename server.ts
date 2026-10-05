import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

const REPO_OWNER = 'Cat7890-sys';
const REPO_NAME = 'Birthday-countdown-v1';
const CANONICAL_REPO_NAME = 'For-Joy';
const TARGET_FILE_PATH = 'site-content.json';
const TARGET_BRANCH = 'main';
const SUPABASE_URL = 'https://rqehrbituhykrmiujhuk.supabase.co';
const AUTHORIZED_ADMIN_EMAILS = [
  'coolcatpower7@gmail.com',
  'matimbangobeni78@gmail.com'
];

function normalizeJson(input: any): string {
  try {
    const obj = typeof input === 'string' ? JSON.parse(input) : input;
    return JSON.stringify(obj);
  } catch (_) {
    return typeof input === 'string' ? input.trim() : JSON.stringify(input);
  }
}

// ----------------------------------------------------------------------------
// GitHub Status Endpoint
// ----------------------------------------------------------------------------
app.get(['/api/github-status', '/api/github/status'], async (_req: Request, res: Response) => {
  try {
    const githubToken = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Birthday-Countdown-Sync'
    };
    if (githubToken) {
      headers['Authorization'] = `Bearer ${githubToken.trim()}`;
    }

    const primaryUrl = `https://api.github.com/repos/${REPO_OWNER}/${CANONICAL_REPO_NAME}/contents/${TARGET_FILE_PATH}?ref=${TARGET_BRANCH}`;
    const commitUrl = `https://api.github.com/repos/${REPO_OWNER}/${CANONICAL_REPO_NAME}/commits/${TARGET_BRANCH}`;

    let fileRes = await fetch(primaryUrl, { headers, redirect: 'follow' });
    if (fileRes.status === 404) {
      fileRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_FILE_PATH}?ref=${TARGET_BRANCH}`, {
        headers,
        redirect: 'follow'
      });
    }

    let fileData: any = null;
    if (fileRes.ok) {
      fileData = await fileRes.json();
    }

    let commitData: any = null;
    const commitRes = await fetch(commitUrl, { headers });
    if (commitRes.ok) {
      commitData = await commitRes.json();
    }

    return res.json({
      success: true,
      exists: Boolean(fileData),
      sha: fileData?.sha || null,
      branch: TARGET_BRANCH,
      commit: commitData ? {
        sha: commitData.sha,
        shortSha: commitData.sha ? commitData.sha.substring(0, 7) : '',
        message: commitData.commit?.message?.split('\n')[0] || '',
        date: commitData.commit?.author?.date || '',
        htmlUrl: commitData.html_url || `https://github.com/${REPO_OWNER}/${CANONICAL_REPO_NAME}/commit/${commitData.sha}`
      } : null
    });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err?.message || 'Failed to fetch GitHub status' });
  }
});

// ----------------------------------------------------------------------------
// GitHub Secure Publishing Endpoint
// ----------------------------------------------------------------------------
app.post(['/api/github-publish', '/api/github/publish'], async (req: Request, res: Response) => {
  try {
    // 1. Verify Supabase JWT token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Missing or invalid authentication token. Please sign in as admin.'
      });
    }

    const token = authHeader.replace('Bearer ', '').trim();
    let userEmail = '';
    let isAuthorized = false;

    try {
      const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'apikey': 'sb_publishable_o5hbaYx5BDiX8kqzNV8nYw_4gQ05n3e'
        }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        userEmail = (userData?.email || '').toLowerCase();
        isAuthorized = AUTHORIZED_ADMIN_EMAILS.includes(userEmail) ||
          userData?.role === 'authenticated';
      }
    } catch (_) {}

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        error: `Forbidden: User ${userEmail || 'requester'} does not have permission to publish changes to GitHub.`
      });
    }

    // 2. Retrieve server-side GitHub Personal Access Token
    const githubToken = process.env.GITHUB_TOKEN || (req.headers['x-github-token'] as string);
    if (!githubToken) {
      return res.status(500).json({
        success: false,
        error: 'GitHub repository secret (GITHUB_TOKEN) is not configured in the server environment. Please set GITHUB_TOKEN in your environment or Supabase secrets with repository write permissions.'
      });
    }

    const githubApiHeaders: Record<string, string> = {
      'Authorization': `Bearer ${githubToken.trim()}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Birthday-Countdown-Sync'
    };

    const { content, expectedSha, commitMessage } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, error: 'Missing content payload in request body' });
    }

    const newContentString = typeof content === 'string'
      ? content
      : JSON.stringify(content, null, 2);
    const newContentBase64 = Buffer.from(newContentString, 'utf-8').toString('base64');

    // 3. Resolve canonical repository URL and fetch current file
    const primaryUrl = `https://api.github.com/repos/${REPO_OWNER}/${CANONICAL_REPO_NAME}/contents/${TARGET_FILE_PATH}`;
    const legacyUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_FILE_PATH}`;

    let activeApiUrl = primaryUrl;
    let currentSha: string | null = null;
    let existingContentBase64: string | null = null;

    let fetchRes = await fetch(`${primaryUrl}?ref=${TARGET_BRANCH}`, {
      headers: githubApiHeaders,
      redirect: 'follow'
    });

    if (fetchRes.status === 404) {
      activeApiUrl = legacyUrl;
      fetchRes = await fetch(`${legacyUrl}?ref=${TARGET_BRANCH}`, {
        headers: githubApiHeaders,
        redirect: 'follow'
      });
    }

    if (fetchRes.ok) {
      const currentData = await fetchRes.json();
      currentSha = currentData.sha || null;
      existingContentBase64 = currentData.content ? currentData.content.replace(/\s+/g, '') : null;
    } else if (fetchRes.status !== 404) {
      if (fetchRes.status === 401) {
        return res.status(401).json({
          success: false,
          error: 'GitHub authentication failed: invalid or expired GitHub Personal Access Token.'
        });
      }
      if (fetchRes.status === 403) {
        return res.status(403).json({
          success: false,
          error: 'GitHub permission denied: token lacks repo write access for this repository.'
        });
      }
      const errData = await fetchRes.json().catch(() => ({}));
      return res.status(fetchRes.status).json({
        success: false,
        error: errData?.message || `GitHub repository could not be reached (${fetchRes.status})`
      });
    }

    // 4. Content Identity Check (prevent duplicate redundant commits)
    if (existingContentBase64 && currentSha) {
      let isIdentical = false;
      const strippedNew = newContentBase64.replace(/\s+/g, '');
      if (strippedNew === existingContentBase64) {
        isIdentical = true;
      } else {
        try {
          const decodedExisting = Buffer.from(existingContentBase64, 'base64').toString('utf-8');
          if (normalizeJson(decodedExisting) === normalizeJson(newContentString)) {
            isIdentical = true;
          }
        } catch (_) {}
      }

      if (isIdentical) {
        let latestCommitSha = '';
        let latestCommitUrl = '';
        try {
          const cRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${CANONICAL_REPO_NAME}/commits/${TARGET_BRANCH}`, {
            headers: githubApiHeaders
          });
          if (cRes.ok) {
            const cData = await cRes.json();
            latestCommitSha = cData.sha || '';
            latestCommitUrl = cData.html_url || '';
          }
        } catch (_) {}

        return res.json({
          success: true,
          noChanges: true,
          message: 'No GitHub changes detected. Repository content is already up-to-date.',
          commit: {
            sha: latestCommitSha,
            shortSha: latestCommitSha ? latestCommitSha.substring(0, 7) : '',
            htmlUrl: latestCommitUrl || `https://github.com/${REPO_OWNER}/${CANONICAL_REPO_NAME}/commit/${latestCommitSha}`
          },
          file: {
            path: TARGET_FILE_PATH,
            sha: currentSha
          },
          timestamp: new Date().toISOString()
        });
      }
    }

    // 5. Commit to GitHub via Contents API
    const finalCommitMessage = (commitMessage && typeof commitMessage === 'string' && commitMessage.trim())
      ? commitMessage.trim()
      : 'Update website content from admin portal';

    async function executeCommit(shaToUse: string | null) {
      const payload: any = {
        message: finalCommitMessage,
        content: newContentBase64,
        branch: TARGET_BRANCH
      };
      if (shaToUse) payload.sha = shaToUse;

      return await fetch(activeApiUrl, {
        method: 'PUT',
        headers: {
          ...githubApiHeaders,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    }

    let putRes = await executeCommit(currentSha);
    let putData = await putRes.json().catch(() => ({}));

    // Safe conflict retry once on 409
    if (putRes.status === 409) {
      console.log('[Server GitHub Publish] 409 Conflict. Refetching latest SHA and retrying...');
      const retryRefetch = await fetch(`${activeApiUrl}?ref=${TARGET_BRANCH}`, {
        headers: githubApiHeaders,
        redirect: 'follow'
      });
      if (retryRefetch.ok) {
        const freshData = await retryRefetch.json();
        putRes = await executeCommit(freshData.sha);
        putData = await putRes.json().catch(() => ({}));
      }
    }

    if (!putRes.ok) {
      if (putRes.status === 401) {
        return res.status(401).json({
          success: false,
          error: 'GitHub authentication failed: invalid or expired GitHub Personal Access Token.'
        });
      }
      if (putRes.status === 403) {
        return res.status(403).json({
          success: false,
          error: 'GitHub permission denied: token lacks repo write access for this repository.'
        });
      }
      if (putRes.status === 409) {
        return res.status(409).json({
          success: false,
          conflict: true,
          error: 'GitHub file conflict detected. Please reload and try again.'
        });
      }
      return res.status(putRes.status).json({
        success: false,
        error: putData?.message || `GitHub repository update failed (${putRes.status})`
      });
    }

    // Also update local site-content.json on disk for synchronization
    try {
      const localFilePath = path.resolve(process.cwd(), 'site-content.json');
      fs.writeFileSync(localFilePath, newContentString, 'utf-8');
    } catch (_) {}

    const commitSha = putData?.commit?.sha || '';
    const shortSha = commitSha ? commitSha.substring(0, 7) : '';
    const commitUrl = putData?.commit?.html_url || `https://github.com/${REPO_OWNER}/${CANONICAL_REPO_NAME}/commit/${commitSha}`;

    return res.json({
      success: true,
      message: 'Saved to GitHub successfully.',
      notice: 'Changes committed to GitHub. GitHub Pages may take a short time to deploy.',
      commit: {
        sha: commitSha,
        shortSha: shortSha,
        htmlUrl: commitUrl
      },
      file: {
        path: TARGET_FILE_PATH,
        sha: putData?.content?.sha || ''
      },
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('[Server GitHub Publish Error]:', err);
    return res.status(500).json({
      success: false,
      error: `Internal server error occurred while publishing to GitHub: ${err?.message || 'Unknown error'}`
    });
  }
});

// ----------------------------------------------------------------------------
// Vite / Static Files Integration
// ----------------------------------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(process.cwd(), 'dist'));

  if (isProduction) {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(process.cwd(), 'dist/index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`[App Server] Running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('[App Server] Failed to start server:', err);
  process.exit(1);
});
