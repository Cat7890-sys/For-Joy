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

  function getSupabase() {
    if (supabaseClient) return supabaseClient;
    if (window.supabase && typeof window.supabase.createClient === "function") {
      try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
      } catch (_) {}
    }
    return supabaseClient;
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
        type: "multiple_choice",
        prompt: "Where did we have our very first official conversation?",
        options: [
          "Over Instagram DMs until 3am",
          "At that little coffee shop on the corner",
          "In the car outside while it was raining",
          "At a mutual friend's birthday party"
        ],
        correctIndex: 0,
        reactionCorrect: "Okay, you actually remember this one. ✨",
        reactionWrong: "Nahhh, you forgot that? 😭"
      },
      {
        id: "q2",
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
        id: "q3",
        type: "who_likely",
        prompt: "Who was more likely to forget what they were saying halfway through a story?",
        options: ["YOU", "ME"],
        reaction: "Accurate as always. 😂"
      },
      {
        id: "q4",
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
        id: "q5",
        type: "memorable_choice",
        prompt: "Which of these moments lives rent-free in your mind?",
        options: [
          "That road trip where we sang at the top of our lungs",
          "That quiet night we sat talking about our future for hours"
        ],
        reaction: "That really was an unforgettable moment. ❤️"
      },
      {
        id: "q6",
        type: "who_likely",
        prompt: "Who was more likely to suggest getting food at 1:00 AM on a random Tuesday?",
        options: ["YOU", "ME"],
        reaction: "Guilty as charged! 🍟"
      },
      {
        id: "q7",
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
        id: "q8",
        type: "multiple_choice",
        prompt: "What do we always end up laughing uncontrollably about?",
        options: [
          "Our absurd inside jokes no one else understands",
          "The way we both trip over our own words",
          "Every single time GPS gave us terrible directions",
          "All of the above without question"
        ],
        correctIndex: 3,
        reactionCorrect: "That one was easy. 😭",
        reactionWrong: "It's definitely all of the above! 😂"
      },
      {
        id: "q9",
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
      },
      {
        id: "q10",
        type: "memorable_choice",
        prompt: "If you could freeze one feeling in time, which would it be?",
        options: [
          "The feeling of seeing each other after days apart",
          "The comfortable silence where nothing else matters"
        ],
        reaction: "A feeling worth keeping forever. ✨"
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
      },
      {
        round: 4,
        titleA: "The Late Night Taco Runs",
        photoA: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
        captionA: "Sitting on the car hood at 1am eating good food and talking about life.",
        titleB: "The Peaceful Morning Hug",
        photoB: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80",
        captionB: "That peaceful feeling when the whole world is rushing, but we are right on time."
      },
      {
        round: 5,
        titleA: "Every Single Day Together",
        photoA: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80",
        captionA: "No big plans needed. Just your presence turns any normal day into magic.",
        titleB: "The Future Yet To Be Written",
        photoB: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop&q=80",
        captionB: "All the places we haven't visited yet, and all the memories waiting for us."
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
          storyData.questions = qRows.map(q => ({
            id: q.id,
            type: q.question_type,
            prompt: q.prompt,
            options: q.options || [],
            photoA: q.photo_a,
            labelA: q.label_a,
            photoB: q.photo_b,
            labelB: q.label_b,
            correctAnswer: q.correct_answer,
            reactionCorrect: q.reaction_text,
            reactionWrong: q.reaction_wrong_text || "Nahhh, you forgot that? 😭",
            reaction: q.reaction_text
          }));
        }

        // Try fetching memory rounds
        const { data: mRows } = await client.from("our_story_memory_rounds").select("*").order("round_number", { ascending: true });
        if (mRows && mRows.length > 0) {
          storyData.memoryRounds = mRows.map(m => ({
            round: m.round_number,
            titleA: m.title_a,
            photoA: m.photo_a,
            captionA: m.caption_a,
            titleB: m.title_b,
            photoB: m.photo_b,
            captionB: m.caption_b
          }));
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
  function initEnvelope() {
    const envWrapper = document.getElementById("envelopeWrapper");
    const letterModal = document.getElementById("letterModalOverlay");
    const letterCloseBtn = document.getElementById("letterCloseBtn");
    const openOurStoryBtn = document.getElementById("openOurStoryBtn");
    const storyOverlay = document.getElementById("ourStoryOverlay");
    const storyExitBtn = document.getElementById("storyExitBtn");
    const closeStoryFinalBtn = document.getElementById("closeStoryFinalBtn");

    if (!envWrapper || !letterModal) return;

    envWrapper.addEventListener("click", () => {
      envWrapper.classList.add("opening");

      setTimeout(() => {
        letterModal.style.display = "flex";
        void letterModal.offsetWidth;
        letterModal.classList.add("active");
      }, 700);
    });

    if (letterCloseBtn) {
      letterCloseBtn.addEventListener("click", () => {
        letterModal.classList.remove("active");
        setTimeout(() => {
          letterModal.style.display = "none";
          envWrapper.classList.remove("opening");
        }, 400);
      });
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
          <img src="${r.photoA}" alt="${r.titleA}" />
        </div>
        <div class="memory-details-box">
          <h4 class="memory-title">${r.titleA}</h4>
          <p class="memory-caption">${r.captionA}</p>
        </div>
      </div>

      <div class="memory-card" id="memCardB" data-choice="B">
        <div class="memory-img-box">
          <img src="${r.photoB}" alt="${r.titleB}" />
        </div>
        <div class="memory-details-box">
          <h4 class="memory-title">${r.titleB}</h4>
          <p class="memory-caption">${r.captionB}</p>
        </div>
      </div>
    `;

    const cardA = document.getElementById("memCardA");
    const cardB = document.getElementById("memCardB");

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
      timelineWrap.innerHTML = storyData.timeline.map((item, idx) => `
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
              ${Array.isArray(item.photos) && item.photos.length > 0 ? `
                <div class="milestone-gallery-grid">
                  ${item.photos.map(p => `
                    <div class="milestone-gallery-thumb">
                      <img src="${p}" alt="Memory Photo" loading="lazy" />
                    </div>
                  `).join("")}
                </div>
              ` : ""}
            </div>
          </div>
        </div>
      `).join("");

      timelineWrap.querySelectorAll(".milestone-card").forEach(card => {
        card.addEventListener("click", () => {
          const item = card.closest(".timeline-milestone-item");
          if (item) {
            item.classList.toggle("open");
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

  // INIT
  document.addEventListener("DOMContentLoaded", () => {
    loadStoryData();
    initEnvelope();
  });

})();
