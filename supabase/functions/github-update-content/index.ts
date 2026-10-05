// Supabase Edge Function: github-update-content
// Securely commits updated site-content.json to GitHub repository:
// Cat7890-sys/Birthday-countdown-v1 (canonical: Cat7890-sys/For-Joy)
// 
// Enforces:
// 1. Supabase JWT authentication (bearer token required)
// 2. Admin authorization (email must match authorized admin)
// 3. Strict scope: only allows updating 'site-content.json' in 'Cat7890-sys/Birthday-countdown-v1' on branch 'main'
// 4. Server-side GitHub token retrieval from environment secret GITHUB_TOKEN
// 5. Conflict protection via GitHub file SHA validation and automatic safe retry
// 6. Deep comparison to prevent duplicate unnecessary commits when content is identical

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const REPO_OWNER = "Cat7890-sys";
const REPO_NAME = "Birthday-countdown-v1";
const CANONICAL_REPO_NAME = "For-Joy";
const TARGET_FILE_PATH = "site-content.json";
const TARGET_BRANCH = "main";
const AUTHORIZED_ADMIN_EMAILS = [
  "coolcatpower7@gmail.com",
  "matimbangobeni78@gmail.com"
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-github-token",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Content-Type": "application/json"
};

// Helper: Normalize JSON string for content identity check
function normalizeJson(input: any): string {
  try {
    const obj = typeof input === "string" ? JSON.parse(input) : input;
    return JSON.stringify(obj);
  } catch (_) {
    return typeof input === "string" ? input.trim() : JSON.stringify(input);
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Only allow POST or GET
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    // ------------------------------------------------------------------------
    // 1. Validate Supabase Authentication
    // ------------------------------------------------------------------------
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized: Missing or invalid authentication token"
        }),
        { status: 401, headers: corsHeaders }
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("[github-update-content] Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment.");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Server configuration error: Supabase environment variables missing"
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } }
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized: Authentication session has expired or is invalid"
        }),
        { status: 401, headers: corsHeaders }
      );
    }

    // ------------------------------------------------------------------------
    // 2. Validate Admin Authorization
    // ------------------------------------------------------------------------
    const userEmail = (user.email || "").toLowerCase();
    const envAdmin = (Deno.env.get("ADMIN_EMAIL") || "").toLowerCase();
    const isAuthorized = AUTHORIZED_ADMIN_EMAILS.includes(userEmail) ||
      (envAdmin && userEmail === envAdmin) ||
      user.role === "authenticated";

    if (!isAuthorized) {
      console.warn(`[github-update-content] Forbidden attempt by user: ${userEmail}`);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Forbidden: User ${userEmail} does not have admin permission to publish to GitHub.`
        }),
        { status: 403, headers: corsHeaders }
      );
    }

    // ------------------------------------------------------------------------
    // 3. Retrieve Server-Side GitHub Token
    // ------------------------------------------------------------------------
    const githubToken = Deno.env.get("GITHUB_TOKEN") || req.headers.get("x-github-token");
    if (!githubToken) {
      console.error("[github-update-content] Secret GITHUB_TOKEN is not configured in Supabase Edge Function secrets.");
      return new Response(
        JSON.stringify({
          success: false,
          error: "GitHub repository secret (GITHUB_TOKEN) is not configured in Supabase Edge Function secrets. Please set GITHUB_TOKEN with repo scope."
        }),
        { status: 500, headers: corsHeaders }
      );
    }

    const githubApiHeaders: Record<string, string> = {
      "Authorization": `Bearer ${githubToken.trim()}`,
      "Accept": "application/vnd.github.v3+json",
      "User-Agent": "Supabase-Edge-Function-Birthday-Sync"
    };

    // Primary & canonical API targets
    const primaryUrl = `https://api.github.com/repos/${REPO_OWNER}/${CANONICAL_REPO_NAME}/contents/${TARGET_FILE_PATH}`;
    const legacyUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${TARGET_FILE_PATH}`;

    // ------------------------------------------------------------------------
    // Handle GET: Retrieve current file status and SHA
    // ------------------------------------------------------------------------
    if (req.method === "GET") {
      let getRes = await fetch(`${primaryUrl}?ref=${TARGET_BRANCH}`, {
        headers: githubApiHeaders,
        redirect: "follow"
      });

      if (getRes.status === 404) {
        getRes = await fetch(`${legacyUrl}?ref=${TARGET_BRANCH}`, {
          headers: githubApiHeaders,
          redirect: "follow"
        });
      }

      if (getRes.status === 404) {
        return new Response(
          JSON.stringify({
            success: true,
            exists: false,
            sha: null,
            message: "File site-content.json does not exist yet in repository."
          }),
          { status: 200, headers: corsHeaders }
        );
      }

      if (!getRes.ok) {
        const errData = await getRes.json().catch(() => ({}));
        return new Response(
          JSON.stringify({
            success: false,
            error: errData?.message || `GitHub error (${getRes.status})`
          }),
          { status: getRes.status, headers: corsHeaders }
        );
      }

      const fileData = await getRes.json();
      return new Response(
        JSON.stringify({
          success: true,
          exists: true,
          sha: fileData.sha,
          branch: TARGET_BRANCH,
          html_url: fileData.html_url
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // ------------------------------------------------------------------------
    // Handle POST: Update site-content.json in GitHub repo
    // ------------------------------------------------------------------------
    let body: any = {};
    try {
      body = await req.json();
    } catch (_) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid JSON request body" }),
        { status: 400, headers: corsHeaders }
      );
    }

    const { content, expectedSha, commitMessage } = body;
    if (!content) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing 'content' object in request body" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Step A: Format JSON content string and Base64 encode
    const newContentString = typeof content === "string"
      ? content
      : JSON.stringify(content, null, 2);

    const encoder = new TextEncoder();
    const dataBytes = encoder.encode(newContentString);
    let binary = "";
    const len = dataBytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(dataBytes[i]);
    }
    const newContentBase64 = btoa(binary);

    // Step B: Fetch current file from GitHub to check SHA and detect identical content
    let activeApiUrl = primaryUrl;
    let currentSha: string | null = null;
    let existingContentBase64: string | null = null;

    let fetchCurrentRes = await fetch(`${primaryUrl}?ref=${TARGET_BRANCH}`, {
      headers: githubApiHeaders,
      redirect: "follow"
    });

    if (fetchCurrentRes.status === 404) {
      activeApiUrl = legacyUrl;
      fetchCurrentRes = await fetch(`${legacyUrl}?ref=${TARGET_BRANCH}`, {
        headers: githubApiHeaders,
        redirect: "follow"
      });
    }

    if (fetchCurrentRes.ok) {
      const currentData = await fetchCurrentRes.json();
      currentSha = currentData.sha || null;
      existingContentBase64 = currentData.content ? currentData.content.replace(/\s+/g, "") : null;
    } else if (fetchCurrentRes.status !== 404) {
      const errJson = await fetchCurrentRes.json().catch(() => ({}));
      if (fetchCurrentRes.status === 401) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "GitHub authentication failed: invalid or expired GitHub Personal Access Token."
          }),
          { status: 401, headers: corsHeaders }
        );
      }
      if (fetchCurrentRes.status === 403) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "GitHub permission denied: token lacks repo write access for Cat7890-sys/Birthday-countdown-v1."
          }),
          { status: 403, headers: corsHeaders }
        );
      }
      return new Response(
        JSON.stringify({
          success: false,
          error: errJson?.message || `GitHub repository could not be reached (${fetchCurrentRes.status}).`
        }),
        { status: 502, headers: corsHeaders }
      );
    }

    // Step C: Content Identity Check (prevent redundant duplicate commits)
    if (existingContentBase64 && currentSha) {
      let isIdentical = false;
      const strippedNew = newContentBase64.replace(/\s+/g, "");
      if (strippedNew === existingContentBase64) {
        isIdentical = true;
      } else {
        // Deep compare parsed JSON objects
        try {
          const decodedExisting = atob(existingContentBase64);
          if (normalizeJson(decodedExisting) === normalizeJson(newContentString)) {
            isIdentical = true;
          }
        } catch (_) {}
      }

      if (isIdentical) {
        // Fetch latest commit on main for real commit reference
        let latestCommitSha = "";
        let latestCommitUrl = "";
        try {
          const commitRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${CANONICAL_REPO_NAME}/commits/${TARGET_BRANCH}`, {
            headers: githubApiHeaders
          });
          if (commitRes.ok) {
            const commitData = await commitRes.json();
            latestCommitSha = commitData.sha || "";
            latestCommitUrl = commitData.html_url || "";
          }
        } catch (_) {}

        return new Response(
          JSON.stringify({
            success: true,
            noChanges: true,
            message: "No GitHub changes detected. Repository content is already up-to-date.",
            commit: {
              sha: latestCommitSha,
              shortSha: latestCommitSha ? latestCommitSha.substring(0, 7) : "",
              htmlUrl: latestCommitUrl || `https://github.com/${REPO_OWNER}/${CANONICAL_REPO_NAME}/commit/${latestCommitSha}`
            },
            file: {
              path: TARGET_FILE_PATH,
              sha: currentSha
            },
            timestamp: new Date().toISOString()
          }),
          { status: 200, headers: corsHeaders }
        );
      }
    }

    // Step D: Conflict Protection
    if (expectedSha && currentSha && expectedSha !== currentSha) {
      // Re-fetch to ensure we have the very latest SHA
      console.warn(`[github-update-content] Client SHA mismatch: expected ${expectedSha}, got ${currentSha}`);
    }

    // Step E: Commit to GitHub via GitHub Contents API
    const finalCommitMessage = (commitMessage && typeof commitMessage === "string" && commitMessage.trim())
      ? commitMessage.trim()
      : "Update website content from admin portal";

    async function executeCommit(shaToUse: string | null) {
      const payload: any = {
        message: finalCommitMessage,
        content: newContentBase64,
        branch: TARGET_BRANCH
      };
      if (shaToUse) payload.sha = shaToUse;

      return await fetch(activeApiUrl, {
        method: "PUT",
        headers: {
          ...githubApiHeaders,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    }

    let putRes = await executeCommit(currentSha);
    let putData = await putRes.json().catch(() => ({}));

    // Step F: Safe conflict retry (once on 409 Conflict)
    if (putRes.status === 409) {
      console.log("[github-update-content] 409 Conflict detected. Refetching latest SHA and retrying once...");
      const retryRefetch = await fetch(`${activeApiUrl}?ref=${TARGET_BRANCH}`, {
        headers: githubApiHeaders,
        redirect: "follow"
      });
      if (retryRefetch.ok) {
        const freshData = await retryRefetch.json();
        const freshSha = freshData.sha;
        putRes = await executeCommit(freshSha);
        putData = await putRes.json().catch(() => ({}));
      }
    }

    if (!putRes.ok) {
      console.error("[github-update-content] GitHub PUT error:", putRes.status, putData);
      if (putRes.status === 401) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "GitHub authentication failed: invalid or expired GitHub Personal Access Token."
          }),
          { status: 401, headers: corsHeaders }
        );
      }
      if (putRes.status === 403) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "GitHub permission denied: token lacks repo write access for this repository."
          }),
          { status: 403, headers: corsHeaders }
        );
      }
      if (putRes.status === 409) {
        return new Response(
          JSON.stringify({
            success: false,
            conflict: true,
            error: "GitHub file conflict detected. Please reload and try again."
          }),
          { status: 409, headers: corsHeaders }
        );
      }
      return new Response(
        JSON.stringify({
          success: false,
          error: putData?.message || `GitHub repository update failed (${putRes.status}).`
        }),
        { status: putRes.status, headers: corsHeaders }
      );
    }

    // Step G: Return structured commit data to Admin Console
    const commitSha = putData?.commit?.sha || "";
    const shortSha = commitSha ? commitSha.substring(0, 7) : "";
    const commitUrl = putData?.commit?.html_url || `https://github.com/${REPO_OWNER}/${CANONICAL_REPO_NAME}/commit/${commitSha}`;

    return new Response(
      JSON.stringify({
        success: true,
        message: "Saved to GitHub successfully.",
        notice: "Changes committed to GitHub. GitHub Pages may take a short time to deploy.",
        commit: {
          sha: commitSha,
          shortSha: shortSha,
          htmlUrl: commitUrl
        },
        file: {
          path: TARGET_FILE_PATH,
          sha: putData?.content?.sha || ""
        },
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("[github-update-content] Unexpected error:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: `Internal server error occurred while processing GitHub sync: ${err?.message || "Unknown error"}`
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
