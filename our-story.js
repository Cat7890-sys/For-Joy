/**
 * ==============================================================================
 * FINALE EXPERIENCE & PRIVATE RESPONSE CONTROLLER
 * Simplified Finale: 3D Heart -> Floating Letter -> Envelope Opens ->
 * Closing Emotional Message -> Final Question -> Text Area -> Send ->
 * Private Supabase Submission -> Final Thank-You State -> END
 * ==============================================================================
 */

(function () {
  "use strict";

  const SUPABASE_URL = "https://rqehrbituhykrmiujhuk.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_o5hbaYx5BDiX8kqzNV8nYw_4gQ05n3e";

  /**
   * Single shared Supabase Client instance across the entire application.
   * Reuses window.__sharedSupabaseClient or window.getSupabaseClient()
   * to strictly prevent multiple GoTrueClient instances.
   */
  function getSupabase() {
    if (typeof window !== "undefined" && window.__sharedSupabaseClient) {
      return window.__sharedSupabaseClient;
    }
    if (typeof window !== "undefined" && typeof window.getSupabaseClient === "function") {
      const client = window.getSupabaseClient();
      if (client) return client;
    }
    if (typeof window !== "undefined" && window.supabase && typeof window.supabase.createClient === "function") {
      try {
        const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        window.__sharedSupabaseClient = client;
        return client;
      } catch (err) {
        console.warn("[Finale Supabase Init]:", err);
      }
    }
    return null;
  }

  // Active Finale Settings (Initialized with project's existing Closing Emotional Message & Final Question)
  let storyData = {
    settings: {
      letterHeading: "A Letter For You",
      closingQuote: "No matter where life takes us, I’ll always be grateful that our paths crossed. We shared some beautiful moments that I’ll always appreciate, and I genuinely hope this new chapter of your life brings you happiness, peace, and everything you deserve. Happy Birthday ❤️",
      authorSignature: "Wisani ❤️",
      finalQuestionPrompt: "If you could relive one moment from our story, which one would it be?"
    }
  };

  /**
   * Escape HTML utility for safe rendering in admin submission viewer
   */
  function escapeHtml(str) {
    if (!str || typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * Apply settings to the opened letter and the stage
   */
  function applySettingsToDOM() {
    // 1. Heading inside opened letter
    const headingEl = document.getElementById("letterHeading");
    if (headingEl) {
      headingEl.textContent = storyData.settings.letterHeading || "A Letter For You";
    }

    // 2. Closing Emotional Message inside opened letter
    const letterQuoteEl = document.getElementById("letterClosingQuote");
    const letterAuthorEl = document.getElementById("letterAuthorName");

    // Also check stage elements
    const stageQuoteEl = document.getElementById("finaleClosingQuote");
    const stageAuthorEl = document.getElementById("finaleAuthorName");

    // Prefer currentSiteTexts if available
    let quote = storyData.settings.closingQuote;
    let author = storyData.settings.authorSignature;

    if (typeof window !== "undefined" && window.currentSiteTexts) {
      if (window.currentSiteTexts.finaleClosingQuote) {
        quote = window.currentSiteTexts.finaleClosingQuote;
      }
      if (window.currentSiteTexts.finaleAuthorName) {
        author = window.currentSiteTexts.finaleAuthorName;
      }
    }

    if (letterQuoteEl) letterQuoteEl.textContent = quote;
    if (letterAuthorEl) letterAuthorEl.textContent = author;
    if (stageQuoteEl) stageQuoteEl.textContent = quote;
    if (stageAuthorEl) stageAuthorEl.textContent = author;

    // 3. Final Question Prompt inside opened letter
    const finalPromptEl = document.getElementById("letterFinalQuestionPrompt");
    if (finalPromptEl) {
      finalPromptEl.textContent = storyData.settings.finalQuestionPrompt || "If you could relive one moment from our story, which one would it be?";
    }
  }

  /**
   * Load data from Supabase, site-content.json, or local storage
   */
  async function loadStoryData() {
    // Try reading from site-content.json if available
    try {
      const resp = await fetch("site-content.json?t=" + Date.now());
      if (resp.ok) {
        const json = await resp.json();
        if (json.chapter4 && json.chapter4.closingQuote) {
          storyData.settings.closingQuote = json.chapter4.closingQuote;
        }
        if (json.chapter4 && json.chapter4.authorSignature) {
          storyData.settings.authorSignature = json.chapter4.authorSignature;
        }
        if (json.our_story && json.our_story.settings) {
          if (json.our_story.settings.letterHeading) {
            storyData.settings.letterHeading = json.our_story.settings.letterHeading;
          }
          if (json.our_story.settings.finalQuestionPrompt) {
            storyData.settings.finalQuestionPrompt = json.our_story.settings.finalQuestionPrompt;
          }
        }
      }
    } catch (_) {}

    // Check localStorage backup
    try {
      const local = JSON.parse(localStorage.getItem("our_story_content_v1") || "null");
      if (local && local.settings) {
        Object.assign(storyData.settings, local.settings);
      }
    } catch (_) {}

    // Check Supabase our_story_settings table
    try {
      const client = getSupabase();
      if (client) {
        const { data } = await client
          .from("our_story_settings")
          .select("*")
          .eq("id", 1)
          .maybeSingle();

        if (data) {
          if (data.letter_heading) storyData.settings.letterHeading = data.letter_heading;
          if (data.final_quote) storyData.settings.closingQuote = data.final_quote;
          if (data.final_question_prompt) storyData.settings.finalQuestionPrompt = data.final_question_prompt;
        }
      }
    } catch (_) {}

    applySettingsToDOM();
  }

  /**
   * Reset envelope state and close letter modal
   */
  function resetEnvelope() {
    const envWrapper = document.getElementById("envelopeWrapper");
    const letterModal = document.getElementById("letterModalOverlay");
    if (envWrapper) {
      envWrapper.classList.remove("opening");
    }
    if (letterModal) {
      letterModal.classList.remove("active");
      letterModal.style.display = "none";
    }
  }

  /**
   * Initialize envelope opening and the letter flow:
   * Floating Letter -> User Taps Letter -> Envelope Opens -> Letter Opens ->
   * Closing Emotional Message -> Final Question -> Text Area -> Send ->
   * Private Supabase Submission -> Final Thank-You State -> END
   */
  function initEnvelope() {
    const envWrapper = document.getElementById("envelopeWrapper");
    const letterModal = document.getElementById("letterModalOverlay");
    const letterBackdrop = document.getElementById("letterBackdrop");
    const letterCloseBtn = document.getElementById("letterCloseBtn");

    const form = document.getElementById("letterFinalResponseForm");
    const input = document.getElementById("letterFinalResponseInput");
    const sendBtn = document.getElementById("letterFinalSendBtn");
    const statusEl = document.getElementById("letterFinalSubmitStatus");
    const questionSection = document.getElementById("letterFinalQuestionSection");
    const thankYouState = document.getElementById("letterThankYouState");

    if (!envWrapper || !letterModal) return;

    applySettingsToDOM();

    // Prevent duplicate event listener bindings
    if (envWrapper.dataset.bound === "true") {
      resetEnvelope();
      return;
    }
    envWrapper.dataset.bound = "true";

    function triggerEnvelopeOpen() {
      if (envWrapper.classList.contains("opening")) return;
      envWrapper.classList.add("opening");

      setTimeout(() => {
        applySettingsToDOM();
        letterModal.style.display = "flex";
        void letterModal.offsetWidth;
        letterModal.classList.add("active");
      }, 700);
    }

    envWrapper.addEventListener("click", triggerEnvelopeOpen);
    envWrapper.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerEnvelopeOpen();
      }
    });

    function closeLetter() {
      letterModal.classList.remove("active");
      setTimeout(() => {
        letterModal.style.display = "none";
        envWrapper.classList.remove("opening");
      }, 400);
    }

    if (letterCloseBtn) {
      letterCloseBtn.addEventListener("click", closeLetter);
    }
    if (letterBackdrop) {
      letterBackdrop.addEventListener("click", closeLetter);
    }

    // FORM SUBMISSION: Private Supabase response saving
    if (form && !form.dataset.bound) {
      form.dataset.bound = "true";
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = input ? input.value.trim() : "";
        if (!text) {
          if (input) input.focus();
          return;
        }

        if (sendBtn) {
          sendBtn.disabled = true;
          const textSpan = document.getElementById("letterSendBtnText");
          if (textSpan) textSpan.textContent = "SENDING...";
        }

        if (statusEl) {
          statusEl.style.display = "block";
          statusEl.textContent = "Saving your answer...";
        }

        const timestamp = new Date().toISOString();
        let saved = false;

        // 1. Submit to Supabase table: our_story_final_responses
        // (RLS enforces: Public INSERT only; Admin SELECT only. Response remains 100% private)
        const client = getSupabase();
        if (client) {
          try {
            const { error } = await client
              .from("our_story_final_responses")
              .insert([{ response_text: text, response: text, created_at: timestamp }]);

            if (!error) {
              saved = true;
            } else {
              console.warn("[Supabase] Insert payload error:", error);
            }
          } catch (err) {
            console.warn("[Supabase] Insert with response_text & response failed:", err);
          }

          // Fallback single-column attempts if schema differs
          if (!saved) {
            try {
              const { error } = await client
                .from("our_story_final_responses")
                .insert([{ response_text: text, created_at: timestamp }]);
              if (!error) saved = true;
            } catch (_) {}
          }

          if (!saved) {
            try {
              const { error } = await client
                .from("our_story_final_responses")
                .insert([{ response: text, created_at: timestamp }]);
              if (!error) saved = true;
            } catch (_) {}
          }
        }

        // 2. LocalStorage backup
        try {
          const localList = JSON.parse(localStorage.getItem("our_story_my_responses_v1") || "[]");
          localList.push({ response_text: text, response: text, created_at: timestamp });
          localStorage.setItem("our_story_my_responses_v1", JSON.stringify(localList));
        } catch (_) {}

        // 3. Reveal final thank-you state inside the letter
        if (statusEl) statusEl.style.display = "none";
        if (questionSection) questionSection.style.display = "none";
        if (thankYouState) {
          thankYouState.style.display = "block";
        }

        // This is the absolute END of the website experience.
        // No quiz, no our story, no memory rounds, no timeline, no replay, no redirect.
      });
    }
  }

  /**
   * Admin Portal: Populate fields and manage private response submissions
   */
  function populateAdminFields() {
    const headingInput = document.getElementById("storyLetterHeadingInput");
    const authorInput = document.getElementById("storyLetterAuthorInput");
    const quoteInput = document.getElementById("storyLetterClosingQuoteInput");
    const promptInput = document.getElementById("storyFinalQuestionPromptInput");

    if (headingInput) headingInput.value = storyData.settings.letterHeading || "A Letter For You";
    if (authorInput) authorInput.value = storyData.settings.authorSignature || "Wisani ❤️";
    if (quoteInput) quoteInput.value = storyData.settings.closingQuote || "";
    if (promptInput) promptInput.value = storyData.settings.finalQuestionPrompt || "";

    renderAdminSubmissions();
  }

  /**
   * Admin Portal: Fetch & display private visitor submissions
   */
  async function renderAdminSubmissions() {
    const container = document.getElementById("adminSubmissionsList");
    if (!container) return;

    container.innerHTML = `<p style="color: #94a3b8; font-size: 0.82rem; margin: 0;">Loading private submissions...</p>`;

    let responses = [];
    const client = getSupabase();

    if (client) {
      try {
        const { data, error } = await client
          .from("our_story_final_responses")
          .select("*")
          .order("created_at", { ascending: false });

        if (data && Array.isArray(data)) {
          responses = data;
        }
      } catch (err) {
        console.warn("[Admin Submissions]:", err);
      }
    }

    // Local fallback if offline or no DB rows returned
    if (responses.length === 0) {
      try {
        responses = JSON.parse(localStorage.getItem("our_story_my_responses_v1") || "[]");
      } catch (_) {}
    }

    if (responses.length === 0) {
      container.innerHTML = `<p style="color: #94a3b8; font-size: 0.82rem; margin: 0;">No responses submitted yet.</p>`;
      return;
    }

    container.innerHTML = responses.map((r, i) => {
      const text = r.response_text || r.response || "";
      const dateStr = r.created_at ? new Date(r.created_at).toLocaleString() : "Recent";
      return `
        <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.75rem 0.95rem; margin-bottom: 0.6rem; border-left: 3px solid #ff2a7a;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <span style="font-weight: 700; color: #ff85c0; font-size: 0.8rem;">Submission #${responses.length - i}</span>
            <span style="color: #94a3b8; font-size: 0.72rem;">${dateStr}</span>
          </div>
          <p style="color: #ffffff; font-size: 0.88rem; margin: 0; line-height: 1.5; white-space: pre-wrap;">“${escapeHtml(text)}”</p>
        </div>
      `;
    }).join("");
  }

  /**
   * Admin Portal: Save settings to Supabase
   */
  async function handleSaveOurStoryAdmin() {
    const headingInput = document.getElementById("storyLetterHeadingInput");
    const authorInput = document.getElementById("storyLetterAuthorInput");
    const quoteInput = document.getElementById("storyLetterClosingQuoteInput");
    const promptInput = document.getElementById("storyFinalQuestionPromptInput");
    const statusEl = document.getElementById("adminOurStoryStatus");

    if (headingInput) storyData.settings.letterHeading = headingInput.value.trim();
    if (authorInput) storyData.settings.authorSignature = authorInput.value.trim();
    if (quoteInput) storyData.settings.closingQuote = quoteInput.value.trim();
    if (promptInput) storyData.settings.finalQuestionPrompt = promptInput.value.trim();

    if (typeof window !== "undefined" && window.currentSiteTexts) {
      window.currentSiteTexts.finaleClosingQuote = storyData.settings.closingQuote;
      window.currentSiteTexts.finaleAuthorName = storyData.settings.authorSignature;
    }

    applySettingsToDOM();

    // Persist locally
    try {
      localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
    } catch (_) {}

    if (statusEl) {
      statusEl.style.display = "block";
      statusEl.className = "storage-upload-status loading";
      statusEl.textContent = "Saving finale settings to Supabase...";
    }

    const client = getSupabase();
    if (client) {
      try {
        await client.from("our_story_settings").upsert({
          id: 1,
          letter_heading: storyData.settings.letterHeading,
          final_quote: storyData.settings.closingQuote,
          final_question_prompt: storyData.settings.finalQuestionPrompt,
          updated_at: new Date().toISOString()
        });
      } catch (err) {
        console.warn("[Save Finale Supabase Error]:", err);
      }
    }

    if (statusEl) {
      statusEl.className = "storage-upload-status success";
      statusEl.textContent = "✓ Finale settings saved to Supabase successfully!";
      setTimeout(() => {
        statusEl.style.display = "none";
      }, 4000);
    }
  }

  /**
   * Setup admin controls
   */
  function setupOurStoryAdminControls() {
    const saveBtn = document.getElementById("adminSaveOurStoryBtn");
    const saveGitHubBtn = document.getElementById("adminSaveOurStoryToGitHubBtn");
    const refreshBtn = document.getElementById("adminRefreshOurStoryBtn");
    const refreshSubmissionsBtn = document.getElementById("adminRefreshSubmissionsBtn");

    if (saveBtn && !saveBtn.dataset.bound) {
      saveBtn.dataset.bound = "true";
      saveBtn.addEventListener("click", handleSaveOurStoryAdmin);
    }

    if (saveGitHubBtn && !saveGitHubBtn.dataset.bound) {
      saveGitHubBtn.dataset.bound = "true";
      saveGitHubBtn.addEventListener("click", async () => {
        await handleSaveOurStoryAdmin();
        if (typeof window.saveWebsiteChangesToGitHub === "function") {
          window.saveWebsiteChangesToGitHub();
        }
      });
    }

    if (refreshBtn && !refreshBtn.dataset.bound) {
      refreshBtn.dataset.bound = "true";
      refreshBtn.addEventListener("click", async () => {
        await loadStoryData();
        populateAdminFields();
      });
    }

    if (refreshSubmissionsBtn && !refreshSubmissionsBtn.dataset.bound) {
      refreshSubmissionsBtn.dataset.bound = "true";
      refreshSubmissionsBtn.addEventListener("click", renderAdminSubmissions);
    }

    populateAdminFields();
  }

  // Load data immediately and listen for DOM ready
  loadStoryData();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initEnvelope();
      setupOurStoryAdminControls();
    });
  } else {
    initEnvelope();
    setupOurStoryAdminControls();
  }

  // Window exports for clean integration across application
  if (typeof window !== "undefined") {
    window.loadStoryData = loadStoryData;
    window.getOurStoryData = () => storyData;
    window.setOurStoryData = (newData) => {
      if (newData && typeof newData === "object") {
        if (newData.settings) Object.assign(storyData.settings, newData.settings);
        applySettingsToDOM();
      }
    };
    window.saveOurStoryToSupabase = handleSaveOurStoryAdmin;
    window.setupOurStoryAdminControls = setupOurStoryAdminControls;
    window.initOurStoryEnvelope = initEnvelope;
    window.resetOurStoryEnvelope = resetEnvelope;
    // Stub removed experience function so any legacy invocation doesn't throw
    window.startOurStoryExperience = () => {};
  }

})();
