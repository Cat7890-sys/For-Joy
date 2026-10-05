/**
 * ==============================================================================
 * OUR STORY INTERACTIVE ENGINE (Inside Standalone Finale Page)
 * ==============================================================================
 * Stages:
 * 1. How Well Do You Remember Us? (10 Questions of 4 types with dynamic reactions)
 * 2. Choose Your Memory (5 Rounds with cinematic focus)
 * 3. The Final Question (User input + private Supabase submission)
 * 4. Our Story — Wrapped (Animated statistics & interactive timeline)
 */

(function () {
  "use strict";

  const SUPABASE_URL = "https://rqehrbituhykrmiujhuk.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_o5hbaYx5BDiX8kqzNV8nYw_4gQ05n3e";

  let supabaseClient = null;

  // Single shared Supabase Client to prevent duplicate GoTrueClient instances
  function getSupabase() {
    if (typeof window !== "undefined" && typeof window.getSupabaseClient === "function") {
      const c = window.getSupabaseClient();
      if (c) return c;
    }
    if (typeof window !== "undefined" && window.__sharedSupabaseClient) {
      return window.__sharedSupabaseClient;
    }
    if (supabaseClient) return supabaseClient;
    if (typeof window !== "undefined" && window.supabase && typeof window.supabase.createClient === "function") {
      try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
        window.__sharedSupabaseClient = supabaseClient;
      } catch (_) {}
    }
    return supabaseClient;
  }

  // OUR STORY ADAPTIVE IMAGE FRAME SYSTEM
  // Adapts the frame dynamically to the image's natural aspect ratio without distortion or cropping
  function adaptFrameToImage(img, frameContainer) {
    if (!img) return;
    const container = frameContainer || img.parentElement;
    if (!container) return;

    function applyRatio() {
      const nw = img.naturalWidth;
      const nh = img.naturalHeight;
      if (!nw || !nh) return;

      const ratio = nw / nh;
      container.style.setProperty("--img-natural-aspect", `${nw} / ${nh}`);
      container.style.setProperty("--img-ratio-num", ratio.toFixed(4));

      container.classList.remove("frame-portrait", "frame-landscape", "frame-square");
      if (ratio < 0.85) {
        container.classList.add("frame-portrait");
      } else if (ratio > 1.2) {
        container.classList.add("frame-landscape");
      } else {
        container.classList.add("frame-square");
      }
    }

    if (img.complete && img.naturalWidth > 0) {
      applyRatio();
    } else {
      img.addEventListener("load", applyRatio, { once: true });
    }
  }

  // Upload Our Story assets directly to Supabase Storage and return permanent public URL
  async function uploadOurStoryFile(folder, file) {
    if (!file) return { success: false, error: "No file provided" };

    // 1. Try window.uploadToSupabaseStorage if available
    if (typeof window.uploadToSupabaseStorage === "function") {
      try {
        const res = await window.uploadToSupabaseStorage(`our-story/${folder}`, file);
        if (res && res.success && res.publicUrl) {
          return { success: true, publicUrl: res.publicUrl };
        }
      } catch (err) {
        console.warn("[Our Story Storage Upload]:", err);
      }
    }

    // 2. Direct SDK Storage upload
    const client = getSupabase();
    if (client && client.storage) {
      try {
        const cleanExt = (file.name.split('.').pop() || 'jpg').toLowerCase();
        const cleanBase = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
        const filePath = `our-story/${folder}/${Date.now()}_${cleanBase}.${cleanExt}`;

        const { data, error } = await client.storage
          .from("Birthday-assets")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (!error && data) {
          const { data: urlData } = client.storage
            .from("Birthday-assets")
            .getPublicUrl(filePath);
          if (urlData && urlData.publicUrl) {
            return { success: true, publicUrl: urlData.publicUrl };
          }
        }
      } catch (sdkErr) {
        console.warn("[Our Story Storage Direct SDK]:", sdkErr);
      }
    }

    // 3. Optimized Data URL fallback
    const dataUrl = await readOurStoryPhoto(file);
    return { success: true, publicUrl: dataUrl, isDataUrl: true };
  }

  // DEFAULT OUR STORY DATA
  const defaultOurStoryData = {
    settings: {
      letterHeading: "Before you go...",
      letterMessage: "I left one more little thing for you.",
      letterSubPrompt: "Let's see what you remember.",
      letterButtonText: "OPEN OUR STORY",
      quizTitle: "HOW WELL DO YOU REMEMBER US?",
      quizSubtitle: "Let's see what survived in that memory of yours 👀",
      finalQuestionPrompt: "If you could relive one moment from our story, which one would it be?",
      wrappedTitle: "OUR STORY",
      wrappedSubtitle: "A little collection of everything we were.",
      finalQuote: "Some chapters end.\nThat doesn't mean they weren't beautiful."
    },
    questions: [
      {
        id: "q1",
        type: "photo_order",
        prompt: "WHICH HAPPENED FIRST?",
        photoA: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80",
        labelA: "That sunny afternoon stroll...",
        photoB: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
        labelB: "That cozy late night ramen date...",
        correctAnswer: "A",
        reactionCorrect: "Look at your memory working overtime! ✨",
        reactionWrong: "You got the timeline mixed up! 😭"
      },
      {
        id: "q2",
        type: "who_likely",
        prompt: "Who was more likely to forget what they were saying halfway through a story?",
        options: ["YOU", "ME"],
        reaction: "Accurate as always. 😂"
      },
      {
        id: "q3",
        type: "multiple_choice",
        prompt: "What was the very first song we both claimed as 'our song'?",
        options: [
          "Golden Hour",
          "Until I Found You",
          "Die For You",
          "Perfect"
        ],
        correctIndex: 0,
        reactionCorrect: "A classic that will never get old. 🎵",
        reactionWrong: "How could you forget our melody? 😭"
      },
      {
        id: "q4",
        type: "memorable_choice",
        prompt: "Which of these moments lives rent-free in your mind?",
        options: [
          "That road trip where we sang at the top of our lungs",
          "That quiet night we sat talking about our future for hours"
        ],
        reaction: "That really was an unforgettable moment. ❤️"
      },
      {
        id: "q5",
        type: "who_likely",
        prompt: "Who was more likely to suggest getting food at 1:00 AM on a random Tuesday?",
        options: ["YOU", "ME"],
        reaction: "Guilty as charged! 🍟"
      },
      {
        id: "q6",
        type: "photo_order",
        prompt: "WHICH HAPPENED FIRST?",
        photoA: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80",
        labelA: "The rooftop sunset smiles...",
        photoB: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
        labelB: "The spontaneous weekend getaway drive...",
        correctAnswer: "A",
        reactionCorrect: "Spot on! That memory is golden.",
        reactionWrong: "Almost, but the rooftop came first! 🌅"
      },
      {
        id: "q7",
        type: "multiple_choice",
        prompt: "What is my absolute favorite thing about you?",
        options: [
          "The way your eyes crinkle when you really laugh",
          "Your kindness and gentle heart",
          "How you make any bad day feel safe",
          "Every single thing about you"
        ],
        correctIndex: 3,
        reactionCorrect: "Always and forever. ❤️",
        reactionWrong: "It's all of it, every single thing. ❤️"
      }
    ],
    memoryRounds: [
      {
        round: 1,
        titleA: "The First Spontaneous Drive",
        photoA: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80",
        captionA: "Windows down, sunset in our rearview mirror, and zero plans on where we were going.",
        titleB: "The Rainy Day Cafe",
        photoB: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
        captionB: "Sitting by the foggy window sipping hot drinks, wishing the rain would never stop."
      },
      {
        round: 2,
        titleA: "The Starlit Rooftop Talks",
        photoA: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80",
        captionA: "Cold breeze, sharing a jacket, and spilling our deepest dreams.",
        titleB: "The Unfiltered Laughs",
        photoB: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80",
        captionB: "Tears in our eyes from laughing so hard at something nobody else found funny."
      },
      {
        round: 3,
        titleA: "The First Celebration",
        photoA: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80",
        captionA: "Celebrating every little milestone like it was the grandest victory.",
        titleB: "The Sunset Silhouette",
        photoB: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
        captionB: "Standing together watching the sky turn pink and gold, time standing still."
      }
    ],
    stats: [
      { id: "s1", icon: "📸", label: "MEMORIES", value: "47", description: "Photos, polaroids, and quiet snapshots" },
      { id: "s2", icon: "🎵", label: "SONGS SHARED", value: "84", description: "Tracks that always sound like you" },
      { id: "s3", icon: "😂", label: "INSIDE JOKES", value: "∞", description: "Too many to ever explain to anyone else" },
      { id: "s4", icon: "🎬", label: "ANIME WATCHED TOGETHER", value: "12", description: "Late nights with snacks and cliffhangers" },
      { id: "s5", icon: "💬", label: "CONVERSATIONS", value: "Countless", description: "From good mornings to sleepy 3am calls" },
      { id: "s6", icon: "❤️", label: "MOMENTS WORTH REMEMBERING", value: "Priceless", description: "Some things don't need a number." }
    ],
    timeline: [
      {
        id: "t1",
        eraTitle: "THE BEGINNING",
        eraDate: "Day One",
        tagline: "Where two worlds collided",
        description: "From hesitant hellos to discovering how easily we could make each other smile. The very first spark of something rare.",
        photos: ["https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80"]
      },
      {
        id: "t2",
        eraTitle: "THE RANDOM ERA",
        eraDate: "The Early Months",
        tagline: "Spontaneous drives & late nights",
        description: "Late night drives with no destination, playlists on shuffle, and laughing until our stomachs hurt. The era of pure freedom.",
        photos: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80"]
      },
      {
        id: "t3",
        eraTitle: "THE GOOD TIMES",
        eraDate: "Unstoppable Joy",
        tagline: "Unfiltered laughter & adventures",
        description: "Every coffee date, every shared meal, every inside joke that became part of our secret language.",
        photos: ["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80"]
      },
      {
        id: "t4",
        eraTitle: "THE MEMORIES",
        eraDate: "The Ones That Stayed",
        tagline: "Quiet comfort & deep peace",
        description: "Realizing that home isn't a place, it's a person. The moments of quiet understanding that anchored us.",
        photos: ["https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80"]
      },
      {
        id: "t5",
        eraTitle: "TODAY",
        eraDate: "Happy Birthday, Joy",
        tagline: "Celebrating the one I adore",
        description: "Standing here today celebrating you. Grateful for every chapter we wrote and every page we shared.",
        photos: ["https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80"]
      }
    ]
  };

  let storyData = JSON.parse(JSON.stringify(defaultOurStoryData));

  // Load from Supabase or localStorage
  async function loadStoryData() {
    try {
      const saved = localStorage.getItem("our_story_content_v1");
      if (saved) {
        storyData = Object.assign({}, defaultOurStoryData, JSON.parse(saved));
      }
    } catch (_) {}

    const client = getSupabase();
    if (client) {
      try {
        // Try fetching settings
        const { data: setRows } = await client.from("our_story_settings").select("*").eq("id", 1).limit(1);
        if (setRows && setRows.length > 0) {
          const row = setRows[0];
          storyData.settings.letterHeading = row.letter_heading || storyData.settings.letterHeading;
          storyData.settings.letterMessage = row.letter_message || storyData.settings.letterMessage;
          storyData.settings.letterButtonText = row.letter_button_text || storyData.settings.letterButtonText;
          storyData.settings.quizTitle = row.quiz_title || storyData.settings.quizTitle;
          storyData.settings.quizSubtitle = row.quiz_subtitle || storyData.settings.quizSubtitle;
          storyData.settings.finalQuestionPrompt = row.final_question_prompt || storyData.settings.finalQuestionPrompt;
          storyData.settings.wrappedTitle = row.wrapped_title || storyData.settings.wrappedTitle;
          storyData.settings.wrappedSubtitle = row.wrapped_subtitle || storyData.settings.wrappedSubtitle;
          storyData.settings.finalQuote = row.final_quote || storyData.settings.finalQuote;
        }

        // Try fetching questions
        const { data: qRows } = await client.from("our_story_quiz_questions").select("*").order("sort_order", { ascending: true });
        if (qRows && qRows.length > 0) {
          const loadedQuestions = qRows.map(q => {
            let correctIdx = undefined;
            if (q.question_type === "multiple_choice") {
              const parsed = parseInt(q.correct_answer, 10);
              correctIdx = !isNaN(parsed) ? parsed : 0;
            }
            return {
              id: q.id,
              type: q.question_type,
              prompt: q.prompt,
              options: q.options || [],
              photoA: q.photo_a,
              labelA: q.label_a,
              photoB: q.photo_b,
              labelB: q.label_b,
              correctAnswer: q.correct_answer,
              correctIndex: correctIdx,
              reactionCorrect: q.reaction_text,
              reactionWrong: q.reaction_wrong_text || "Nahhh, you forgot that? 😭",
              reaction: q.reaction_text
            };
          });

          // Filter out the 3 deleted questions (Original Q1, Q8, Q10)
          const DELETED_PROMPTS = [
            "first official conversation",
            "laughing uncontrollably",
            "freeze one feeling"
          ];
          const activeQuestions = loadedQuestions.filter(q => {
            const p = (q.prompt || "").toLowerCase();
            return !DELETED_PROMPTS.some(dp => p.includes(dp));
          });

          if (activeQuestions.length >= 7) {
            storyData.questions = activeQuestions.slice(0, 7);
          } else if (activeQuestions.length > 0) {
            storyData.questions = activeQuestions;
          }
        }

        // Try fetching memory rounds (exactly 3 rounds active)
        const { data: mRows } = await client.from("our_story_memory_rounds").select("*").order("round_number", { ascending: true });
        if (mRows && mRows.length > 0) {
          storyData.memoryRounds = mRows.slice(0, 3).map(m => ({
            round: m.round_number,
            titleA: m.title_a,
            photoA: m.photo_a,
            captionA: m.caption_a,
            titleB: m.title_b,
            photoB: m.photo_b,
            captionB: m.caption_b
          }));
        } else {
          storyData.memoryRounds = JSON.parse(JSON.stringify(defaultOurStoryData.memoryRounds));
        }

        // Try fetching stats
        const { data: sRows } = await client.from("our_story_stats").select("*").order("sort_order", { ascending: true });
        if (sRows && sRows.length > 0) {
          storyData.stats = sRows.map(s => ({
            id: s.id,
            icon: s.icon,
            label: s.label,
            value: s.stat_value,
            description: s.description
          }));
        }

        // Try fetching timeline
        const { data: tRows } = await client.from("our_story_timeline").select("*").order("sort_order", { ascending: true });
        if (tRows && tRows.length > 0) {
          storyData.timeline = tRows.map(t => ({
            id: t.id,
            eraTitle: t.era_title,
            eraDate: t.era_date,
            tagline: t.tagline,
            description: t.description,
            photos: t.photos || []
          }));
        }

        localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
      } catch (e) {
        console.warn("[Our Story] Supabase load note:", e);
      }
    }

    applySettingsToDOM();
  }

  function applySettingsToDOM() {
    const heading = document.getElementById("letterHeading");
    const msg = document.getElementById("letterMessageText");
    const sub = document.getElementById("letterSubPrompt");
    const btn = document.getElementById("openStoryBtnText");
    const qTitle = document.getElementById("stage1Title");
    const qSub = document.getElementById("stage1Subtitle");
    const finalPrompt = document.getElementById("finalQuestionPromptText");
    const wTitle = document.getElementById("wrappedTitle");
    const wSub = document.getElementById("wrappedSubtitle");
    const quoteText = document.getElementById("storyQuietQuoteText");

    if (heading) heading.textContent = storyData.settings.letterHeading;
    if (msg) msg.textContent = storyData.settings.letterMessage;
    if (sub) sub.textContent = storyData.settings.letterSubPrompt;
    if (btn) btn.textContent = storyData.settings.letterButtonText;
    if (qTitle) qTitle.textContent = storyData.settings.quizTitle;
    if (qSub) qSub.textContent = storyData.settings.quizSubtitle;
    if (finalPrompt) finalPrompt.textContent = storyData.settings.finalQuestionPrompt;
    if (wTitle) wTitle.textContent = storyData.settings.wrappedTitle;
    if (wSub) wSub.textContent = storyData.settings.wrappedSubtitle;
    if (quoteText) quoteText.innerHTML = storyData.settings.finalQuote.replace(/\n/g, "<br>");
  }

  // ENVELOPE INTERACTION
  function resetEnvelope() {
    const envWrapper = document.getElementById("envelopeWrapper");
    const letterModal = document.getElementById("letterModalOverlay");
    const storyOverlay = document.getElementById("ourStoryOverlay");
    if (envWrapper) {
      envWrapper.classList.remove("opening");
    }
    if (letterModal) {
      letterModal.classList.remove("active");
      letterModal.style.display = "none";
    }
    if (storyOverlay) {
      storyOverlay.classList.remove("active");
      storyOverlay.style.display = "none";
    }
  }

  function initEnvelope() {
    const envWrapper = document.getElementById("envelopeWrapper");
    const letterModal = document.getElementById("letterModalOverlay");
    const letterBackdrop = document.getElementById("letterBackdrop");
    const letterCloseBtn = document.getElementById("letterCloseBtn");
    const openOurStoryBtn = document.getElementById("openOurStoryBtn");
    const storyOverlay = document.getElementById("ourStoryOverlay");
    const storyExitBtn = document.getElementById("storyExitBtn");
    const closeStoryFinalBtn = document.getElementById("closeStoryFinalBtn");

    if (!envWrapper || !letterModal) return;

    if (envWrapper.dataset.bound === "true") {
      resetEnvelope();
      return;
    }
    envWrapper.dataset.bound = "true";

    function triggerEnvelopeOpen() {
      if (envWrapper.classList.contains("opening")) return;
      envWrapper.classList.add("opening");

      setTimeout(() => {
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

    if (openOurStoryBtn) {
      openOurStoryBtn.addEventListener("click", () => {
        letterModal.classList.remove("active");
        setTimeout(() => {
          letterModal.style.display = "none";
          if (storyOverlay) {
            storyOverlay.style.display = "flex";
            void storyOverlay.offsetWidth;
            storyOverlay.classList.add("active");
            startOurStoryExperience();
          }
        }, 350);
      });
    }

    if (storyExitBtn) {
      storyExitBtn.addEventListener("click", closeOurStory);
    }
    if (closeStoryFinalBtn) {
      closeStoryFinalBtn.addEventListener("click", closeOurStory);
    }

    function closeOurStory() {
      if (storyOverlay) {
        storyOverlay.classList.remove("active");
        setTimeout(() => {
          storyOverlay.style.display = "none";
          envWrapper.classList.remove("opening");
        }, 400);
      }
    }
  }

  // OUR STORY EXPERIENCE CONTROLLER
  let currentStage = 1;
  let currentQuestionIndex = 0;
  let currentMemoryRoundIndex = 0;

  function setStage(stageNum) {
    currentStage = stageNum;
    const panes = [
      document.getElementById("stage1Pane"),
      document.getElementById("stage2Pane"),
      document.getElementById("stage3Pane"),
      document.getElementById("stage4Pane")
    ];

    panes.forEach((pane, idx) => {
      if (pane) pane.style.display = (idx + 1 === stageNum) ? "block" : "none";
    });

    // Update Top Stage Indicator
    const dots = document.querySelectorAll(".stage-dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx + 1 === stageNum);
      dot.classList.toggle("passed", idx + 1 < stageNum);
    });

    // Scroll to top of story viewport
    const viewport = document.getElementById("storyViewport");
    if (viewport) viewport.scrollTop = 0;
  }

  function startOurStoryExperience() {
    currentStage = 1;
    currentQuestionIndex = 0;
    currentMemoryRoundIndex = 0;
    setStage(1);
    renderCurrentQuestion();
  }

  // STAGE 1: QUIZ ENGINE
  function renderCurrentQuestion() {
    const container = document.getElementById("quizCardContainer");
    const progBar = document.getElementById("quizProgressBar");
    const progLabel = document.getElementById("quizProgressLabel");
    if (!container) return;

    const total = storyData.questions.length;
    const q = storyData.questions[currentQuestionIndex];
    if (!q) {
      // Quiz complete!
      showToast("🎉", "QUIZ COMPLETE! Now let's revisit our memories...", 1800);
      setTimeout(() => {
        setStage(2);
        renderCurrentMemoryRound();
      }, 1800);
      return;
    }

    if (progBar) progBar.style.width = `${((currentQuestionIndex + 1) / total) * 100}%`;
    if (progLabel) progLabel.textContent = `QUESTION ${currentQuestionIndex + 1} / ${total}`;

    container.innerHTML = "";
    const card = document.createElement("div");
    card.className = "quiz-card";

    // 1. Multiple Choice
    if (q.type === "multiple_choice") {
      card.innerHTML = `
        <h3 class="quiz-prompt-text">${q.prompt}</h3>
        <div class="quiz-options-grid">
          ${q.options.map((opt, idx) => `
            <button type="button" class="quiz-opt-btn" data-idx="${idx}">
              <span>${opt}</span>
              <span style="font-size: 1.1rem; opacity: 0.6;">→</span>
            </button>
          `).join("")}
        </div>
      `;

      card.querySelectorAll(".quiz-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const chosenIdx = parseInt(btn.getAttribute("data-idx"), 10);
          const isCorrect = chosenIdx === (q.correctIndex || 0);

          card.querySelectorAll(".quiz-opt-btn").forEach(b => b.style.pointerEvents = "none");
          btn.classList.add(isCorrect ? "selected-correct" : "selected-wrong");

          const reaction = isCorrect ? (q.reactionCorrect || "Okay, you actually remember this one.") : (q.reactionWrong || "Nahhh, you forgot that? 😭");
          showToast(isCorrect ? "✨" : "👀", reaction, 1400);

          setTimeout(() => {
            currentQuestionIndex++;
            renderCurrentQuestion();
          }, 1450);
        });
      });
    }

    // 2. Photo Which Happened First
    else if (q.type === "photo_order") {
      card.innerHTML = `
        <h3 class="quiz-prompt-text">${q.prompt}</h3>
        <div class="quiz-photos-grid">
          <div class="quiz-photo-choice-card" data-choice="A">
            <div class="quiz-photo-thumb-wrap">
              <img src="${q.photoA}" alt="Photo A" />
            </div>
            <div class="quiz-photo-label-box">
              <div class="quiz-photo-tag">PHOTO A</div>
              <div class="quiz-photo-caption">${q.labelA || "Memory A"}</div>
            </div>
          </div>
          <div class="quiz-photo-choice-card" data-choice="B">
            <div class="quiz-photo-thumb-wrap">
              <img src="${q.photoB}" alt="Photo B" />
            </div>
            <div class="quiz-photo-label-box">
              <div class="quiz-photo-tag">PHOTO B</div>
              <div class="quiz-photo-caption">${q.labelB || "Memory B"}</div>
            </div>
          </div>
        </div>
      `;

      card.querySelectorAll(".quiz-photo-choice-card").forEach(photoCard => {
        const img = photoCard.querySelector("img");
        const wrap = photoCard.querySelector(".quiz-photo-thumb-wrap");
        if (img && wrap) adaptFrameToImage(img, wrap);

        photoCard.addEventListener("click", () => {
          const choice = photoCard.getAttribute("data-choice");
          const isCorrect = choice === (q.correctAnswer || "A");

          card.querySelectorAll(".quiz-photo-choice-card").forEach(c => c.style.pointerEvents = "none");
          photoCard.classList.add("selected-card");

          const reaction = isCorrect ? (q.reactionCorrect || "Look at your memory working overtime! ✨") : (q.reactionWrong || "You got the timeline mixed up! 😭");
          showToast(isCorrect ? "📸" : "👀", reaction, 1400);

          setTimeout(() => {
            currentQuestionIndex++;
            renderCurrentQuestion();
          }, 1450);
        });
      });
    }

    // 3. Who Was More Likely To
    else if (q.type === "who_likely") {
      card.innerHTML = `
        <h3 class="quiz-prompt-text">${q.prompt}</h3>
        <div class="quiz-binary-grid">
          <button type="button" class="quiz-binary-btn" data-choice="YOU">YOU</button>
          <button type="button" class="quiz-binary-btn" data-choice="ME">ME</button>
        </div>
      `;

      card.querySelectorAll(".quiz-binary-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          card.querySelectorAll(".quiz-binary-btn").forEach(b => b.style.pointerEvents = "none");
          btn.style.background = "rgba(0, 217, 255, 0.35)";
          btn.style.borderColor = "#00d9ff";

          showToast("😂", q.reaction || "Accurate as always. 😂", 1400);

          setTimeout(() => {
            currentQuestionIndex++;
            renderCurrentQuestion();
          }, 1450);
        });
      });
    }

    // 4. Memorable Choice (Subjective preference)
    else if (q.type === "memorable_choice") {
      card.innerHTML = `
        <h3 class="quiz-prompt-text">${q.prompt}</h3>
        <div class="quiz-options-grid">
          ${q.options.map((opt, idx) => `
            <button type="button" class="quiz-opt-btn" data-idx="${idx}">
              <span>${opt}</span>
              <span style="font-size: 1.1rem; opacity: 0.6;">❤️</span>
            </button>
          `).join("")}
        </div>
      `;

      card.querySelectorAll(".quiz-opt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          card.querySelectorAll(".quiz-opt-btn").forEach(b => b.style.pointerEvents = "none");
          btn.classList.add("selected-neutral");

          showToast("❤️", q.reaction || "That really was an unforgettable moment.", 1400);

          setTimeout(() => {
            currentQuestionIndex++;
            renderCurrentQuestion();
          }, 1450);
        });
      });
    }

    container.appendChild(card);
  }

  function showToast(emoji, text, duration = 1500) {
    const toast = document.getElementById("quizReactionToast");
    const eEl = document.getElementById("quizReactionEmoji");
    const mEl = document.getElementById("quizReactionMsg");
    if (!toast) return;

    if (eEl) eEl.textContent = emoji;
    if (mEl) mEl.textContent = text;

    toast.style.display = "flex";
    toast.classList.remove("hide");

    setTimeout(() => {
      toast.style.display = "none";
    }, duration);
  }

  // STAGE 2: CHOOSE YOUR MEMORY (5 Rounds)
  function renderCurrentMemoryRound() {
    const container = document.getElementById("memoryChoicesGrid");
    const pill = document.getElementById("memoryRoundPill");
    if (!container) return;

    const totalRounds = storyData.memoryRounds.length;
    const r = storyData.memoryRounds[currentMemoryRoundIndex];
    if (!r) {
      // Memory rounds complete!
      setStage(3);
      initFinalQuestionStage();
      return;
    }

    if (pill) pill.textContent = `ROUND ${currentMemoryRoundIndex + 1} / ${totalRounds}`;

    container.innerHTML = `
      <div class="memory-card" id="memCardA" data-choice="A">
        <div class="memory-img-box">
          <img src="${r.photoA}" alt="${r.titleA}" id="liveMemImgA_${r.round}" />
          <label class="memory-swap-photo-btn" onclick="event.stopPropagation()" title="Select photo from device">
            <span>📷</span>
            <span>Change Photo</span>
            <input type="file" accept="image/*" class="live-mem-photo-swap" data-round="${r.round}" data-choice="a" style="display: none;" />
          </label>
        </div>
        <div class="memory-details-box">
          <h4 class="memory-title">${r.titleA}</h4>
          <p class="memory-caption">${r.captionA}</p>
        </div>
      </div>

      <div class="memory-card" id="memCardB" data-choice="B">
        <div class="memory-img-box">
          <img src="${r.photoB}" alt="${r.titleB}" id="liveMemImgB_${r.round}" />
          <label class="memory-swap-photo-btn" onclick="event.stopPropagation()" title="Select photo from device">
            <span>📷</span>
            <span>Change Photo</span>
            <input type="file" accept="image/*" class="live-mem-photo-swap" data-round="${r.round}" data-choice="b" style="display: none;" />
          </label>
        </div>
        <div class="memory-details-box">
          <h4 class="memory-title">${r.titleB}</h4>
          <p class="memory-caption">${r.captionB}</p>
        </div>
      </div>
    `;

    const cardA = document.getElementById("memCardA");
    const cardB = document.getElementById("memCardB");

    const imgA = document.getElementById(`liveMemImgA_${r.round}`);
    const imgB = document.getElementById(`liveMemImgB_${r.round}`);
    if (imgA) adaptFrameToImage(imgA, imgA.parentElement);
    if (imgB) adaptFrameToImage(imgB, imgB.parentElement);

    // Local photo picker for live memory rounds with Supabase Storage upload
    container.querySelectorAll(".live-mem-photo-swap").forEach(input => {
      input.addEventListener("change", async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const choice = input.getAttribute("data-choice");
        const roundNum = parseInt(input.getAttribute("data-round"), 10);
        
        // Immediate local preview while uploading
        const objectUrl = URL.createObjectURL(file);
        const img = document.getElementById(`liveMemImg${choice.toUpperCase()}_${roundNum}`);
        if (img) {
          img.src = objectUrl;
          adaptFrameToImage(img, img.parentElement);
        }

        showOurStoryToast("Uploading photo to Supabase Storage...", "loading");

        const uploadRes = await uploadOurStoryFile("memories", file);
        const finalUrl = uploadRes.publicUrl || objectUrl;

        const roundData = storyData.memoryRounds.find(item => item.round === roundNum);
        if (roundData) {
          if (choice === "a") roundData.photoA = finalUrl;
          else roundData.photoB = finalUrl;
        }

        if (img) {
          img.src = finalUrl;
          adaptFrameToImage(img, img.parentElement);
        }

        // Persist to Supabase database
        const client = getSupabase();
        if (client && roundData) {
          try {
            await client.from("our_story_memory_rounds").upsert({
              round_number: roundData.round,
              title_a: roundData.titleA,
              photo_a: roundData.photoA,
              caption_a: roundData.captionA,
              title_b: roundData.titleB,
              photo_b: roundData.photoB,
              caption_b: roundData.captionB
            });
          } catch (_) {}
        }

        try {
          localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
        } catch (_) {}

        showOurStoryToast("Photo saved to Supabase! ❤️", "success");
      });
    });

    function onSelectMemory(selectedCard, otherCard) {
      cardA.style.pointerEvents = "none";
      cardB.style.pointerEvents = "none";

      selectedCard.classList.add("selected-memory");
      otherCard.classList.add("dimmed-memory");

      setTimeout(() => {
        currentMemoryRoundIndex++;
        renderCurrentMemoryRound();
      }, 1900);
    }

    if (cardA && cardB) {
      cardA.addEventListener("click", () => onSelectMemory(cardA, cardB));
      cardB.addEventListener("click", () => onSelectMemory(cardB, cardA));
    }
  }

  // STAGE 3: THE FINAL QUESTION
  function initFinalQuestionStage() {
    const form = document.getElementById("finalQuestionForm");
    const input = document.getElementById("finalQuestionInput");
    const counter = document.getElementById("finalCharCount");
    const status = document.getElementById("finalSubmitStatus");

    if (input && counter) {
      input.value = "";
      counter.textContent = "0";
      input.addEventListener("input", () => {
        counter.textContent = String(input.value.length);
      });
    }

    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const text = input ? input.value.trim() : "";
        if (!text) return;

        const btn = document.getElementById("finalSubmitBtn");
        if (btn) btn.disabled = true;

        if (status) {
          status.style.display = "block";
          status.textContent = "Saving your moment into our story...";
        }

        // Save to Supabase our_story_final_responses
        try {
          const client = getSupabase();
          if (client) {
            await client.from("our_story_final_responses").insert([{ response_text: text }]);
          }
        } catch (_) {}

        // Save locally
        try {
          const existing = JSON.parse(localStorage.getItem("our_story_my_responses_v1") || "[]");
          existing.push({ text, timestamp: new Date().toISOString() });
          localStorage.setItem("our_story_my_responses_v1", JSON.stringify(existing));
        } catch (_) {}

        if (status) {
          status.textContent = "“" + text + "”\n\nYour answer was saved in my heart. Thank you for remembering.";
        }

        setTimeout(() => {
          setStage(4);
          renderWrappedAndTimeline();
        }, 2200);
      };
    }
  }

  // COMPRESS & OPTIMIZE LOCAL PHOTO FILE
  function readOurStoryPhoto(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type || !file.type.startsWith("image/")) {
        return reject(new Error("File is not an image"));
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1200;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", 0.84));
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Toast feedback helper
  function showOurStoryToast(message, type = "info") {
    let toast = document.getElementById("ourStoryToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "ourStoryToast";
      toast.className = "our-story-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `our-story-toast ${type} show`;
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 4000);
  }

  // Lightbox Viewer
  function openPhotoLightbox(src, caption) {
    let lb = document.getElementById("ourStoryLightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "ourStoryLightbox";
      lb.className = "our-story-lightbox";
      lb.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-dialog">
          <button type="button" class="lightbox-close" aria-label="Close photo preview">&times;</button>
          <img class="lightbox-img" src="" alt="Memory Preview" />
          <div class="lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(lb);
      lb.querySelector(".lightbox-close").onclick = () => lb.classList.remove("active");
      lb.querySelector(".lightbox-backdrop").onclick = () => lb.classList.remove("active");
    }
    const img = lb.querySelector(".lightbox-img");
    const cap = lb.querySelector(".lightbox-caption");
    if (img) img.src = src;
    if (cap) cap.textContent = caption || "";
    lb.classList.add("active");
  }

  // Add photos from local storage to a specific era
  async function addPhotosToEra(eraId, files) {
    if (!files || files.length === 0) return;
    const era = storyData.timeline.find(t => t.id === eraId) || storyData.timeline[0];
    if (!era) return;
    if (!Array.isArray(era.photos)) era.photos = [];

    showOurStoryToast(`Uploading ${files.length} photo(s) to Supabase Storage...`, "loading");

    let addedCount = 0;
    for (const file of files) {
      if (!file.type || !file.type.startsWith("image/")) continue;
      try {
        const uploadRes = await uploadOurStoryFile("timeline", file);
        const photoUrl = uploadRes.publicUrl;
        if (photoUrl) {
          era.photos.push(photoUrl);
          addedCount++;
        }
      } catch (err) {
        console.warn("[Our Story] Error uploading timeline photo:", err);
      }
    }

    if (addedCount > 0) {
      // Update memory count stat
      let totalPhotos = 0;
      storyData.timeline.forEach(t => {
        if (Array.isArray(t.photos)) totalPhotos += t.photos.length;
      });
      const photoStat = storyData.stats.find(s => s.id === "s1" || s.label.toUpperCase().includes("MEMOR"));
      if (photoStat) {
        photoStat.value = String(Math.max(totalPhotos, 47));
      }

      // Save locally to site
      try {
        localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
      } catch (err) {
        console.warn("[Our Story] LocalStorage save notice:", err);
      }

      // Save to Supabase online database if available
      const client = getSupabase();
      if (client) {
        try {
          await client.from("our_story_timeline").upsert({
            id: era.id,
            sort_order: storyData.timeline.indexOf(era),
            era_title: era.eraTitle,
            era_date: era.eraDate,
            tagline: era.tagline,
            description: era.description,
            photos: era.photos
          });
        } catch (e) {
          console.warn("[Our Story] Supabase timeline sync notice:", e);
        }
      }

      // Re-render Wrapped view
      renderWrappedAndTimeline();
      showOurStoryToast(`Added ${addedCount} photo(s) to "${era.eraTitle}"! Saved to Supabase ❤️`, "success");
    } else {
      showOurStoryToast("No valid image files selected or upload failed.", "error");
    }
  }

  // Remove photo from era
  async function removePhotoFromEra(eraId, pIdx) {
    const era = storyData.timeline.find(t => t.id === eraId);
    if (!era || !Array.isArray(era.photos)) return;
    era.photos.splice(pIdx, 1);

    // Save locally
    try {
      localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
    } catch (_) {}

    // Save to Supabase
    const client = getSupabase();
    if (client) {
      try {
        await client.from("our_story_timeline").upsert({
          id: era.id,
          era_title: era.eraTitle,
          era_date: era.eraDate,
          tagline: era.tagline,
          description: era.description,
          photos: era.photos
        });
      } catch (_) {}
    }

    renderWrappedAndTimeline();
    showOurStoryToast("Photo removed from timeline", "info");
  }

  // STAGE 4: OUR STORY — WRAPPED & TIMELINE
  function renderWrappedAndTimeline() {
    const statsGrid = document.getElementById("wrappedStatsGrid");
    const timelineWrap = document.getElementById("interactiveTimelineWrap");
    const replayBtn = document.getElementById("replayStoryBtn");

    if (statsGrid) {
      statsGrid.innerHTML = storyData.stats.map(s => `
        <div class="wrapped-card">
          <div class="wrapped-icon">${s.icon}</div>
          <div class="wrapped-label">${s.label}</div>
          <div class="wrapped-value">${s.value}</div>
          <div class="wrapped-desc">${s.description || ""}</div>
        </div>
      `).join("");
    }

    if (timelineWrap) {
      const eraOptionsHtml = storyData.timeline.map(t => `
        <option value="${t.id}">${escapeHtml(t.eraTitle)} (${escapeHtml(t.eraDate || 'Era')})</option>
      `).join("");

      timelineWrap.innerHTML = `
        <!-- Hero Card: Add Photos From Local Storage to Our Story -->
        <div class="our-story-add-photos-hero-card">
          <div class="add-photos-hero-content">
            <div class="add-photos-badge">📸 PHOTOS &amp; MEMORIES</div>
            <h4 class="add-photos-title">Add Photos to Our Story</h4>
            <p class="add-photos-sub">Upload favorite photos from your device to save them permanently to the site's timeline album.</p>
          </div>
          <div class="add-photos-hero-controls">
            <select class="our-story-era-select" id="ourStoryEraSelector" aria-label="Select story chapter">
              ${eraOptionsHtml}
            </select>
            <label class="btn-add-our-story-main" title="Add photos from local storage">
              <span>＋</span>
              <span>Add Photos</span>
              <input type="file" id="ourStoryHeroFileInput" accept="image/*" multiple style="display: none;" />
            </label>
          </div>
        </div>
      ` + storyData.timeline.map((item, idx) => `
        <div class="timeline-milestone-item ${idx === 0 ? "open" : ""}" data-id="${item.id}">
          <div class="milestone-node"></div>
          <div class="milestone-card">
            <div class="milestone-header-row">
              <span class="milestone-era-title">${item.eraTitle}</span>
              <span class="milestone-era-date">${item.eraDate}</span>
            </div>
            <div class="milestone-tagline">${item.tagline || ""}</div>
            
            <div class="milestone-expandable-content">
              <p class="milestone-desc-text">${item.description || ""}</p>
              
              <div class="milestone-gallery-grid" data-era="${item.id}">
                ${Array.isArray(item.photos) ? item.photos.map((p, pIdx) => `
                  <div class="milestone-gallery-thumb" data-src="${p}" data-era="${item.id}" data-pidx="${pIdx}">
                    <img src="${p}" alt="${escapeHtml(item.eraTitle)} Photo" loading="lazy" />
                    <button type="button" class="thumb-delete-action" data-era="${item.id}" data-pidx="${pIdx}" title="Remove photo from era">&times;</button>
                  </div>
                `).join("") : ""}
                
                <!-- Quick Add Photo button inside this milestone -->
                <label class="milestone-add-photo-btn" title="Add photo from device to ${escapeHtml(item.eraTitle)}">
                  <span class="add-icon">＋</span>
                  <span class="add-label">Add Photo</span>
                  <input type="file" accept="image/*" multiple class="milestone-era-file-input" data-era="${item.id}" style="display: none;" />
                </label>
              </div>
            </div>
          </div>
        </div>
      `).join("");

      // Bind Accordion click (avoid clicking inside gallery thumbs or buttons)
      timelineWrap.querySelectorAll(".milestone-card").forEach(card => {
        card.addEventListener("click", (e) => {
          if (e.target.closest(".milestone-gallery-grid") || e.target.closest("button") || e.target.closest("label") || e.target.closest("input")) {
            return;
          }
          const item = card.closest(".timeline-milestone-item");
          if (item) {
            item.classList.toggle("open");
          }
        });
      });

      // Bind Global Add Photos Input
      const heroFileInput = document.getElementById("ourStoryHeroFileInput");
      const eraSelector = document.getElementById("ourStoryEraSelector");
      if (heroFileInput) {
        heroFileInput.addEventListener("change", (e) => {
          const selectedEraId = eraSelector ? eraSelector.value : storyData.timeline[0]?.id;
          if (e.target.files && e.target.files.length > 0) {
            addPhotosToEra(selectedEraId, Array.from(e.target.files));
          }
          e.target.value = "";
        });
      }

      // Bind Milestone Specific Add Photo Inputs
      timelineWrap.querySelectorAll(".milestone-era-file-input").forEach(input => {
        input.addEventListener("change", (e) => {
          const eraId = input.getAttribute("data-era");
          if (e.target.files && e.target.files.length > 0) {
            addPhotosToEra(eraId, Array.from(e.target.files));
          }
          e.target.value = "";
        });
      });

      // Bind Delete Buttons
      timelineWrap.querySelectorAll(".thumb-delete-action").forEach(delBtn => {
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const eraId = delBtn.getAttribute("data-era");
          const pIdx = parseInt(delBtn.getAttribute("data-pidx"), 10);
          if (eraId && !isNaN(pIdx)) {
            removePhotoFromEra(eraId, pIdx);
          }
        });
      });

      // Bind Lightbox & aspect ratio adaptation on Thumbnails
      timelineWrap.querySelectorAll(".milestone-gallery-thumb").forEach(thumb => {
        const img = thumb.querySelector("img");
        if (img) adaptFrameToImage(img, thumb);

        thumb.addEventListener("click", (e) => {
          if (e.target.closest(".thumb-delete-action")) return;
          const src = thumb.getAttribute("data-src");
          const eraItem = thumb.closest(".timeline-milestone-item");
          const eraTitle = eraItem ? eraItem.querySelector(".milestone-era-title")?.textContent : "Our Memory";
          if (src) {
            openPhotoLightbox(src, eraTitle);
          }
        });
      });
    }

    if (replayBtn) {
      replayBtn.onclick = () => {
        startOurStoryExperience();
      };
    }
  }

  // Escape HTML helper
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ADMIN PORTAL INTEGRATION
  function setupOurStoryAdminControls() {
    const saveBtn = document.getElementById("adminSaveOurStoryBtn");
    const refreshBtn = document.getElementById("adminRefreshOurStoryBtn");
    const refreshSubmissionsBtn = document.getElementById("adminRefreshSubmissionsBtn");
    const addQuestionBtn = document.getElementById("adminAddQuizQuestionBtn");
    const adminTabBtn = document.querySelector('[data-tab="tabOurStoryAdmin"]');

    if (adminTabBtn) {
      adminTabBtn.addEventListener("click", () => {
        populateAdminFields();
        loadSubmissionsForAdmin();
      });
    }

    if (refreshBtn) {
      refreshBtn.addEventListener("click", async () => {
        showAdminStatus("Refreshing from Supabase...", "loading");
        await loadStoryData();
        populateAdminFields();
        await loadSubmissionsForAdmin();
        showAdminStatus("Our Story data refreshed! ✨", "success");
      });
    }

    if (refreshSubmissionsBtn) {
      refreshSubmissionsBtn.addEventListener("click", () => {
        loadSubmissionsForAdmin();
      });
    }

    if (addQuestionBtn) {
      addQuestionBtn.addEventListener("click", () => {
        const newId = "q_" + Date.now();
        storyData.questions.push({
          id: newId,
          type: "multiple_choice",
          prompt: "New quiz question...",
          options: ["Option A", "Option B", "Option C", "Option D"],
          correctIndex: 0,
          reactionCorrect: "You remembered! ✨",
          reactionWrong: "Nahhh, you forgot that? 😭"
        });
        renderAdminQuizQuestions();
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", handleSaveOurStoryAdmin);
    }

    const saveGitHubBtn = document.getElementById("adminSaveOurStoryToGitHubBtn");
    if (saveGitHubBtn) {
      saveGitHubBtn.addEventListener("click", async () => {
        await handleSaveOurStoryAdmin();
        if (typeof window !== "undefined" && typeof window.saveWebsiteChangesToGitHub === "function") {
          showAdminStatus("Committing Our Story & all website assets to GitHub...", "loading");
          await window.saveWebsiteChangesToGitHub();
        } else {
          showAdminStatus("Our Story saved to Supabase & ready in GitHub commit payload! ❤️", "success");
        }
      });
    }

    populateAdminFields();
    loadSubmissionsForAdmin();
  }

  function showAdminStatus(msg, type = "success") {
    const el = document.getElementById("adminOurStoryStatus");
    if (!el) return;
    el.style.display = "block";
    el.className = "storage-upload-status " + (type === "loading" ? "loading" : type === "error" ? "error" : "success");
    el.textContent = msg;
    if (type !== "loading") {
      setTimeout(() => {
        el.style.display = "none";
      }, 4000);
    }
  }

  function populateAdminFields() {
    const headingInput = document.getElementById("storyLetterHeadingInput");
    const btnTextInput = document.getElementById("storyLetterButtonTextInput");
    const msgInput = document.getElementById("storyLetterMessageInput");
    const subPromptInput = document.getElementById("storyLetterSubPromptInput");
    const finalPromptInput = document.getElementById("storyFinalQuestionPromptInput");

    if (headingInput) headingInput.value = storyData.settings.letterHeading || "";
    if (btnTextInput) btnTextInput.value = storyData.settings.letterButtonText || "";
    if (msgInput) msgInput.value = storyData.settings.letterMessage || "";
    if (subPromptInput) subPromptInput.value = storyData.settings.letterSubPrompt || "";
    if (finalPromptInput) finalPromptInput.value = storyData.settings.finalQuestionPrompt || "";

    renderAdminQuizQuestions();
    renderAdminMemoryRounds();
    renderAdminWrappedStats();
    renderAdminTimeline();
  }

  function renderAdminQuizQuestions() {
    const container = document.getElementById("adminQuizQuestionsList");
    const countEl = document.getElementById("adminQuizCount");
    if (countEl) countEl.textContent = String(storyData.questions ? storyData.questions.length : 0);
    if (!container) return;

    container.innerHTML = storyData.questions.map((q, idx) => {
      let optionsHtml = "";
      if (q.type === "multiple_choice") {
        optionsHtml = `
          <div class="form-grid-2" style="margin-top: 0.4rem;">
            ${(q.options || []).map((opt, oIdx) => `
              <div class="form-group" style="margin-bottom: 0.35rem;">
                <label style="font-size: 0.72rem;">Option ${String.fromCharCode(65 + oIdx)} ${q.correctIndex === oIdx ? "(Correct)" : ""}</label>
                <input type="text" class="form-input q-opt-input" data-qid="${q.id}" data-oidx="${oIdx}" value="${escapeHtml(opt)}" />
              </div>
            `).join("")}
          </div>
          <div class="form-grid-2" style="margin-top: 0.4rem;">
            <div class="form-group">
              <label style="font-size: 0.72rem;">Correct Option (0 for A, 1 for B, 2 for C, 3 for D)</label>
              <input type="number" min="0" max="3" class="form-input q-correct-index" data-qid="${q.id}" value="${q.correctIndex ?? 0}" />
            </div>
            <div class="form-group">
              <label style="font-size: 0.72rem;">Correct Reaction</label>
              <input type="text" class="form-input q-reaction-correct" data-qid="${q.id}" value="${escapeHtml(q.reactionCorrect || '')}" />
            </div>
          </div>
        `;
      } else if (q.type === "photo_order") {
        optionsHtml = `
          <div class="form-grid-2" style="margin-top: 0.4rem;">
            <!-- Choice A Photo Picker -->
            <div class="form-group">
              <label style="font-size: 0.72rem; font-weight: 700; color: #ff7aa2; margin-bottom: 0.25rem; display: block;">Photo A (Local File Picker)</label>
              <div class="admin-photo-picker-box">
                <div class="admin-photo-picker-preview" id="quizPhotoPreviewA_${q.id}">
                  <img src="${q.photoA || ''}" alt="Photo A Preview" style="${q.photoA ? '' : 'display: none;'}" />
                  <div class="admin-photo-picker-placeholder" style="${q.photoA ? 'display: none;' : ''}">
                    <span style="font-size: 1.25rem;">📷</span>
                    <span>No photo selected</span>
                  </div>
                </div>
                <label class="btn-admin-choose-file" title="Select photo from local device without server upload">
                  <span>📁 Choose Photo A</span>
                  <input type="file" accept="image/*" class="admin-quiz-photo-file-picker" data-qid="${q.id}" data-choice="a" style="display: none;" />
                </label>
                <div class="picker-badge-instant">⚡ Local File API • URL.createObjectURL()</div>
                <input type="text" class="form-input q-photo-a" data-qid="${q.id}" value="${escapeHtml(q.photoA || '')}" placeholder="Or paste Photo A URL..." style="font-size: 0.72rem; margin-top: 0.25rem; width: 100%;" />
              </div>
              <input type="text" class="form-input q-label-a" data-qid="${q.id}" value="${escapeHtml(q.labelA || '')}" placeholder="Label A (e.g. Memory A)" style="margin-top: 0.4rem;" />
            </div>

            <!-- Choice B Photo Picker -->
            <div class="form-group">
              <label style="font-size: 0.72rem; font-weight: 700; color: #5ef3ff; margin-bottom: 0.25rem; display: block;">Photo B (Local File Picker)</label>
              <div class="admin-photo-picker-box">
                <div class="admin-photo-picker-preview" id="quizPhotoPreviewB_${q.id}">
                  <img src="${q.photoB || ''}" alt="Photo B Preview" style="${q.photoB ? '' : 'display: none;'}" />
                  <div class="admin-photo-picker-placeholder" style="${q.photoB ? 'display: none;' : ''}">
                    <span style="font-size: 1.25rem;">📷</span>
                    <span>No photo selected</span>
                  </div>
                </div>
                <label class="btn-admin-choose-file" title="Select photo from local device without server upload">
                  <span>📁 Choose Photo B</span>
                  <input type="file" accept="image/*" class="admin-quiz-photo-file-picker" data-qid="${q.id}" data-choice="b" style="display: none;" />
                </label>
                <div class="picker-badge-instant">⚡ Local File API • URL.createObjectURL()</div>
                <input type="text" class="form-input q-photo-b" data-qid="${q.id}" value="${escapeHtml(q.photoB || '')}" placeholder="Or paste Photo B URL..." style="font-size: 0.72rem; margin-top: 0.25rem; width: 100%;" />
              </div>
              <input type="text" class="form-input q-label-b" data-qid="${q.id}" value="${escapeHtml(q.labelB || '')}" placeholder="Label B (e.g. Memory B)" style="margin-top: 0.4rem;" />
            </div>
          </div>
          <div class="form-grid-2" style="margin-top: 0.4rem;">
            <div class="form-group">
              <label style="font-size: 0.72rem;">Which Happened First? (A or B)</label>
              <input type="text" class="form-input q-correct-answer" data-qid="${q.id}" value="${escapeHtml(q.correctAnswer || 'A')}" />
            </div>
            <div class="form-group">
              <label style="font-size: 0.72rem;">Correct Reaction</label>
              <input type="text" class="form-input q-reaction-correct" data-qid="${q.id}" value="${escapeHtml(q.reactionCorrect || '')}" />
            </div>
          </div>
        `;
      } else {
        optionsHtml = `
          ${(q.options && q.options.length > 0) ? `
            <div class="form-grid-2" style="margin-top: 0.4rem;">
              ${q.options.map((opt, oIdx) => `
                <div class="form-group" style="margin-bottom: 0.35rem;">
                  <label style="font-size: 0.72rem;">Choice ${oIdx + 1}</label>
                  <input type="text" class="form-input q-opt-input" data-qid="${q.id}" data-oidx="${oIdx}" value="${escapeHtml(opt)}" />
                </div>
              `).join("")}
            </div>
          ` : ''}
          <div class="form-group" style="margin-top: 0.4rem;">
            <label style="font-size: 0.72rem;">Reaction Message</label>
            <input type="text" class="form-input q-reaction" data-qid="${q.id}" value="${escapeHtml(q.reaction || '')}" />
          </div>
        `;
      }

      return `
        <div class="admin-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 0.85rem;" data-qid="${q.id}">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-weight: 700; color: #ff7aa2; font-size: 0.82rem;">Q${idx + 1} • ${q.type.toUpperCase()}</span>
            <button type="button" class="secondary-btn danger-btn delete-quiz-q-btn" data-qid="${q.id}" style="padding: 0.2rem 0.55rem; font-size: 0.72rem;">Delete</button>
          </div>
          <div class="form-group">
            <label style="font-size: 0.75rem;">Question Prompt</label>
            <input type="text" class="form-input q-prompt-input" data-qid="${q.id}" value="${escapeHtml(q.prompt || '')}" />
          </div>
          ${optionsHtml}
        </div>
      `;
    }).join("");

    container.querySelectorAll(".delete-quiz-q-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const qid = btn.getAttribute("data-qid");
        storyData.questions = storyData.questions.filter(q => q.id !== qid);
        renderAdminQuizQuestions();
      });
    });

    // Local File API photo picker for admin quiz questions (photo_order)
    container.querySelectorAll(".admin-quiz-photo-file-picker").forEach(fileInput => {
      fileInput.addEventListener("change", async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const qid = fileInput.getAttribute("data-qid");
        const choice = fileInput.getAttribute("data-choice");

        const previewWrap = document.getElementById(`quizPhotoPreview${choice.toUpperCase()}_${qid}`);
        const img = previewWrap ? previewWrap.querySelector("img") : null;
        const placeholder = previewWrap ? previewWrap.querySelector(".admin-photo-picker-placeholder") : null;

        // Immediate preview while uploading
        const objectUrl = URL.createObjectURL(file);
        if (img) {
          img.src = objectUrl;
          img.style.display = "block";
          adaptFrameToImage(img, previewWrap);
        }
        if (placeholder) placeholder.style.display = "none";

        showAdminStatus(`Uploading Quiz Photo ${choice.toUpperCase()} to Supabase Storage...`, "loading");

        const uploadRes = await uploadOurStoryFile("quiz", file);
        const finalUrl = uploadRes.publicUrl || objectUrl;

        const inputEl = document.querySelector(`.q-photo-${choice}[data-qid="${qid}"]`);
        if (inputEl) inputEl.value = finalUrl;

        const question = storyData.questions.find(q => q.id === qid);
        if (question) {
          if (choice === "a") question.photoA = finalUrl;
          else question.photoB = finalUrl;
        }

        if (img) {
          img.src = finalUrl;
          adaptFrameToImage(img, previewWrap);
        }

        // Persist to Supabase database
        const client = getSupabase();
        if (client && question) {
          try {
            await client.from("our_story_quiz_questions").upsert({
              id: question.id,
              sort_order: storyData.questions.indexOf(question),
              question_type: question.type,
              prompt: question.prompt,
              photo_a: question.photoA,
              label_a: question.labelA,
              photo_b: question.photoB,
              label_b: question.labelB,
              correct_answer: question.correctAnswer
            });
          } catch (_) {}
        }

        try {
          localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
        } catch (_) {}

        showAdminStatus(`Quiz Photo ${choice.toUpperCase()} uploaded & saved to Supabase! ✨`, "success");
      });
    });

    // Apply adaptive framing to existing previews
    container.querySelectorAll(".admin-photo-picker-preview img").forEach(img => {
      if (img.src && img.style.display !== "none") {
        adaptFrameToImage(img, img.parentElement);
      }
    });
  }

  function renderAdminMemoryRounds() {
    const container = document.getElementById("adminMemoryRoundsList");
    if (!container) return;

    // Display and manage exactly 3 active memory rounds
    const activeRounds = (storyData.memoryRounds || []).slice(0, 3);

    container.innerHTML = activeRounds.map((m) => `
      <div class="admin-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 0.85rem;" data-round="${m.round}">
        <h5 style="color: #5ef3ff; margin: 0 0 0.6rem 0; font-size: 0.86rem; font-weight: 700;">ROUND ${m.round} OF 3</h5>
        <div class="form-grid-2">
          <!-- Choice A -->
          <div style="background: rgba(0,0,0,0.25); padding: 0.65rem; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-weight: 700; color: #ff7aa2; font-size: 0.78rem;">Memory A</span>
            </div>
            
            <div class="admin-photo-picker-box">
              <div class="admin-photo-picker-preview" id="memPhotoPreviewA_${m.round}">
                <img src="${m.photoA || ''}" alt="Memory A Preview" style="${m.photoA ? '' : 'display: none;'}" />
                <div class="admin-photo-picker-placeholder" style="${m.photoA ? 'display: none;' : ''}">
                  <span style="font-size: 1.25rem;">📷</span>
                  <span>No photo selected</span>
                </div>
              </div>
              <label class="btn-admin-choose-file" title="Upload photo to Supabase Storage">
                <span>📁 Upload Photo A</span>
                <input type="file" accept="image/*" class="admin-upload-memory-photo" data-round="${m.round}" data-choice="a" style="display: none;" />
              </label>
              <div class="picker-badge-instant">⚡ Supabase Storage • Birthday-assets</div>
              <input type="text" class="form-input m-photo-a" data-round="${m.round}" value="${escapeHtml(m.photoA || '')}" placeholder="Or paste Photo A URL..." style="font-size: 0.72rem; margin-top: 0.25rem; width: 100%;" />
            </div>

            <div class="form-group" style="margin-top: 0.4rem;">
              <label style="font-size: 0.72rem;">Title A</label>
              <input type="text" class="form-input m-title-a" data-round="${m.round}" value="${escapeHtml(m.titleA || '')}" />
            </div>
            <div class="form-group" style="margin-top: 0.35rem;">
              <label style="font-size: 0.72rem;">Caption A</label>
              <input type="text" class="form-input m-caption-a" data-round="${m.round}" value="${escapeHtml(m.captionA || '')}" />
            </div>
          </div>

          <!-- Choice B -->
          <div style="background: rgba(0,0,0,0.25); padding: 0.65rem; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-weight: 700; color: #5ef3ff; font-size: 0.78rem;">Memory B</span>
            </div>
            
            <div class="admin-photo-picker-box">
              <div class="admin-photo-picker-preview" id="memPhotoPreviewB_${m.round}">
                <img src="${m.photoB || ''}" alt="Memory B Preview" style="${m.photoB ? '' : 'display: none;'}" />
                <div class="admin-photo-picker-placeholder" style="${m.photoB ? 'display: none;' : ''}">
                  <span style="font-size: 1.25rem;">📷</span>
                  <span>No photo selected</span>
                </div>
              </div>
              <label class="btn-admin-choose-file" title="Upload photo to Supabase Storage">
                <span>📁 Upload Photo B</span>
                <input type="file" accept="image/*" class="admin-upload-memory-photo" data-round="${m.round}" data-choice="b" style="display: none;" />
              </label>
              <div class="picker-badge-instant">⚡ Supabase Storage • Birthday-assets</div>
              <input type="text" class="form-input m-photo-b" data-round="${m.round}" value="${escapeHtml(m.photoB || '')}" placeholder="Or paste Photo B URL..." style="font-size: 0.72rem; margin-top: 0.25rem; width: 100%;" />
            </div>

            <div class="form-group" style="margin-top: 0.4rem;">
              <label style="font-size: 0.72rem;">Title B</label>
              <input type="text" class="form-input m-title-b" data-round="${m.round}" value="${escapeHtml(m.titleB || '')}" />
            </div>
            <div class="form-group" style="margin-top: 0.35rem;">
              <label style="font-size: 0.72rem;">Caption B</label>
              <input type="text" class="form-input m-caption-b" data-round="${m.round}" value="${escapeHtml(m.captionB || '')}" />
            </div>
          </div>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".admin-upload-memory-photo").forEach(fileInput => {
      fileInput.addEventListener("change", async (e) => {
        const roundNum = parseInt(fileInput.getAttribute("data-round"), 10);
        const choice = fileInput.getAttribute("data-choice");
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const previewWrap = document.getElementById(`memPhotoPreview${choice.toUpperCase()}_${roundNum}`);
        const img = previewWrap ? previewWrap.querySelector("img") : null;
        const placeholder = previewWrap ? previewWrap.querySelector(".admin-photo-picker-placeholder") : null;

        // Immediate preview while uploading
        const objectUrl = URL.createObjectURL(file);
        if (img) {
          img.src = objectUrl;
          img.style.display = "block";
          adaptFrameToImage(img, previewWrap);
        }
        if (placeholder) placeholder.style.display = "none";

        showAdminStatus(`Uploading Memory Photo ${choice.toUpperCase()} (Round ${roundNum}) to Supabase...`, "loading");

        const uploadRes = await uploadOurStoryFile("memories", file);
        const finalUrl = uploadRes.publicUrl || objectUrl;

        const inputEl = document.querySelector(`.m-photo-${choice}[data-round="${roundNum}"]`);
        if (inputEl) inputEl.value = finalUrl;

        const mem = storyData.memoryRounds.find(r => r.round === roundNum);
        if (mem) {
          if (choice === "a") mem.photoA = finalUrl;
          else mem.photoB = finalUrl;
        }

        if (img) {
          img.src = finalUrl;
          adaptFrameToImage(img, previewWrap);
        }

        // Persist to Supabase database
        const client = getSupabase();
        if (client && mem) {
          try {
            await client.from("our_story_memory_rounds").upsert({
              round_number: mem.round,
              title_a: mem.titleA,
              photo_a: mem.photoA,
              caption_a: mem.captionA,
              title_b: mem.titleB,
              photo_b: mem.photoB,
              caption_b: mem.captionB
            });
          } catch (_) {}
        }

        try {
          localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
        } catch (_) {}

        showAdminStatus(`Memory Photo ${choice.toUpperCase()} (Round ${roundNum}) saved to Supabase! ❤️`, "success");
      });
    });

    // Apply adaptive framing to existing memory previews
    container.querySelectorAll(".admin-photo-picker-preview img").forEach(img => {
      if (img.src && img.style.display !== "none") {
        adaptFrameToImage(img, img.parentElement);
      }
    });
  }

  function renderAdminWrappedStats() {
    const container = document.getElementById("adminWrappedStatsList");
    if (!container) return;

    container.innerHTML = storyData.stats.map(s => `
      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 0.75rem;" data-sid="${s.id}">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.4rem;">
          <input type="text" class="form-input stat-icon-input" data-sid="${s.id}" value="${escapeHtml(s.icon || '❤️')}" style="width: 44px; text-align: center; font-size: 1.1rem; padding: 0.2rem;" />
          <input type="text" class="form-input stat-label-input" data-sid="${s.id}" value="${escapeHtml(s.label || '')}" style="flex: 1; font-weight: 700;" placeholder="Label" />
        </div>
        <div class="form-group" style="margin-bottom: 0.4rem;">
          <label style="font-size: 0.7rem;">Value / Number</label>
          <input type="text" class="form-input stat-val-input" data-sid="${s.id}" value="${escapeHtml(s.value || '')}" />
        </div>
        <div class="form-group">
          <label style="font-size: 0.7rem;">Description</label>
          <input type="text" class="form-input stat-desc-input" data-sid="${s.id}" value="${escapeHtml(s.description || '')}" />
        </div>
      </div>
    `).join("");
  }

  function renderAdminTimeline() {
    const container = document.getElementById("adminTimelineList");
    if (!container) return;

    container.innerHTML = storyData.timeline.map((t) => `
      <div class="admin-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 0.85rem;" data-tid="${t.id}">
        <div class="form-grid-2">
          <div class="form-group">
            <label style="font-size: 0.72rem;">Era Title</label>
            <input type="text" class="form-input t-title-input" data-tid="${t.id}" value="${escapeHtml(t.eraTitle || '')}" />
          </div>
          <div class="form-group">
            <label style="font-size: 0.72rem;">Date / Subtitle</label>
            <input type="text" class="form-input t-date-input" data-tid="${t.id}" value="${escapeHtml(t.eraDate || '')}" />
          </div>
        </div>
        <div class="form-group" style="margin-top: 0.35rem;">
          <label style="font-size: 0.72rem;">Tagline</label>
          <input type="text" class="form-input t-tagline-input" data-tid="${t.id}" value="${escapeHtml(t.tagline || '')}" />
        </div>
        <div class="form-group" style="margin-top: 0.35rem;">
          <label style="font-size: 0.72rem;">Description</label>
          <textarea class="form-textarea t-desc-input" rows="2" data-tid="${t.id}">${escapeHtml(t.description || '')}</textarea>
        </div>
        <div class="form-group" style="margin-top: 0.35rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <label style="font-size: 0.72rem;">Photos (${(t.photos || []).length})</label>
            <label style="cursor: pointer; color: #ff85c0; font-size: 0.72rem; display: inline-flex; align-items: center; gap: 4px; font-weight: 700;">
              📁 Add Local Photos
              <input type="file" accept="image/*" multiple class="admin-upload-timeline-file" data-tid="${t.id}" style="display: none;" />
            </label>
          </div>
          <input type="text" class="form-input t-photos-input" data-tid="${t.id}" value="${escapeHtml((t.photos || []).join(', '))}" />
          <div class="admin-timeline-thumbs-row" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px;">
            ${(t.photos || []).map((p, pIdx) => `
              <div style="position: relative; width: 48px; height: 48px; border-radius: 6px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2);">
                <img src="${p}" style="width: 100%; height: 100%; object-fit: cover;" />
                <button type="button" class="btn-remove-admin-tphoto" data-tid="${t.id}" data-pidx="${pIdx}" style="position: absolute; top: 0; right: 0; width: 18px; height: 18px; background: rgba(244,63,94,0.85); color: #fff; border: none; font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center;" title="Delete photo">&times;</button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join("");

    // Bind local photo upload for admin timeline
    container.querySelectorAll(".admin-upload-timeline-file").forEach(input => {
      input.addEventListener("change", async (e) => {
        const tid = input.getAttribute("data-tid");
        const era = storyData.timeline.find(t => t.id === tid);
        if (!era || !e.target.files || e.target.files.length === 0) return;
        if (!Array.isArray(era.photos)) era.photos = [];

        showAdminStatus(`Uploading ${e.target.files.length} photo(s) to Supabase Storage...`, "loading");

        for (const file of e.target.files) {
          if (!file.type || !file.type.startsWith("image/")) continue;
          try {
            const uploadRes = await uploadOurStoryFile("timeline", file);
            if (uploadRes && uploadRes.publicUrl) {
              era.photos.push(uploadRes.publicUrl);
            }
          } catch (err) {
            console.warn(err);
          }
        }

        // Persist to Supabase
        const client = getSupabase();
        if (client) {
          try {
            await client.from("our_story_timeline").upsert({
              id: era.id,
              sort_order: storyData.timeline.indexOf(era),
              era_title: era.eraTitle,
              era_date: era.eraDate,
              tagline: era.tagline,
              description: era.description,
              photos: era.photos
            });
          } catch (_) {}
        }

        try {
          localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
        } catch (_) {}

        renderAdminTimeline();
        showAdminStatus(`Added photos to "${era.eraTitle}" and saved to Supabase! ❤️`, "success");
      });
    });

    // Bind remove photo for admin timeline
    container.querySelectorAll(".btn-remove-admin-tphoto").forEach(btn => {
      btn.addEventListener("click", async () => {
        const tid = btn.getAttribute("data-tid");
        const pIdx = parseInt(btn.getAttribute("data-pidx"), 10);
        const era = storyData.timeline.find(t => t.id === tid);
        if (era && Array.isArray(era.photos)) {
          era.photos.splice(pIdx, 1);

          const client = getSupabase();
          if (client) {
            try {
              await client.from("our_story_timeline").upsert({
                id: era.id,
                sort_order: storyData.timeline.indexOf(era),
                era_title: era.eraTitle,
                era_date: era.eraDate,
                tagline: era.tagline,
                description: era.description,
                photos: era.photos
              });
            } catch (_) {}
          }

          try {
            localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
          } catch (_) {}

          renderAdminTimeline();
          showAdminStatus("Photo removed and saved to Supabase.", "info");
        }
      });
    });
  }

  async function loadSubmissionsForAdmin() {
    const container = document.getElementById("adminSubmissionsList");
    if (!container) return;

    container.innerHTML = `<p style="color: #94a3b8; font-size: 0.82rem; margin: 0;">Loading responses from Supabase...</p>`;

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
      } catch (_) {}
    }

    if (responses.length === 0) {
      try {
        responses = JSON.parse(localStorage.getItem("our_story_my_responses_v1") || "[]").map(r => ({
          response_text: r.text,
          created_at: r.timestamp
        }));
      } catch (_) {}
    }

    if (responses.length === 0) {
      container.innerHTML = `<p style="color: #94a3b8; font-size: 0.82rem; margin: 0;">No responses submitted yet.</p>`;
      return;
    }

    container.innerHTML = responses.map((r, i) => `
      <div style="background: rgba(255, 255, 255, 0.05); border-radius: 8px; padding: 0.65rem 0.85rem; margin-bottom: 0.5rem; border-left: 3px solid #ff2a7a;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
          <span style="font-weight: 700; color: #ff85c0; font-size: 0.78rem;">Submission #${responses.length - i}</span>
          <span style="color: #94a3b8; font-size: 0.72rem;">${r.created_at ? new Date(r.created_at).toLocaleString() : 'Recent'}</span>
        </div>
        <p style="color: #ffffff; font-size: 0.85rem; margin: 0; line-height: 1.4; white-space: pre-wrap;">“${escapeHtml(r.response_text || '')}”</p>
      </div>
    `).join("");
  }

  async function handleSaveOurStoryAdmin() {
    showAdminStatus("Saving Our Story changes to Supabase...", "loading");

    const headingInput = document.getElementById("storyLetterHeadingInput");
    const btnTextInput = document.getElementById("storyLetterButtonTextInput");
    const msgInput = document.getElementById("storyLetterMessageInput");
    const subPromptInput = document.getElementById("storyLetterSubPromptInput");
    const finalPromptInput = document.getElementById("storyFinalQuestionPromptInput");

    if (headingInput) storyData.settings.letterHeading = headingInput.value.trim();
    if (btnTextInput) storyData.settings.letterButtonText = btnTextInput.value.trim();
    if (msgInput) storyData.settings.letterMessage = msgInput.value.trim();
    if (subPromptInput) storyData.settings.letterSubPrompt = subPromptInput.value.trim();
    if (finalPromptInput) storyData.settings.finalQuestionPrompt = finalPromptInput.value.trim();

    // Read Quiz Questions
    storyData.questions.forEach(q => {
      const pEl = document.querySelector(`.q-prompt-input[data-qid="${q.id}"]`);
      if (pEl) q.prompt = pEl.value.trim();

      if (q.options && q.options.length > 0) {
        const optEls = document.querySelectorAll(`.q-opt-input[data-qid="${q.id}"]`);
        optEls.forEach((el, idx) => {
          if (q.options[idx] !== undefined) q.options[idx] = el.value.trim();
        });
      }

      if (q.type === "multiple_choice") {
        const cEl = document.querySelector(`.q-correct-index[data-qid="${q.id}"]`);
        if (cEl) q.correctIndex = parseInt(cEl.value, 10) || 0;
        const rcEl = document.querySelector(`.q-reaction-correct[data-qid="${q.id}"]`);
        if (rcEl) q.reactionCorrect = rcEl.value.trim();
      } else if (q.type === "photo_order") {
        const paEl = document.querySelector(`.q-photo-a[data-qid="${q.id}"]`);
        const laEl = document.querySelector(`.q-label-a[data-qid="${q.id}"]`);
        const pbEl = document.querySelector(`.q-photo-b[data-qid="${q.id}"]`);
        const lbEl = document.querySelector(`.q-label-b[data-qid="${q.id}"]`);
        const caEl = document.querySelector(`.q-correct-answer[data-qid="${q.id}"]`);
        const rcEl = document.querySelector(`.q-reaction-correct[data-qid="${q.id}"]`);
        if (paEl) q.photoA = paEl.value.trim();
        if (laEl) q.labelA = laEl.value.trim();
        if (pbEl) q.photoB = pbEl.value.trim();
        if (lbEl) q.labelB = lbEl.value.trim();
        if (caEl) q.correctAnswer = caEl.value.trim();
        if (rcEl) q.reactionCorrect = rcEl.value.trim();
      } else {
        const rEl = document.querySelector(`.q-reaction[data-qid="${q.id}"]`);
        if (rEl) q.reaction = rEl.value.trim();
      }
    });

    // Read Memory Rounds
    storyData.memoryRounds.forEach(m => {
      const ta = document.querySelector(`.m-title-a[data-round="${m.round}"]`);
      const pa = document.querySelector(`.m-photo-a[data-round="${m.round}"]`);
      const ca = document.querySelector(`.m-caption-a[data-round="${m.round}"]`);
      const tb = document.querySelector(`.m-title-b[data-round="${m.round}"]`);
      const pb = document.querySelector(`.m-photo-b[data-round="${m.round}"]`);
      const cb = document.querySelector(`.m-caption-b[data-round="${m.round}"]`);
      if (ta) m.titleA = ta.value.trim();
      if (pa) m.photoA = pa.value.trim();
      if (ca) m.captionA = ca.value.trim();
      if (tb) m.titleB = tb.value.trim();
      if (pb) m.photoB = pb.value.trim();
      if (cb) m.captionB = cb.value.trim();
    });

    // Read Stats
    storyData.stats.forEach(s => {
      const iEl = document.querySelector(`.stat-icon-input[data-sid="${s.id}"]`);
      const lEl = document.querySelector(`.stat-label-input[data-sid="${s.id}"]`);
      const vEl = document.querySelector(`.stat-val-input[data-sid="${s.id}"]`);
      const dEl = document.querySelector(`.stat-desc-input[data-sid="${s.id}"]`);
      if (iEl) s.icon = iEl.value.trim();
      if (lEl) s.label = lEl.value.trim();
      if (vEl) s.value = vEl.value.trim();
      if (dEl) s.description = dEl.value.trim();
    });

    // Read Timeline
    storyData.timeline.forEach(t => {
      const ti = document.querySelector(`.t-title-input[data-tid="${t.id}"]`);
      const di = document.querySelector(`.t-date-input[data-tid="${t.id}"]`);
      const tg = document.querySelector(`.t-tagline-input[data-tid="${t.id}"]`);
      const de = document.querySelector(`.t-desc-input[data-tid="${t.id}"]`);
      const ph = document.querySelector(`.t-photos-input[data-tid="${t.id}"]`);
      if (ti) t.eraTitle = ti.value.trim();
      if (di) t.eraDate = di.value.trim();
      if (tg) t.tagline = tg.value.trim();
      if (de) t.description = de.value.trim();
      if (ph) {
        t.photos = ph.value.split(',').map(s => s.trim()).filter(Boolean);
      }
    });

    // Save locally
    try {
      localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
    } catch (_) {}

    applySettingsToDOM();

    // Save to Supabase
    let sbSuccess = false;
    const client = getSupabase();
    if (client) {
      try {
        // 1. Settings
        await client.from("our_story_settings").upsert({
          id: 1,
          letter_heading: storyData.settings.letterHeading,
          letter_message: storyData.settings.letterMessage,
          letter_button_text: storyData.settings.letterButtonText,
          quiz_title: storyData.settings.quizTitle,
          quiz_subtitle: storyData.settings.quizSubtitle,
          final_question_prompt: storyData.settings.finalQuestionPrompt,
          wrapped_title: storyData.settings.wrappedTitle,
          wrapped_subtitle: storyData.settings.wrappedSubtitle,
          final_quote: storyData.settings.finalQuote,
          updated_at: new Date().toISOString()
        });

        // 2. Quiz Questions
        try {
          const activeIds = storyData.questions.map(q => q.id);
          const { data: allQ } = await client.from("our_story_quiz_questions").select("id");
          if (allQ && allQ.length > 0) {
            const toDelete = allQ.filter(row => !activeIds.includes(row.id)).map(r => r.id);
            if (toDelete.length > 0) {
              await client.from("our_story_quiz_questions").delete().in("id", toDelete);
            }
          }
        } catch (_) {}

        for (let idx = 0; idx < storyData.questions.length; idx++) {
          const q = storyData.questions[idx];
          await client.from("our_story_quiz_questions").upsert({
            id: q.id,
            sort_order: idx,
            question_type: q.type,
            prompt: q.prompt,
            options: q.options || [],
            photo_a: q.photoA || null,
            label_a: q.labelA || null,
            photo_b: q.photoB || null,
            label_b: q.labelB || null,
            correct_answer: q.correctAnswer || (q.correctIndex !== undefined ? String(q.correctIndex) : null),
            reaction_text: q.reactionCorrect || q.reaction || "Okay, you actually remember this one.",
            reaction_wrong_text: q.reactionWrong || "Nahhh, you forgot that? 😭"
          });
        }

        // 3. Memory rounds
        for (const m of storyData.memoryRounds) {
          await client.from("our_story_memory_rounds").upsert({
            round_number: m.round,
            title_a: m.titleA,
            photo_a: m.photoA,
            caption_a: m.captionA,
            title_b: m.titleB,
            photo_b: m.photoB,
            caption_b: m.captionB
          });
        }

        // 4. Wrapped Stats
        for (let idx = 0; idx < storyData.stats.length; idx++) {
          const s = storyData.stats[idx];
          await client.from("our_story_stats").upsert({
            id: s.id,
            sort_order: idx,
            icon: s.icon,
            label: s.label,
            stat_value: s.value,
            description: s.description
          });
        }

        // 5. Timeline
        for (let idx = 0; idx < storyData.timeline.length; idx++) {
          const t = storyData.timeline[idx];
          await client.from("our_story_timeline").upsert({
            id: t.id,
            sort_order: idx,
            era_title: t.eraTitle,
            era_date: t.eraDate,
            tagline: t.tagline,
            description: t.description,
            photos: t.photos || []
          });
        }

        sbSuccess = true;
      } catch (err) {
        console.warn("[Our Story Admin] Supabase error:", err);
      }
    }

    showAdminStatus(
      sbSuccess ? "Our Story saved successfully to Supabase! ❤️" : "Our Story saved locally! (Supabase sync will retry)",
      "success"
    );
  }

  // INIT
  document.addEventListener("DOMContentLoaded", () => {
    loadStoryData();
    initEnvelope();
    setupOurStoryAdminControls();
  });

  if (typeof window !== "undefined") {
    window.loadStoryData = loadStoryData;
    window.getOurStoryData = () => storyData;
    window.setOurStoryData = (newData) => {
      if (newData && typeof newData === "object") {
        storyData = Object.assign({}, defaultOurStoryData, newData);
        try {
          localStorage.setItem("our_story_content_v1", JSON.stringify(storyData));
        } catch (_) {}
        applySettingsToDOM();
      }
    };
    window.saveOurStoryToSupabase = handleSaveOurStoryAdmin;
    window.setupOurStoryAdminControls = setupOurStoryAdminControls;
    window.initOurStoryEnvelope = initEnvelope;
    window.resetOurStoryEnvelope = resetEnvelope;
    window.startOurStoryExperience = startOurStoryExperience;
  }

})();
