/**
 * ============================================================================
 * BIRTHDAY COUNTDOWN & CELEBRATION
 * ============================================================================
 * Hosted easily on GitHub Pages!
 * Fully responsive on mobile (iOS / Android), tablet, and desktop.
 */

// ============================================================================
// ⚙️ BIRTHDAY CUSTOMIZATION (EDIT THESE VALUES FOR YOUR CELEBRATION)
// ============================================================================

/**
 * 1. Target Birthday Date & Time
 * Format: "YYYY-MM-DDTHH:MM:SS" (e.g., "2026-09-25T00:00:00")
 * Change this to the exact date and time of the birthday!
 */
const birthdayDate = "2026-10-05T00:00:00";

/**
 * 2. Birthday Person's Name
 * Displayed dynamically in the title and celebration screen.
 */
const birthdayName = "Joy";

/**
 * 3. Personalized Heartfelt Birthday Message
 * Appears when the countdown reaches zero.
 */
const birthdayMessage = "Happy Birthday to the most wonderful person in my life. Thank you for filling every single day with warmth, laughter, and so much happiness. Being with you is my favorite thing in the world, and I wanted to make this little surprise just to remind you how deeply loved and cherished you are. Here's to you, all our sweetest memories, and all the adventures still ahead of us. I love you endlessly! ❤️✨";

/**
 * 4. Background Image
 * Place your personal birthday photo in: images/background.jpg
 * If left empty or file is missing, a beautiful pink-and-blue mesh gradient is used automatically.
 */
const backgroundImage = "images/background.jpg";

/**
 * 5. Background Overlay Opacity (0.0 = completely clear, 1.0 = dark & opaque)
 * Default: 0.32 provides beautiful transparent photo visibility while keeping text crisp.
 */
const overlayOpacity = 0.32;

/**
 * 6. Background Music Path
 * Place your audio file in: audio/background-music.mp3
 * Supports MP3, WAV, and OGG formats!
 */
const backgroundMusic = "audio/background-music.mp3";

/**
 * 7. Loop Music Setting
 * If true, repeats automatically.
 */
const loopMusic = true;

/**
 * 8. Curated Nostalgic Memories (Displayed on the last day / celebration)
 */
const defaultMemories = [
  {
    id: "mem-1",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop&q=80",
    title: "Our Golden Hour Laughs",
    date: "A Warm Summer Evening",
    caption: "One of my absolute favorite evenings with you—we couldn't stop laughing until our cheeks hurt.",
    isHighlight: true,
    style: "tape",
    size: "normal",
    tilt: "left"
  },
  {
    id: "mem-2",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80",
    title: "", // Title is optional - tested here with blank string
    date: "Starry Road Trip",
    caption: "Windows down, your hand in mine, favorite songs playing under the starry sky.",
    isHighlight: false,
    style: "polaroid",
    size: "normal",
    tilt: "right"
  },
  {
    id: "mem-3",
    type: "video",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80",
    title: "Candid Joy & Laughter",
    date: "Dancing in the Kitchen",
    caption: "That sweet little dance you do whenever you're truly happy is the sweetest thing in the world.",
    isHighlight: true,
    style: "card",
    size: "wide",
    tilt: "slight"
  },
  {
    id: "mem-4",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    title: "Sunday Mornings & Big Dreams",
    date: "Our Quiet Moments",
    caption: "Coffee, warm cuddles, and talking for hours about all our future adventures together.",
    isHighlight: false,
    style: "tape",
    size: "normal",
    tilt: "left"
  },
  {
    id: "mem-5",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
    title: "My Favorite Smile",
    date: "Every Single Day",
    caption: "Watching you shine and smile is the best feeling in the world. I'm so proud of you.",
    isHighlight: true,
    style: "polaroid",
    size: "normal",
    tilt: "right"
  },
  {
    id: "mem-6",
    type: "photo",
    mediaUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80",
    title: "", // Title is optional
    date: "Forever & Always",
    caption: "Every single day with you is my favorite day. Happy Birthday, my love! ❤️",
    isHighlight: false,
    style: "tape",
    size: "tall",
    tilt: "slight"
  }
];

/**
 * 9. Initial Pre-Loaded Heartfelt Guestbook & Love Notes Wishes
 * Demonstrates the allowed combinations:
 * - Text + 3 photos
 * - Text + 2 photos + 1 short video
 * - Text + 1 photo + 1 audio voice recording
 * - Text message with sticker
 */
const defaultGuestbookMessages = [
  {
    id: "wish-love",
    author: "With all my heart ❤️",
    role: "Forever Yours 💌",
    avatar: "❤️",
    message: "Happy Birthday, beautiful! I put together this whole birthday chapter experience because you deserve the world and so much more. Thank you for making my life so incredibly bright and loving. I love you with all my heart, today and every single day! ❤️✨",
    sticker: "💖",
    date: "Today",
    likes: 38,
    likedByUser: true,
    photos: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80"
    ],
    videoUrl: null,
    audioUrl: null,
    type: "photos"
  },
  {
    id: "wish-1",
    author: "Jessica M.",
    role: "Best Friend 👯‍♀️",
    avatar: "JM",
    message: "Happy Birthday to my absolute favorite human! Thank you for always being there with late-night taco runs, endless belly laughs, and unconditional love. Here's a sweet clip and memories from our favorite trip! 💖✨",
    sticker: "💖",
    date: "Today",
    likes: 19,
    likedByUser: false,
    photos: [
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80"
    ],
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    audioUrl: null,
    type: "video"
  },
  {
    id: "wish-2",
    author: "Liam & David",
    role: "College Crew 🎓",
    avatar: "LD",
    message: "Happiest of birthdays! Can't wait to celebrate tonight with the whole gang. Raising a giant toast to you and many more epic road trips ahead! 🥂🎉",
    sticker: "🥂",
    date: "Today",
    likes: 14,
    likedByUser: false,
    photos: [],
    videoUrl: null,
    audioUrl: null,
    type: "text"
  },
  {
    id: "wish-3",
    author: "Mom & Dad",
    role: "Family Love 💕",
    avatar: "MD",
    message: "Wishing our precious girl the sweetest birthday! We left you a little audio note with all our love and blessings. You are our biggest pride and joy. Happy Birthday! 🎂❤️",
    sticker: "🎂",
    date: "Today",
    likes: 27,
    likedByUser: false,
    photos: [
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80"
    ],
    videoUrl: null,
    audioUrl: "https://actions.google.com/sounds/v1/water/rain_heavy.ogg",
    type: "audio"
  }
];

/**
 * 10. Curated Default Celebration Burst Photos
 * Pre-loaded high-resolution, joyful photos so the celebration works out of the box!
 */
const defaultBurstPhotos = [
  {
    id: "sample-1",
    name: "Golden Joy",
    src: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=700&auto=format&fit=crop&q=80",
    caption: "My favorite smile in the whole world ✨",
    timestamp: 1710000001
  },
  {
    id: "sample-2",
    name: "Birthday Cheers",
    src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&auto=format&fit=crop&q=80",
    caption: "Celebrating the most wonderful girl today and always ❤️",
    timestamp: 1710000002
  },
  {
    id: "sample-3",
    name: "Starlit Road Trip",
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=700&auto=format&fit=crop&q=80",
    caption: "Adventures with you are my absolute favorite 🌌",
    timestamp: 1710000003
  },
  {
    id: "sample-4",
    name: "Cozy Dreams",
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=700&auto=format&fit=crop&q=80",
    caption: "Warm coffee, cozy moments, and endless love ☕",
    timestamp: 1710000004
  },
  {
    id: "sample-5",
    name: "Pure Happiness",
    src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=700&auto=format&fit=crop&q=80",
    caption: "Your laugh is my absolute favorite sound in the world 🎊",
    timestamp: 1710000005
  },
  {
    id: "sample-6",
    name: "Kindred Heart",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&auto=format&fit=crop&q=80",
    caption: "To the love of my life, I adore you endlessly ❤️",
    timestamp: 1710000006
  }
];

// ============================================================================
// CORE APPLICATION LOGIC
// ============================================================================

// ============================================================================
// 🌐 SUPABASE PERSISTENT STORAGE CONFIGURATION
// ============================================================================
const SUPABASE_URL = "https://rqehrbituhykrmiujhuk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_o5hbaYx5BDiX8kqzNV8nYw_4gQ05n3e";
const SUPABASE_STORAGE_BUCKET = "Birthday-assets";

let supabaseClient = null;
let currentSupabaseRowId = 1;
let isInitialSupabaseLoading = true;
let lastSupabaseError = null;
let currentRevealTitles = ["MY BABY", "MY LOVE", "MY EVERYTHING ❤️"];
let currentRevealPhotos = ["", "", ""];

// Data Source State: 'checking' | 'live' | 'fallback'
let currentDataSourceState = "checking";
let dataSourceDetails = {
  isLive: false,
  sourceName: "Checking...",
  lastCheckedTime: null
};

/**
 * Updates all visual indicators showing whether live database or local fallback is active
 */
function updateDataSourceStatusUI(state, details = {}) {
  currentDataSourceState = state;
  dataSourceDetails = {
    isLive: state === "live",
    sourceName: state === "live" ? "Live Supabase Database" : "Local Storage / Default Fallback",
    lastCheckedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    ...details
  };

  // 1. Admin Banner Data Source Pill
  const pill = document.getElementById("dataSourceBadge");
  const dot = document.getElementById("dataSourceDot");
  const label = document.getElementById("dataSourceLabel");

  if (pill && dot && label) {
    pill.className = `data-source-pill ${state}`;
    if (state === "live") {
      label.textContent = "🟢 Live Database Connected";
      pill.title = "Connected to live online Supabase database. Content updates are saved in the cloud.";
    } else if (state === "fallback") {
      label.textContent = "🟡 Using Local Fallbacks";
      pill.title = "Offline / using local cached content and defaults. Live database was not reached.";
    } else {
      label.textContent = "🔵 Checking Data Source...";
      pill.title = "Connecting to database...";
    }
  }

  // 2. Website Publishing card indicator
  const pubDot = document.getElementById("publishingDataSourceDot");
  const pubTxt = document.getElementById("publishingDataSourceText");

  if (pubDot && pubTxt) {
    if (state === "live") {
      pubDot.className = "publishing-status-dot saved";
      pubTxt.textContent = "Live Online Database";
      pubTxt.style.color = "#52c41a";
      pubTxt.title = "Site content loaded from Supabase online database (row id=1)";
    } else if (state === "fallback") {
      pubDot.className = "publishing-status-dot unsaved";
      pubTxt.textContent = "Local Fallback / Cache";
      pubTxt.style.color = "#faad14";
      pubTxt.title = "Using local storage / site-content.json fallback";
    } else {
      pubDot.className = "publishing-status-dot unsaved";
      pubTxt.textContent = "Checking...";
      pubTxt.style.color = "#38bdf8";
    }
  }
}

// ============================================================================
// ALL WEBSITE EDITABLE TEXT CONFIGURATION & PERSISTENCE
// Comprehensive mapping of all 40 website text elements, inputs, and DOM nodes
// ============================================================================
const SITE_TEXT_FIELDS = [
  // 1. Opening & Hero
  { key: "openingBadge", inputId: "textOpeningEyebrow", domId: "openingEyebrow", default: "✦ A SPECIAL SURPRISE AWAITS ✦" },
  { key: "openingPrefix", inputId: "textOpeningPrefix", domId: null, default: "I made something Just for you," },
  { key: "showMeBtnText", inputId: "textShowMeBtn", domId: "tapBadgeText", default: "Tap photo to reveal surprise" },
  { key: "fingerGuideText", inputId: "textFingerGuide", domId: "fingerGuideText", default: "👇 Tap me to open" },
  { key: "countdownSub", inputId: "textCountdownSub", domId: "revealCountdownSub", default: "3-2-1 Countdown to celebration" },

  // 2. Celebration (Chapter 1)
  { key: "celebrationHeadline", inputId: "devHeadlineInput", domId: "celebrationTitle", default: "HAPPY BIRTHDAY, JOY! 🎉" },
  { key: "chapter1Eyebrow", inputId: "textCelebrationIntro", domId: "celebrationEyebrow", default: "IT'S FINALLY HERE!" },
  { key: "celebrationIntro", inputId: "textCelebrationIntro", domId: "celebrationSurpriseIntro", default: "I made this little surprise just for you." },
  { key: "heroPinnedTag", inputId: "textHeroPinnedTag", domId: "heroPinnedTag", default: "✨ Our Cherished Memories Together ✨" },
  { key: "replayBurstBtnText", inputId: "textReplayBurstBtn", domId: "replayBurstBtnText", default: "💥 Replay Photo Burst" },
  { key: "celebrateMoreBtnText", inputId: "textCelebrateMoreBtn", domId: "celebrateMoreBtnText", default: "🎊 Celebrate More Confetti" },
  { key: "page1ContinueTitle", inputId: "textPage1ContinueTitle", domId: "page1ContinueTitle", default: "Explore Our Memories ❤️" },

  // 3. Chapter 2 - Our Memories
  { key: "chapter2Tag", inputId: "textPage2Tag", domId: "page2Tag", default: "CHAPTER 2" },
  { key: "page2BackBtnText", inputId: "textPage2BackBtn", domId: "page2BackBtnText", default: "← Celebration" },
  { key: "chapter2Title", inputId: "textPage2Title", domId: "page2Title", default: "OUR MEMORIES ❤️" },
  { key: "chapter2Subtitle", inputId: "textPage2Subtitle", domId: "page2Subtitle", default: "A visual scrapbook of every smile, road trip, and sweet adventure we've shared" },
  { key: "page2ContinueTitle", inputId: "textPage2ContinueTitle", domId: "page2ContinueTitle", default: "Read Birthday Love Notes & Wishes 💌" },
  { key: "page2ContinueArrow", inputId: "textPage2ContinueArrow", domId: "page2ContinueArrow", default: "Tap to continue →" },

  // 4. Chapter 3 - Love Notes
  { key: "chapter3Tag", inputId: "textPage3Tag", domId: "page3Tag", default: "CHAPTER 3" },
  { key: "page3BackBtnText", inputId: "textPage3BackBtn", domId: "page3BackBtnText", default: "← Our Memories" },
  { key: "chapter3Title", inputId: "textPage3Title", domId: "page3Title", default: "Birthday Love Notes & Wishes ❤️" },
  { key: "chapter3Subtitle", inputId: "textPage3Subtitle", domId: "page3Subtitle", default: "Heartfelt notes, sweet blessings, photos & video wishes from everyone who loves you" },
  { key: "page3LeaveNoteBtnText", inputId: "textPage3LeaveNoteBtn", domId: "page3LeaveNoteBtnText", default: "✍️ Leave A Sweet Note" },
  { key: "page3ContinueTitle", inputId: "textPage3ContinueTitle", domId: "page3ContinueTitle", default: "Continue to Our Finale ✨" },

  // 5. Chapter 4 - Finale
  { key: "finaleSparklePillText", inputId: "textFinaleSparklePill", domId: "finaleSparklePillText", default: "My Endless Birthday Wish For You" },
  { key: "finaleBackBtnText", inputId: "textFinaleBackBtn", domId: "finaleBackBtnText", default: "← Back to Love Notes" },
  { key: "finaleMainTitle", inputId: "textFinaleMainTitle", domId: "finaleMainTitle", default: "I LOVE YOU" },
  { key: "finaleInfinityBadgeText", inputId: "textFinaleInfinityBadge", domId: "finaleInfinityBadgeText", default: "∞ ALWAYS & FOREVER ∞" },
  { key: "finaleHintText", inputId: "textFinaleInteractiveHint", domId: "finaleHintText", default: "Drag or swipe to tilt • Tap to pulse" },
  { key: "finaleClosingQuote", inputId: "textFinaleClosingQuote", domId: "finaleClosingQuote", default: `"No matter how many birthdays come and go, every single second with you will always remain my favorite chapter. Thank you for being my peace, my smile, and my greatest adventure. Happy Birthday, my love."` },
  { key: "finaleAuthorName", inputId: "textFinaleAuthorName", domId: "finaleAuthorName", default: "Forever Yours ❤️" },
  { key: "finaleReplayBtnText", inputId: "textFinaleReplayBtn", domId: "finaleReplayBtnText", default: "REPLAY EXPERIENCE" },

  // 6. Navigation & Footer
  { key: "topNavBrandText", inputId: "textTopNavBadge", domId: "topNavBrandText", default: "✨ Joy's Birthday ✨" },
  { key: "siteFooterText", inputId: "textFooter", domId: "siteFooterText", default: "Made with all my love, just for you ❤️" },
  { key: "navChapter1", inputId: "textNavChapter1", domId: "navChapterLabel1", default: "Celebration" },
  { key: "navChapter2", inputId: "textNavChapter2", domId: "navChapterLabel2", default: "Our Memories ❤️" },
  { key: "navChapter3", inputId: "textNavChapter3", domId: "navChapterLabel3", default: "Love Notes 💌" },
  { key: "navChapter4", inputId: "textNavChapter4", domId: "navChapterLabel4", default: "Finale ✨" }
];

const defaultSiteTexts = {};
SITE_TEXT_FIELDS.forEach(f => {
  defaultSiteTexts[f.key] = f.default;
});

let currentSiteTexts = { ...defaultSiteTexts };

// ============================================================================
// CENTRAL GITHUB-BACKED SITE CONFIGURATION (site-content.json)
// ============================================================================
let siteContent = null;
let lastKnownGitHubSha = null;
let gitHubSyncStatus = {
  synced: false,
  lastSyncTime: null,
  commitSha: null,
  commitUrl: null,
  fileSha: null
};

/**
 * Maps the centralized structured site-content.json object into flat key-value pairs
 * expected by currentSiteTexts and the Admin Console.
 */
function flattenSiteContentToSiteTexts(content) {
  const texts = { ...defaultSiteTexts };
  if (!content || typeof content !== "object") return texts;

  if (content.opening) {
    if (content.opening.badge) texts.openingBadge = content.opening.badge;
    if (content.opening.prefix) texts.openingPrefix = content.opening.prefix;
    if (content.opening.showMeButton) texts.showMeBtnText = content.opening.showMeButton;
    if (content.opening.tapIndicator) texts.fingerGuideText = content.opening.tapIndicator;
    if (content.opening.countdownSub) texts.countdownSub = content.opening.countdownSub;
  }
  if (content.chapter1) {
    if (content.chapter1.headline || content.chapter1.title) texts.celebrationHeadline = content.chapter1.headline || content.chapter1.title;
    if (content.chapter1.eyebrow) texts.chapter1Eyebrow = content.chapter1.eyebrow;
    if (content.chapter1.intro) texts.celebrationIntro = content.chapter1.intro;
    if (content.chapter1.heroTag) texts.heroPinnedTag = content.chapter1.heroTag;
    if (content.chapter1.replayButton) texts.replayBurstBtnText = content.chapter1.replayButton;
    if (content.chapter1.celebrateButton) texts.celebrateMoreBtnText = content.chapter1.celebrateButton;
    if (content.chapter1.continueText) texts.page1ContinueTitle = content.chapter1.continueText;
  }
  if (content.chapter2) {
    if (content.chapter2.tag) texts.chapter2Tag = content.chapter2.tag;
    if (content.chapter2.backButton) texts.page2BackBtnText = content.chapter2.backButton;
    if (content.chapter2.title) texts.chapter2Title = content.chapter2.title;
    if (content.chapter2.subtitle) texts.chapter2Subtitle = content.chapter2.subtitle;
    if (content.chapter2.continueText) texts.page2ContinueTitle = content.chapter2.continueText;
    if (content.chapter2.continueArrow) texts.page2ContinueArrow = content.chapter2.continueArrow;
  }
  if (content.chapter3) {
    if (content.chapter3.tag) texts.chapter3Tag = content.chapter3.tag;
    if (content.chapter3.backButton) texts.page3BackBtnText = content.chapter3.backButton;
    if (content.chapter3.title) texts.chapter3Title = content.chapter3.title;
    if (content.chapter3.subtitle) texts.chapter3Subtitle = content.chapter3.subtitle;
    if (content.chapter3.leaveNoteButton) texts.page3LeaveNoteBtnText = content.chapter3.leaveNoteButton;
    if (content.chapter3.continueText) texts.page3ContinueTitle = content.chapter3.continueText;
  }
  if (content.chapter4) {
    if (content.chapter4.sparkleText) texts.finaleSparklePillText = content.chapter4.sparkleText;
    if (content.chapter4.backButton) texts.finaleBackBtnText = content.chapter4.backButton;
    if (content.chapter4.title) texts.finaleMainTitle = content.chapter4.title;
    if (content.chapter4.badgeText) texts.finaleInfinityBadgeText = content.chapter4.badgeText;
    if (content.chapter4.hintText) texts.finaleHintText = content.chapter4.hintText;
    if (content.chapter4.closingQuote) texts.finaleClosingQuote = content.chapter4.closingQuote;
    if (content.chapter4.authorSignature) texts.finaleAuthorName = content.chapter4.authorSignature;
    if (content.chapter4.replayButton) texts.finaleReplayBtnText = content.chapter4.replayButton;
  }
  if (content.navigation) {
    if (content.navigation.brandTitle) texts.topNavBrandText = content.navigation.brandTitle;
    if (content.navigation.footer) texts.siteFooterText = content.navigation.footer;
    if (content.navigation.navChapter1) texts.navChapter1 = content.navigation.navChapter1;
    if (content.navigation.navChapter2) texts.navChapter2 = content.navigation.navChapter2;
    if (content.navigation.navChapter3) texts.navChapter3 = content.navigation.navChapter3;
    if (content.navigation.navChapter4) texts.navChapter4 = content.navigation.navChapter4;
  }
  return texts;
}

/**
 * Builds the canonical hierarchical JSON configuration object for site-content.json
 * to be committed to the GitHub repository.
 */
function buildSiteContentObject() {
  return {
    recipientName: (currentName || "Joy").trim(),
    opening: {
      badge: currentSiteTexts.openingBadge || defaultSiteTexts.openingBadge,
      prefix: currentSiteTexts.openingPrefix || defaultSiteTexts.openingPrefix,
      showMeButton: currentSiteTexts.showMeBtnText || defaultSiteTexts.showMeBtnText,
      tapIndicator: currentSiteTexts.fingerGuideText || defaultSiteTexts.fingerGuideText,
      countdownSub: currentSiteTexts.countdownSub || defaultSiteTexts.countdownSub
    },
    chapter1: {
      headline: currentSiteTexts.celebrationHeadline || defaultSiteTexts.celebrationHeadline,
      eyebrow: currentSiteTexts.chapter1Eyebrow || defaultSiteTexts.chapter1Eyebrow,
      intro: currentSiteTexts.celebrationIntro || defaultSiteTexts.celebrationIntro,
      heroTag: currentSiteTexts.heroPinnedTag || defaultSiteTexts.heroPinnedTag,
      replayButton: currentSiteTexts.replayBurstBtnText || defaultSiteTexts.replayBurstBtnText,
      celebrateButton: currentSiteTexts.celebrateMoreBtnText || defaultSiteTexts.celebrateMoreBtnText,
      continueText: currentSiteTexts.page1ContinueTitle || defaultSiteTexts.page1ContinueTitle
    },
    chapter2: {
      tag: currentSiteTexts.chapter2Tag || defaultSiteTexts.chapter2Tag,
      backButton: currentSiteTexts.page2BackBtnText || defaultSiteTexts.page2BackBtnText,
      title: currentSiteTexts.chapter2Title || defaultSiteTexts.chapter2Title,
      subtitle: currentSiteTexts.chapter2Subtitle || defaultSiteTexts.chapter2Subtitle,
      continueText: currentSiteTexts.page2ContinueTitle || defaultSiteTexts.page2ContinueTitle,
      continueArrow: currentSiteTexts.page2ContinueArrow || defaultSiteTexts.page2ContinueArrow
    },
    chapter3: {
      tag: currentSiteTexts.chapter3Tag || defaultSiteTexts.chapter3Tag,
      backButton: currentSiteTexts.page3BackBtnText || defaultSiteTexts.page3BackBtnText,
      title: currentSiteTexts.chapter3Title || defaultSiteTexts.chapter3Title,
      subtitle: currentSiteTexts.chapter3Subtitle || defaultSiteTexts.chapter3Subtitle,
      leaveNoteButton: currentSiteTexts.page3LeaveNoteBtnText || defaultSiteTexts.page3LeaveNoteBtnText,
      continueText: currentSiteTexts.page3ContinueTitle || defaultSiteTexts.page3ContinueTitle
    },
    chapter4: {
      sparkleText: currentSiteTexts.finaleSparklePillText || defaultSiteTexts.finaleSparklePillText,
      backButton: currentSiteTexts.finaleBackBtnText || defaultSiteTexts.finaleBackBtnText,
      title: currentSiteTexts.finaleMainTitle || defaultSiteTexts.finaleMainTitle,
      badgeText: currentSiteTexts.finaleInfinityBadgeText || defaultSiteTexts.finaleInfinityBadgeText,
      hintText: currentSiteTexts.finaleHintText || defaultSiteTexts.finaleHintText,
      closingQuote: currentSiteTexts.finaleClosingQuote || defaultSiteTexts.finaleClosingQuote,
      authorSignature: currentSiteTexts.finaleAuthorName || defaultSiteTexts.finaleAuthorName,
      replayButton: currentSiteTexts.finaleReplayBtnText || defaultSiteTexts.finaleReplayBtnText
    },
    navigation: {
      brandTitle: currentSiteTexts.topNavBrandText || defaultSiteTexts.topNavBrandText,
      footer: currentSiteTexts.siteFooterText || defaultSiteTexts.siteFooterText,
      navChapter1: currentSiteTexts.navChapter1 || defaultSiteTexts.navChapter1,
      navChapter2: currentSiteTexts.navChapter2 || defaultSiteTexts.navChapter2,
      navChapter3: currentSiteTexts.navChapter3 || defaultSiteTexts.navChapter3,
      navChapter4: currentSiteTexts.navChapter4 || defaultSiteTexts.navChapter4
    },
    revealTitles: [
      currentRevealTitles[0] || "MY BABY",
      currentRevealTitles[1] || "MY LOVE",
      (burstConfig?.revealThirdTitle || currentRevealTitles[2] || "MY EVERYTHING ❤️").trim()
    ],
    birthdayMessage: (currentMessage || birthdayMessage).trim(),
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Loads the central site configuration from site-content.json
 */
async function loadSiteContentFromJSON() {
  try {
    const cacheKey = Math.floor(Date.now() / 60000);
    const res = await fetch(`site-content.json?_cb=${cacheKey}`, {
      headers: { "Accept": "application/json" }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object") {
        siteContent = data;
        const mappedTexts = flattenSiteContentToSiteTexts(data);

        const savedTexts = localStorage.getItem("birthday_site_texts_v1");
        if (!savedTexts) {
          currentSiteTexts = Object.assign({}, defaultSiteTexts, mappedTexts);
        } else {
          currentSiteTexts = Object.assign({}, defaultSiteTexts, mappedTexts, JSON.parse(savedTexts));
        }

        if (data.recipientName && (!currentName || currentName.toLowerCase() === "sarah")) {
          currentName = data.recipientName.trim();
        }
        if (data.birthdayMessage && (!currentMessage || currentMessage === birthdayMessage)) {
          currentMessage = data.birthdayMessage.trim();
        }
        if (Array.isArray(data.revealTitles) && data.revealTitles.length >= 3 && (!currentRevealPhotos || currentRevealPhotos.length < 3)) {
          currentRevealTitles = [
            data.revealTitles[0] || "MY BABY",
            data.revealTitles[1] || "MY LOVE",
            data.revealTitles[2] || "MY EVERYTHING ❤️"
          ];
        }

        applySiteTextsToDOM();
        console.log("[Site Content] Loaded centralized configuration from site-content.json");
        return true;
      }
    }
  } catch (err) {
    console.warn("[Site Content] Could not load site-content.json (using defaults/Supabase):", err);
  }
  return false;
}

/**
 * Updates the Website Publishing status badges and indicators
 */
function updatePublishingStatusUI(type, state, details = null) {
  if (type === "supabase") {
    const dot = document.getElementById("supabaseSyncDot");
    const txt = document.getElementById("supabaseSyncText");
    if (dot && txt) {
      if (state === "saved") {
        dot.className = "publishing-status-dot saved";
        txt.textContent = "Saved";
        txt.style.color = "#52c41a";
      } else if (state === "saving") {
        dot.className = "publishing-status-dot unsaved";
        txt.textContent = "Saving...";
        txt.style.color = "#faad14";
      } else {
        dot.className = "publishing-status-dot unsaved";
        txt.textContent = "Not Saved";
        txt.style.color = "#faad14";
      }
    }
  }

  if (type === "github") {
    const dot = document.getElementById("githubSyncDot");
    const txt = document.getElementById("githubSyncText");
    const timeEl = document.getElementById("lastGitHubSyncTime");
    const commitEl = document.getElementById("lastGitHubCommitSha");

    if (state === "synced") {
      if (dot) dot.className = "publishing-status-dot synced";
      if (txt) {
        txt.textContent = "Synced";
        txt.style.color = "#52c41a";
      }
      if (timeEl && details?.lastSyncTime) {
        const d = new Date(details.lastSyncTime);
        timeEl.textContent = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      if (commitEl && details?.commitSha) {
        if (details.commitUrl) {
          commitEl.innerHTML = `<a href="${details.commitUrl}" target="_blank" rel="noopener noreferrer" style="color: #ff85c0; text-decoration: underline;">${details.commitSha}</a>`;
        } else {
          commitEl.textContent = details.commitSha;
        }
      }
    } else if (state === "syncing") {
      if (dot) dot.className = "publishing-status-dot unsaved";
      if (txt) {
        txt.textContent = "Syncing...";
        txt.style.color = "#faad14";
      }
    } else if (state === "conflict") {
      if (dot) dot.className = "publishing-status-dot error";
      if (txt) {
        txt.textContent = "Conflict";
        txt.style.color = "#ff4d4f";
      }
    } else if (state === "error") {
      if (dot) dot.className = "publishing-status-dot error";
      if (txt) {
        txt.textContent = "Error";
        txt.style.color = "#ff4d4f";
      }
    } else {
      if (dot) dot.className = "publishing-status-dot idle";
      if (txt) {
        txt.textContent = "Not Synced";
        txt.style.color = "rgba(255, 255, 255, 0.7)";
      }
    }
  }
}

/**
 * Initializes the publishing status from localStorage or session
 */
function initPublishingStatus() {
  updatePublishingStatusUI("supabase", "saved");
  updateDataSourceStatusUI(currentDataSourceState);

  try {
    const saved = localStorage.getItem("birthday_github_sync_status_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        gitHubSyncStatus = parsed;
        if (parsed.fileSha) lastKnownGitHubSha = parsed.fileSha;
        if (parsed.synced) {
          updatePublishingStatusUI("github", "synced", parsed);
          return;
        }
      }
    }
  } catch (_) {}

  updatePublishingStatusUI("github", "idle");
}

function initSiteTexts() {
  try {
    const savedName = localStorage.getItem("birthday_custom_name_v1");
    if (savedName && savedName.trim().toLowerCase() === "sarah") {
      currentName = "Joy";
      localStorage.setItem("birthday_custom_name_v1", "Joy");
    } else if (savedName && savedName.trim()) {
      currentName = savedName.trim();
    }
  } catch (_) {}

  try {
    const saved = localStorage.getItem("birthday_site_texts_v1");
    if (saved) {
      currentSiteTexts = Object.assign({}, defaultSiteTexts, JSON.parse(saved));
      if (currentSiteTexts.celebrationHeadline && currentSiteTexts.celebrationHeadline.includes("SARAH")) {
        currentSiteTexts.celebrationHeadline = currentSiteTexts.celebrationHeadline.replace(/SARAH/g, "JOY");
      }
      if (currentSiteTexts.celebrationHeadline && currentSiteTexts.celebrationHeadline.includes("Sarah")) {
        currentSiteTexts.celebrationHeadline = currentSiteTexts.celebrationHeadline.replace(/Sarah/g, "Joy");
      }
      if (currentSiteTexts.topNavBrandText && currentSiteTexts.topNavBrandText.includes("Sarah")) {
        currentSiteTexts.topNavBrandText = currentSiteTexts.topNavBrandText.replace(/Sarah/g, "Joy");
      }
      localStorage.setItem("birthday_site_texts_v1", JSON.stringify(currentSiteTexts));
    }
  } catch (_) {}
  try {
    const savedRevealPhotos = localStorage.getItem("birthday_reveal_photos_v1");
    if (savedRevealPhotos) {
      const parsed = JSON.parse(savedRevealPhotos);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        currentRevealPhotos = parsed;
      }
    }
  } catch (_) {}
  try {
    const savedRevealTitles = localStorage.getItem("birthday_reveal_titles_v1");
    if (savedRevealTitles) {
      const parsed = JSON.parse(savedRevealTitles);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        currentRevealTitles = parsed;
      }
    }
  } catch (_) {}

  applySiteTextsToDOM();
  initPublishingStatus();
  loadSiteContentFromJSON();
}

function readAdminTextInputs() {
  SITE_TEXT_FIELDS.forEach(item => {
    const input = document.getElementById(item.inputId);
    if (input && input.value !== undefined) {
      currentSiteTexts[item.key] = input.value.trim();
    }
  });

  const nameInput = document.getElementById("devNameInput");
  if (nameInput && nameInput.value.trim()) {
    currentName = nameInput.value.trim();
    try { localStorage.setItem("birthday_custom_name_v1", currentName); } catch (_) {}
  }

  const msgInput = document.getElementById("devMessageInput");
  if (msgInput && msgInput.value.trim()) {
    currentMessage = msgInput.value.trim();
    try { localStorage.setItem("birthday_custom_message_v1", currentMessage); } catch (_) {}
  }

  // Also sync headline
  const headlineInput = document.getElementById("devHeadlineInput");
  if (headlineInput && headlineInput.value.trim()) {
    currentSiteTexts.celebrationHeadline = headlineInput.value.trim();
    burstConfig.headline = currentSiteTexts.celebrationHeadline;
  }
}

function populateAdminTextInputs() {
  SITE_TEXT_FIELDS.forEach(item => {
    const input = document.getElementById(item.inputId);
    if (input && document.activeElement !== input) {
      input.value = currentSiteTexts[item.key] !== undefined ? currentSiteTexts[item.key] : (item.default || "");
    }
  });

  const nameInput = document.getElementById("devNameInput");
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = currentName || "Joy";
  }

  const msgInput = document.getElementById("devMessageInput");
  if (msgInput && document.activeElement !== msgInput) {
    msgInput.value = currentMessage || "";
  }

  const headlineInput = document.getElementById("devHeadlineInput");
  if (headlineInput && document.activeElement !== headlineInput) {
    headlineInput.value = currentSiteTexts.celebrationHeadline || "HAPPY BIRTHDAY, JOY! 🎉";
  }
}

function applySiteTextsToDOM() {
  SITE_TEXT_FIELDS.forEach(item => {
    if (item.domId) {
      const el = document.getElementById(item.domId);
      if (el) {
        const val = currentSiteTexts[item.key];
        if (val !== undefined && val !== null && val !== "") {
          el.textContent = val;
        } else if (item.default) {
          el.textContent = item.default;
        }
      }
    }
  });

  // Opening message with prefix and recipient name
  const openingMsg = document.getElementById("openingMessage");
  if (openingMsg) {
    const prefix = currentSiteTexts.openingPrefix || "I made something Just for you,";
    const nameVal = currentName || "Joy";
    openingMsg.innerHTML = `${prefix} <span class="recipient-highlight" id="openingPersonName">${nameVal}</span> ❤️`;
  }

  // Celebration letter message
  const celebMsg = document.getElementById("celebrationMsg");
  if (celebMsg && currentMessage) {
    celebMsg.textContent = currentMessage;
  }

  // Celebration main headline
  const celebTitle = document.getElementById("celebrationTitle");
  if (celebTitle && currentSiteTexts.celebrationHeadline) {
    celebTitle.textContent = currentSiteTexts.celebrationHeadline;
  }

  populateAdminTextInputs();
}

function updateAdminMediaCards() {
  const bgImg = document.getElementById("adminBgPreviewImg") || document.getElementById("adminCurrentBgImg");
  const bgName = document.getElementById("adminCurrentBgName");
  const bgStatus = document.getElementById("adminCurrentBgStatus");

  if (bgImg) {
    if (currentBgImage && currentBgImage.trim() !== "") {
      bgImg.src = currentBgImage;
      bgImg.style.display = "block";
      if (bgName) bgName.textContent = currentBgImage.split("/").pop() || "Custom Background Photo";
      if (bgStatus) bgStatus.textContent = currentBgImage.includes("supabase.co")
        ? "Active (Synced with Supabase Storage)"
        : "Active (Custom Image URL)";
    } else {
      bgImg.src = "";
      bgImg.style.display = "none";
      if (bgName) bgName.textContent = "Default Festive Mesh Gradient";
      if (bgStatus) bgStatus.textContent = "Standard Theme Colors Active";
    }
  }

  const bgInput = document.getElementById("devBgInput");
  if (bgInput && document.activeElement !== bgInput) {
    bgInput.value = currentBgImage || "";
  }

  const musicUrlDisplay = document.getElementById("adminMusicUrlDisplay");
  if (musicUrlDisplay) {
    musicUrlDisplay.textContent = currentMusicUrl || "audio/background-music.mp3";
  }

  const musicInput = document.getElementById("devMusicInput");
  if (musicInput && document.activeElement !== musicInput) {
    musicInput.value = currentMusicUrl || "audio/background-music.mp3";
  }
}

function updateAdminRevealCards() {
  const [p1, p2, p3] = typeof getThreeHeroPhotos === "function" ? getThreeHeroPhotos() : ["", "", ""];

  const img1 = document.getElementById("revealAdminImg1") || document.getElementById("adminRevealImg1");
  const img2 = document.getElementById("revealAdminImg2") || document.getElementById("adminRevealImg2");
  const img3 = document.getElementById("revealAdminImg3") || document.getElementById("adminRevealImg3");

  if (img1 && p1) img1.src = p1;
  if (img2 && p2) img2.src = p2;
  if (img3 && p3) img3.src = p3;

  const t1 = document.getElementById("revealTitle1Input") || document.getElementById("adminRevealTitle1");
  const t2 = document.getElementById("revealTitle2Input") || document.getElementById("adminRevealTitle2");
  const t3 = document.getElementById("revealTitle3Input") || document.getElementById("adminRevealTitle3");

  if (t1 && document.activeElement !== t1) t1.value = currentRevealTitles[0] || "MY BABY";
  if (t2 && document.activeElement !== t2) t2.value = currentRevealTitles[1] || "MY LOVE";
  if (t3 && document.activeElement !== t3) {
    const thirdTitle = (typeof getRevealThirdTitle === "function") ? getRevealThirdTitle() : (currentRevealTitles[2] || "MY EVERYTHING ❤️");
    t3.value = thirdTitle;
  }
}

// Admin Authentication State
let currentAdminSession = null;
let currentAdminUser = null;

/**
 * Returns true if an authenticated admin session is active
 */
function isCurrentUserAdmin() {
  return Boolean(currentAdminUser && currentAdminSession?.access_token);
}

/**
 * Update UI according to admin authentication state
 */
function updateAdminUI(session) {
  currentAdminSession = session || null;
  currentAdminUser = session?.user || null;

  const isAuth = isCurrentUserAdmin();
  const banner = document.getElementById("adminAuthBanner");
  const label = document.getElementById("adminStatusLabel");
  const toggleBtn = document.getElementById("toggleAdminLoginBtn");
  const signOutBtn = document.getElementById("adminSignOutBtn");
  const loginForm = document.getElementById("adminLoginForm");

  if (banner) {
    if (isAuth) {
      banner.classList.add("logged-in");
    } else {
      banner.classList.remove("logged-in");
    }
  }

  if (label) {
    if (isAuth) {
      const email = currentAdminUser.email || "Admin";
      label.textContent = `🛡️ Admin Active: ${email}`;
    } else {
      label.textContent = "Visitor Mode (Public Read-Only)";
    }
  }

  if (toggleBtn) {
    toggleBtn.style.display = isAuth ? "none" : "inline-flex";
  }

  if (signOutBtn) {
    signOutBtn.style.display = isAuth ? "inline-flex" : "none";
  }

  if (isAuth && loginForm) {
    loginForm.style.display = "none";
  }
}

/**
 * Prompt and open the admin login drawer
 */
function openAdminLoginForm(reasonMessage) {
  const loginForm = document.getElementById("adminLoginForm");
  const passwordInput = document.getElementById("adminPasswordInput");

  if (loginForm) {
    loginForm.style.display = "block";
  }
  if (reasonMessage) {
    showStorageStatus("adminAuthStatus", reasonMessage, "error", 6000);
  }
  if (passwordInput) {
    passwordInput.focus();
  }
}

/**
 * Initialize Supabase Auth listener and retrieve existing session
 */
async function initSupabaseAuth() {
  const client = getSupabaseClient();
  if (!client || !client.auth) return;

  try {
    const { data } = await client.auth.getSession();
    if (data?.session) {
      updateAdminUI(data.session);
    }

    client.auth.onAuthStateChange((_event, session) => {
      updateAdminUI(session);
    });
  } catch (err) {
    console.warn("[Supabase Auth] Session init warning:", err);
  }
}

/**
 * Lazily initialize the Supabase client if the official SDK is available.
 * Ensures a single shared GoTrueClient instance across the entire browser context.
 */
function getSupabaseClient() {
  if (typeof window !== "undefined" && window.__sharedSupabaseClient) {
    supabaseClient = window.__sharedSupabaseClient;
    return supabaseClient;
  }
  if (supabaseClient) {
    if (typeof window !== "undefined") window.__sharedSupabaseClient = supabaseClient;
    return supabaseClient;
  }
  if (typeof window !== "undefined" && window.supabase && typeof window.supabase.createClient === "function") {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
      window.__sharedSupabaseClient = supabaseClient;
    } catch (e) {
      console.warn("[Supabase] Failed to init client:", e);
    }
  }
  return supabaseClient;
}

if (typeof window !== "undefined") {
  window.getSupabaseClient = getSupabaseClient;
}

/**
 * Display clear upload and persistence status feedback in the customization panel
 */
function showStorageStatus(elementId, message, type = "success", duration = 5000) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.className = `storage-upload-status ${type}`;
  el.style.display = "flex";

  if (duration > 0) {
    setTimeout(() => {
      if (el.textContent === message) {
        el.style.display = "none";
      }
    }, duration);
  }
}

/**
 * Upload a file directly to the Supabase Storage bucket 'Birthday-assets'
 * under photos/, backgrounds/, or music/.
 * Protected: requires an authenticated admin account.
 * Returns { success: true, publicUrl, fileName } or { success: false, error }
 */
async function uploadToSupabaseStorage(arg1, arg2) {
  let folder = "photos";
  let file = null;

  if (typeof arg1 === "string") {
    folder = arg1;
    file = arg2;
  } else {
    file = arg1;
    if (typeof arg2 === "string") folder = arg2;
  }

  if (!file || !file.name) {
    return {
      success: false,
      error: "No valid file provided for upload."
    };
  }

  if (!isCurrentUserAdmin()) {
    openAdminLoginForm("🔒 Admin sign-in required to upload files to Supabase Storage.");
    return {
      success: false,
      error: "Admin authentication required. Sign in as admin to upload assets."
    };
  }

  const bucket = SUPABASE_STORAGE_BUCKET;
  const cleanExt = (file.name.split('.').pop() || 'bin').toLowerCase();
  const cleanBase = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
  const fileName = `${Date.now()}_${cleanBase}.${cleanExt}`;
  const filePath = `${folder}/${fileName}`;

  // 1. Try official Supabase SDK (automatically attaches authenticated JWT session)
  const client = getSupabaseClient();
  if (client && client.storage) {
    try {
      const { data, error } = await client.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true
        });

      if (!error && data) {
        const { data: urlData } = client.storage
          .from(bucket)
          .getPublicUrl(filePath);
        return {
          success: true,
          publicUrl: urlData.publicUrl,
          path: filePath,
          fileName
        };
      }

      if (error) {
        console.warn("[Supabase Storage SDK upload note]:", error);
        if (error.message && error.message.toLowerCase().includes("row-level security")) {
          return {
            success: false,
            error: "Storage RLS notice: Ensure your admin user has an INSERT policy on bucket 'Birthday-assets'."
          };
        }
      }
    } catch (sdkErr) {
      console.warn("[Supabase Storage SDK error]:", sdkErr);
    }
  }

  // 2. Direct REST upload fallback with authenticated JWT
  try {
    const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${bucket}/${filePath}`;
    const authToken = currentAdminSession?.access_token || SUPABASE_PUBLISHABLE_KEY;
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_PUBLISHABLE_KEY,
        "Authorization": `Bearer ${authToken}`,
        "x-upsert": "true"
      },
      body: file
    });

    if (res.ok) {
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${filePath}`;
      return {
        success: true,
        publicUrl,
        path: filePath,
        fileName
      };
    } else {
      const err = await res.json().catch(() => ({}));
      const msg = err.message || err.error || res.statusText;
      return {
        success: false,
        error: msg.includes("row-level security")
          ? "Storage RLS notice: Ensure your admin user has an INSERT policy on bucket 'Birthday-assets'."
          : msg
      };
    }
  } catch (err) {
    return { success: false, error: err.message };
  }
}

if (typeof window !== "undefined") {
  window.uploadToSupabaseStorage = uploadToSupabaseStorage;
}

/**
 * Load celebration photos from Supabase Storage (photos/).
 * Queries the Birthday-assets bucket and populates currentPhotos for the celebration burst.
 */
async function loadBirthdayPhotosFromSupabase(force = false) {
  // If birthday_content.reveal_photos was already loaded from the database and populated, do not overwrite unless forced
  if (!force && currentPhotos && currentPhotos.length > 0 && currentPhotos.some(p => p.fromSupabase)) {
    return true;
  }

  const bucket = SUPABASE_STORAGE_BUCKET;
  let fileList = [];

  // 1. Try SDK list
  const client = getSupabaseClient();
  if (client && client.storage) {
    try {
      const { data, error } = await client.storage
        .from(bucket)
        .list("photos", {
          limit: 100,
          sortBy: { column: "created_at", order: "desc" }
        });

      if (!error && Array.isArray(data)) {
        fileList = data.filter(f => f.name && f.name !== ".emptyFolderPlaceholder");
      }
    } catch (e) {
      console.warn("[Supabase Storage] SDK list note:", e);
    }
  }

  // 2. Fallback direct REST list
  if (fileList.length === 0) {
    try {
      const res = await fetch(`${SUPABASE_URL}/storage/v1/object/list/${bucket}`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_PUBLISHABLE_KEY,
          "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prefix: "photos", limit: 100 })
      });
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows)) {
          fileList = rows.filter(f => f.name && f.name !== ".emptyFolderPlaceholder");
        }
      }
    } catch (e) {
      console.warn("[Supabase Storage] REST list note:", e);
    }
  }

  if (fileList.length > 0) {
    const loadedPhotos = fileList.map(f => {
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/photos/${f.name}`;
      return {
        id: "sb-" + f.name,
        name: f.name,
        src: publicUrl,
        caption: f.name.replace(/^[0-9]+_/, "").replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        timestamp: f.created_at ? new Date(f.created_at).getTime() : Date.now(),
        fromSupabase: true
      };
    });

    currentPhotos = loadedPhotos;
    renderPhotoThumbnails();

    // Cache locally for instant offline preview
    try {
      localStorage.setItem("birthday_burst_photos_v1", JSON.stringify(currentPhotos));
    } catch (_) {}

    console.log(`[Supabase Storage] Successfully synced ${loadedPhotos.length} photos from photos/ bucket`);
    return true;
  }
  return false;
}

/**
 * Fetch the latest birthday content from Supabase.
 * Targets public.birthday_content row id = 1 as primary source of truth.
 * Tries the official Supabase SDK first, with a pure fetch REST fallback.
 * Keeps localStorage as a fallback/cache without wiping out user changes.
 */
async function loadBirthdayContentFromSupabase() {
  isInitialSupabaseLoading = true;
  updateDataSourceStatusUI("checking");
  try {
    let row = null;
    let fetchedFromLiveDatabase = false;

    // 1. Try official SDK targeting row id = 1
    const client = getSupabaseClient();
    if (client) {
      try {
        const { data, error } = await client
          .from("birthday_content")
          .select("*")
          .eq("id", 1)
          .limit(1);

        if (!error && Array.isArray(data) && data.length > 0) {
          row = data[0];
          fetchedFromLiveDatabase = true;
        } else if (error) {
          console.warn("[Supabase SDK] Query notice:", error.message);
        }
      } catch (sdkErr) {
        console.warn("[Supabase SDK] Fetch error:", sdkErr);
      }
    }

    // 2. Direct REST fallback targeting row id = 1
    if (!row) {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/birthday_content?id=eq.1&select=*&limit=1`,
          {
            headers: {
              "apikey": SUPABASE_PUBLISHABLE_KEY,
              "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
            }
          }
        );
        if (response.ok) {
          const rows = await response.json();
          if (Array.isArray(rows) && rows.length > 0) {
            row = rows[0];
            fetchedFromLiveDatabase = true;
          }
        }
      } catch (restErr) {
        console.warn("[Supabase REST] Offline or connection error:", restErr);
      }
    }

    // 3. Additional fallback if row id=1 was not explicitly returned
    if (!row) {
      try {
        const resFallback = await fetch(
          `${SUPABASE_URL}/rest/v1/birthday_content?select=*&order=updated_at.desc&limit=1`,
          {
            headers: {
              "apikey": SUPABASE_PUBLISHABLE_KEY,
              "Authorization": `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
            }
          }
        );
        if (resFallback.ok) {
          const rows = await resFallback.json();
          if (Array.isArray(rows) && rows.length > 0) {
            row = rows[0];
            fetchedFromLiveDatabase = true;
          }
        }
      } catch (_) {}
    }

    // 4. Synchronize all database columns to application state
    if (row) {
      currentSupabaseRowId = row.id || 1;
      updateDataSourceStatusUI("live", { rowId: currentSupabaseRowId, updatedAt: row.updated_at });

      // Recipient Name
      if (row.recipient_name && typeof row.recipient_name === "string" && row.recipient_name.trim() !== "") {
        let fetchedName = row.recipient_name.trim();
        if (fetchedName.toLowerCase() === "sarah") {
          fetchedName = "Joy";
        }
        currentName = fetchedName;
        try {
          localStorage.setItem("birthday_custom_name_v1", currentName);
        } catch (_) {}
        if (devNameInput) {
          devNameInput.value = currentName;
        }
      } else {
        currentName = "Joy";
        try {
          localStorage.setItem("birthday_custom_name_v1", "Joy");
        } catch (_) {}
      }

      // Birthday Message
      if (row.birthday_message && typeof row.birthday_message === "string" && row.birthday_message.trim() !== "") {
        currentMessage = row.birthday_message.trim();
        try {
          localStorage.setItem("birthday_custom_message_v1", currentMessage);
        } catch (_) {}
        if (celebrationMsg) {
          celebrationMsg.textContent = currentMessage;
        }
        if (devMessageInput) {
          devMessageInput.value = currentMessage;
        }
      }

      // Background URL
      if (row.background_url && typeof row.background_url === "string" && row.background_url.trim() !== "") {
        currentBgImage = row.background_url.trim();
        try {
          localStorage.setItem("birthday_bg_image_v1", currentBgImage);
        } catch (_) {}
        if (devBgInput) {
          devBgInput.value = currentBgImage;
        }
        setupBackground();
      }

      // Music URL
      if (row.music_url && typeof row.music_url === "string" && row.music_url.trim() !== "") {
        currentMusicUrl = row.music_url.trim();
        try {
          localStorage.setItem("birthday_custom_music_v1", currentMusicUrl);
        } catch (_) {}
        if (bgAudio) {
          bgAudio.src = currentMusicUrl;
        }
        if (devMusicInput) {
          devMusicInput.value = currentMusicUrl;
        }
      }

      // Reveal Photos (JSONB array)
      if (Array.isArray(row.reveal_photos) && row.reveal_photos.length > 0) {
        row.reveal_photos.forEach((item, idx) => {
          if (idx < 3) {
            const url = typeof item === "string" ? item : (item?.src || item?.url || "");
            if (url) currentRevealPhotos[idx] = url;
          }
        });
        try {
          localStorage.setItem("birthday_reveal_photos_v1", JSON.stringify(currentRevealPhotos));
        } catch (_) {}

        currentPhotos = row.reveal_photos.map((item, idx) => {
          if (typeof item === "string") {
            const filename = item.split("/").pop() || `photo_${idx + 1}.jpg`;
            return {
              id: "sb-reveal-" + idx + "-" + filename,
              name: filename,
              src: item,
              caption: `Memory ${idx + 1}`,
              timestamp: Date.now(),
              fromSupabase: true
            };
          } else if (item && typeof item === "object") {
            return {
              id: item.id || ("sb-reveal-" + idx),
              name: item.name || `photo_${idx + 1}.jpg`,
              src: item.src || item.url || "",
              caption: item.caption || `Memory ${idx + 1}`,
              timestamp: item.timestamp || Date.now(),
              fromSupabase: true
            };
          }
          return null;
        }).filter(p => p && p.src);

        try {
          localStorage.setItem("birthday_burst_photos_v1", JSON.stringify(currentPhotos));
        } catch (_) {}

        openPhotoDB().then(db => {
          if (db) seedDefaultPhotosToDB(db, currentPhotos);
        });

        renderPhotoThumbnails();
      }

      // Reveal Titles (JSONB array)
      if (Array.isArray(row.reveal_titles) && row.reveal_titles.length >= 3) {
        currentRevealTitles = [
          row.reveal_titles[0] || "MY BABY",
          row.reveal_titles[1] || "MY LOVE",
          row.reveal_titles[2] || "MY EVERYTHING ❤️"
        ];
        if (row.reveal_titles[2] && typeof row.reveal_titles[2] === "string") {
          burstConfig.revealThirdTitle = row.reveal_titles[2].trim();
          if (devRevealThirdTitleInput) devRevealThirdTitleInput.value = burstConfig.revealThirdTitle;
          saveBurstSettings();
        }
        try {
          localStorage.setItem("birthday_reveal_titles_v1", JSON.stringify(currentRevealTitles));
        } catch (_) {}
      } else if (row.reveal_titles && typeof row.reveal_titles === "object") {
        const t3 = row.reveal_titles.title3 || row.reveal_titles[2];
        if (t3 && typeof t3 === "string") {
          burstConfig.revealThirdTitle = t3.trim();
          currentRevealTitles[2] = burstConfig.revealThirdTitle;
          if (devRevealThirdTitleInput) devRevealThirdTitleInput.value = burstConfig.revealThirdTitle;
          saveBurstSettings();
        }
      }

      // Memories / Scrapbook (JSONB array)
      if (Array.isArray(row.memories) && row.memories.length > 0) {
        activeMemories = row.memories;
        try {
          localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(activeMemories));
        } catch (_) {}
        renderMemoriesScrapbook();
        renderMemories();
        renderAdminMemoriesList();
        initHighlightedMemoriesObserver();
      }

      // Love Notes / Guestbook (JSONB array)
      if (Array.isArray(row.love_notes) && row.love_notes.length > 0) {
        guestbookMessages = row.love_notes;
        try {
          localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(guestbookMessages));
        } catch (_) {}
        renderLoveNotes();
        renderGuestbookGallery(currentGuestbookFilter);
        renderAdminLoveNotesList();
      }

      // Finale configuration
      if (row.finale_title && typeof row.finale_title === "string" && row.finale_title.trim() !== "") {
        const titleEl = document.getElementById("finaleMainTitle");
        if (titleEl) titleEl.textContent = row.finale_title.trim();
        currentSiteTexts.finaleMainTitle = row.finale_title.trim();
      }
      if (row.finale_quote && typeof row.finale_quote === "string" && row.finale_quote.trim() !== "") {
        const quoteEl = document.getElementById("finaleClosingQuote");
        if (quoteEl) quoteEl.textContent = row.finale_quote.trim();
        currentSiteTexts.finaleClosingQuote = row.finale_quote.trim();
      }
      if (row.finale_author && typeof row.finale_author === "string" && row.finale_author.trim() !== "") {
        const authorEl = document.getElementById("finaleAuthorName");
        if (authorEl) authorEl.textContent = row.finale_author.trim();
        currentSiteTexts.finaleAuthorName = row.finale_author.trim();
      }

      // Synchronize Site Texts from Supabase
      let loadedTexts = null;
      if (row.site_texts && typeof row.site_texts === "object") {
        loadedTexts = row.site_texts;
      } else if (Array.isArray(row.reveal_titles) && row.reveal_titles[3] && typeof row.reveal_titles[3] === "object" && row.reveal_titles[3].site_texts) {
        loadedTexts = row.reveal_titles[3].site_texts;
      } else if (row.reveal_titles && typeof row.reveal_titles === "object" && row.reveal_titles.site_texts) {
        loadedTexts = row.reveal_titles.site_texts;
      }

      if (loadedTexts) {
        currentSiteTexts = Object.assign({}, defaultSiteTexts, loadedTexts);
        if (currentSiteTexts.celebrationHeadline && currentSiteTexts.celebrationHeadline.includes("SARAH")) {
          currentSiteTexts.celebrationHeadline = currentSiteTexts.celebrationHeadline.replace(/SARAH/g, "JOY");
        }
        if (currentSiteTexts.celebrationHeadline && currentSiteTexts.celebrationHeadline.includes("Sarah")) {
          currentSiteTexts.celebrationHeadline = currentSiteTexts.celebrationHeadline.replace(/Sarah/g, "Joy");
        }
        if (currentSiteTexts.topNavBrandText && currentSiteTexts.topNavBrandText.includes("Sarah")) {
          currentSiteTexts.topNavBrandText = currentSiteTexts.topNavBrandText.replace(/Sarah/g, "Joy");
        }
        try {
          localStorage.setItem("birthday_site_texts_v1", JSON.stringify(currentSiteTexts));
        } catch (_) {}
      }

      applySiteTextsToDOM();
      updateAdminMediaCards();
      updateAdminRevealCards();
      updatePublishingStatusUI("supabase", "saved");

      setupDynamicContent();
      console.log("[Supabase] Successfully loaded and synchronized online birthday content:", row);
    } else {
      updateDataSourceStatusUI("fallback", { reason: "No database rows found" });
      console.log("[Supabase] No remote content found for row id=1. Using local fallback.");
    }
  } catch (err) {
    updateDataSourceStatusUI("fallback", { reason: err?.message || "Offline" });
    console.warn("[Supabase] Could not load online content, maintaining local fallback:", err);
  } finally {
    isInitialSupabaseLoading = false;
  }
}

/**
 * Unified persistence function: saves all birthday content to Supabase public.birthday_content row id = 1.
 * Synchronizes: recipient_name, birthday_message, background_url, music_url,
 * reveal_photos, reveal_titles, memories, love_notes, and updated_at.
 * Requires admin authentication to write to remote database, protecting against unauthorized edits.
 */
async function saveAllBirthdayContentToSupabase(overrides = {}, requireAdmin = false) {
  try {
    localStorage.setItem("birthday_site_texts_v1", JSON.stringify(currentSiteTexts));
    localStorage.setItem("birthday_reveal_photos_v1", JSON.stringify(currentRevealPhotos));
    localStorage.setItem("birthday_reveal_titles_v1", JSON.stringify(currentRevealTitles));
    if (currentBgImage) localStorage.setItem("birthday_bg_image_v1", currentBgImage);
    if (currentMusicUrl) localStorage.setItem("birthday_custom_music_v1", currentMusicUrl);
    if (currentName) localStorage.setItem("birthday_custom_name_v1", currentName);
    if (currentMessage) localStorage.setItem("birthday_custom_message_v1", currentMessage);
  } catch (_) {}

  const heroUrls = (Array.isArray(currentRevealPhotos) ? currentRevealPhotos : [])
    .map(u => (typeof u === "string" ? u.trim() : ""))
    .filter(Boolean);

  const photosUrls = (Array.isArray(currentPhotos) ? currentPhotos : [])
    .map(p => (typeof p === "string" ? p : (p.src || p.url || "")))
    .filter(u => Boolean(u) && typeof u === "string" && u.trim() !== "");

  const revealPhotoUrls = Array.from(new Set([...heroUrls, ...photosUrls]));

  const revealTitles = [
    (currentRevealTitles[0] || "MY BABY").trim(),
    (currentRevealTitles[1] || "MY LOVE").trim(),
    (burstConfig.revealThirdTitle || currentRevealTitles[2] || "MY EVERYTHING ❤️").trim()
  ];

  const payload = {
    recipient_name: (currentName || "").trim(),
    birthday_message: (currentMessage || "").trim(),
    background_url: (currentBgImage || "").trim(),
    music_url: (currentMusicUrl || "").trim(),
    reveal_photos: revealPhotoUrls,
    reveal_titles: revealTitles,
    site_texts: currentSiteTexts,
    memories: Array.isArray(activeMemories) ? activeMemories : [],
    love_notes: Array.isArray(guestbookMessages) ? guestbookMessages : [],
    updated_at: new Date().toISOString(),
    ...overrides
  };

  lastSupabaseError = null;

  // 1. Try official SDK
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from("birthday_content")
        .update(payload)
        .eq("id", 1)
        .select();

      if (!error && Array.isArray(data) && data.length > 0) {
        console.log("[Supabase SDK] Successfully persisted birthday_content row id=1:", data[0]);
        lastSupabaseError = null;
        return true;
      } else if (error) {
        lastSupabaseError = error.message || error.details || error.hint || `Supabase SDK error: ${JSON.stringify(error)}`;
        console.error("[Supabase SDK] Update rejected:", error);
      } else if (Array.isArray(data) && data.length === 0) {
        lastSupabaseError = "Supabase update returned 0 modified rows for id=1. Permission denied by RLS policy or session expired.";
        console.warn("[Supabase SDK] 0 rows modified:", lastSupabaseError);
      }
    } catch (sdkErr) {
      lastSupabaseError = sdkErr?.message || "Supabase SDK exception";
      console.error("[Supabase SDK] Save exception:", sdkErr);
    }
  }

  // 2. Direct REST fallback with authenticated admin JWT
  try {
    const authToken = currentAdminSession?.access_token || SUPABASE_PUBLISHABLE_KEY;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/birthday_content?id=eq.1`, {
      method: "PATCH",
      headers: {
        "apikey": SUPABASE_PUBLISHABLE_KEY,
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      if (res.status === 204) {
        console.log("[Supabase REST] Successfully updated birthday_content row id=1 (204 No Content)");
        lastSupabaseError = null;
        return true;
      }
      const rows = await res.json().catch(() => []);
      if (Array.isArray(rows) && rows.length > 0) {
        console.log("[Supabase REST] Successfully persisted birthday_content row id=1:", rows[0]);
        lastSupabaseError = null;
        return true;
      }
      // If rows is empty array, row was not updated due to RLS or missing id
      if (!lastSupabaseError) {
        lastSupabaseError = "Supabase REST update returned 0 modified rows. Update rejected by database RLS.";
        console.warn("[Supabase REST] 0 rows returned:", lastSupabaseError);
      }
    } else {
      const errData = await res.json().catch(() => ({}));
      lastSupabaseError = errData?.message || errData?.hint || errData?.details || `HTTP ${res.status}: ${res.statusText}`;
      console.error("[Supabase REST] Update failed:", res.status, errData);
    }
  } catch (restErr) {
    if (!lastSupabaseError) {
      lastSupabaseError = restErr?.message || "Network error during Supabase save";
    }
    console.error("[Supabase REST] Network exception during save:", restErr);
  }

  if (!lastSupabaseError) {
    lastSupabaseError = "Database update failed. Please verify Supabase connection and admin privileges.";
  }

  return false;
}

/**
 * Backward compatibility wrapper delegating to saveAllBirthdayContentToSupabase.
 */
async function saveBirthdayContentToSupabase(newMessage, newBgUrl, newMusicUrl, extraPayload = {}) {
  const overrides = { ...extraPayload };
  if (newMessage !== undefined && newMessage !== null) overrides.birthday_message = newMessage;
  if (newBgUrl !== undefined && newBgUrl !== null) overrides.background_url = newBgUrl;
  if (newMusicUrl !== undefined && newMusicUrl !== null) overrides.music_url = newMusicUrl;
  return await saveAllBirthdayContentToSupabase(overrides);
}

// State
let targetDate = new Date(birthdayDate);
let currentName = birthdayName;
let currentMessage = birthdayMessage;
let currentBgImage = backgroundImage;
let currentMusicUrl = backgroundMusic;
let currentOverlayOpacity = overlayOpacity;

let countdownInterval = null;
let isCelebrationActive = false;

// Photo Burst & Celebration Customization State
let currentPhotos = [];
let burstConfig = {
  burstStyle: "mixed",           // "burst" | "float" | "fall" | "pop" | "mixed"
  photoShape: "polaroid",        // "polaroid" | "rounded" | "circle" | "square" | "mixed"
  photoSize: "medium",           // "small" | "medium" | "large"
  burstSpeed: "normal",          // "slow" | "normal" | "fast" | "explosive"
  burstDuration: "12",           // "5" | "8" | "12" | "infinite"
  photoRotation: "medium",       // "none" | "subtle" | "medium" | "wild"
  photoBorderColor: "gradient",  // "gradient" | "pink" | "light-pink" | "hot-pink" | "blue" | "light-blue" | "purple"
  photoBorderThickness: "2",     // "1" | "2" | "4" | "6"
  photoCornerRadius: 16,
  photoGlowIntensity: 0.8,
  confettiAmount: "normal",      // "low" | "normal" | "high"
  confettiSpeed: "normal",       // "slow" | "normal" | "fast"
  gradientPreset: "dusk",
  colorPinkIntensity: 1.0,
  colorBlueIntensity: 1.0,
  colorPurpleIntensity: 1.0,
  headline: "Happy Birthday, My Love ❤️",
  revealThirdTitle: "MY EVERYTHING ❤️"
};

let photoBurstActiveTimeout = null;
let heroPhotosTimerTimeout = null;

// Background Audio State
let isMusicPlaying = false;
let isMusicMuted = false;
let userExplicitlyPaused = false;
let audioContext = null;
let synthInterval = null;

// Guestbook State
let guestbookMessages = [];
let currentGuestbookFilter = "all";
let selectedSticker = "💖";
let modalMediaStream = null;
let modalMediaRecorder = null;
let modalRecordedChunks = [];
let modalRecordedBlobUrl = null;

// DOM Elements - Opening Screen, 3-2-1 Reveal & 10s Photo Reveal
const openingScreen = document.getElementById("openingScreen");
const openingMessage = document.getElementById("openingMessage");
const openingPersonName = document.getElementById("openingPersonName");
const showMeBtn = document.getElementById("showMeBtn");

const revealCountdownStage = document.getElementById("revealCountdownStage");
const revealCountdownNum = document.getElementById("revealCountdownNum");
const revealCountdownSub = document.getElementById("revealCountdownSub");

const tenSecondPhotoReveal = document.getElementById("tenSecondPhotoReveal");
const revealTimerProgress = document.getElementById("revealTimerProgress");
const revealCountdownSeconds = document.getElementById("revealCountdownSeconds");
const threeFloatingPhotosStage = document.getElementById("threeFloatingPhotosStage");
const skipRevealBtn = document.getElementById("skipRevealBtn");

const celebrationScreen = document.getElementById("celebrationScreen");

const heroPersonName = document.getElementById("heroPersonName");
const celebrationTitle = document.getElementById("celebrationTitle");
const celebrationMsg = document.getElementById("celebrationMsg");
const targetDateDisplay = document.getElementById("targetDateDisplay");

const bgImageEl = document.getElementById("bgImage");
const bgOverlayEl = document.getElementById("bgOverlay");

// Music Elements
const bgAudio = document.getElementById("bgAudio");
const musicPlayBtn = document.getElementById("musicPlayBtn");
const musicBtn = musicPlayBtn; // Alias for backwards-compatibility
const musicMuteBtn = document.getElementById("musicMuteBtn");
const musicBtnLabel = document.getElementById("musicBtnLabel");
const soundBars = document.getElementById("soundBars");
const autoplayMusicPrompt = document.getElementById("autoplayMusicPrompt");

// Sections
const lastDaySection = document.getElementById("lastDaySection");
const guestbookSection = document.getElementById("guestbookSection");
const guestbookGallery = document.getElementById("guestbookGallery");
const guestbookCount = document.getElementById("guestbookCount");
const openSignGuestbookBtn = document.getElementById("openSignGuestbookBtn");
const guestbookFilterTabs = document.getElementById("guestbookFilterTabs");

// Sign Guestbook Modal
const signGuestbookModal = document.getElementById("signGuestbookModal");
const closeSignGuestbookBtn = document.getElementById("closeSignGuestbookBtn");
const modeTextBtn = document.getElementById("modeTextBtn");
const modeVideoBtn = document.getElementById("modeVideoBtn");
const textWishForm = document.getElementById("textWishForm");
const videoWishForm = document.getElementById("videoWishForm");
const wishAuthorName = document.getElementById("wishAuthorName");
const wishAuthorRole = document.getElementById("wishAuthorRole");
const wishMessageText = document.getElementById("wishMessageText");
const stickerPicker = document.getElementById("stickerPicker");

// Modal Video Elements
const modalVideoAuthorName = document.getElementById("modalVideoAuthorName");
const modalVideoAuthorRole = document.getElementById("modalVideoAuthorRole");
const modalRecIndicator = document.getElementById("modalRecIndicator");
const modalVideoPreview = document.getElementById("modalVideoPreview");
const modalRecStartBtn = document.getElementById("modalRecStartBtn");
const modalRecStopBtn = document.getElementById("modalRecStopBtn");
const modalPostVideoWishBtn = document.getElementById("modalPostVideoWishBtn");

// Dev Modal Elements
const devModal = document.getElementById("devModal");
const devToggleBtn = document.getElementById("devToggleBtn");
const closeDevModalBtn = document.getElementById("closeDevModal");
const devDateInput = document.getElementById("devDateInput");
const devNameInput = document.getElementById("devNameInput");
const devHeadlineInput = document.getElementById("devHeadlineInput");
const devRevealThirdTitleInput = document.getElementById("devRevealThirdTitleInput");
const devMessageInput = document.getElementById("devMessageInput");
const devBgInput = document.getElementById("devBgInput");
const devOpacityInput = document.getElementById("devOpacityInput");
const devOpacityVal = document.getElementById("devOpacityVal");
const applyDevBtn = document.getElementById("applyDevBtn");
const copyConfigBtn = document.getElementById("copyConfigBtn");

// Photo Burst & Pinned Hero Elements
const photoBurstOverlay = document.getElementById("photoBurstOverlay");
const replayBurstBtn = document.getElementById("replayBurstBtn");
const heroPhotosPinnedContainer = document.getElementById("heroPhotosPinnedContainer");
const heroTimerProgress = document.getElementById("heroTimerProgress");
const heroPhotosPinnedCards = document.getElementById("heroPhotosPinnedCards");

// Customize Panel - Photos Tab
const panelPhotoCount = document.getElementById("panelPhotoCount");
const photoThumbnailsGrid = document.getElementById("photoThumbnailsGrid");
const photoFileInput = document.getElementById("photoFileInput");
const addPhotosBtn = document.getElementById("addPhotosBtn");
const syncSupabasePhotosBtn = document.getElementById("syncSupabasePhotosBtn");
const loadSamplePhotosBtn = document.getElementById("loadSamplePhotosBtn");
const clearAllPhotosBtn = document.getElementById("clearAllPhotosBtn");
const photoUploadStatus = document.getElementById("photoUploadStatus");

// Customize Panel - Burst & FX Controls
const burstStyleSelect = document.getElementById("burstStyleSelect");
const photoShapeSelect = document.getElementById("photoShapeSelect");
const photoSizeSelect = document.getElementById("photoSizeSelect");
const burstSpeedSelect = document.getElementById("burstSpeedSelect");
const burstDurationSelect = document.getElementById("burstDurationSelect");
const photoRotationSelect = document.getElementById("photoRotationSelect");
const photoBorderColorSelect = document.getElementById("photoBorderColorSelect");
const photoBorderThicknessSelect = document.getElementById("photoBorderThicknessSelect");
const photoCornerRadiusInput = document.getElementById("photoCornerRadiusInput");
const photoGlowIntensityInput = document.getElementById("photoGlowIntensityInput");
const confettiAmountSelect = document.getElementById("confettiAmountSelect");
const confettiSpeedSelect = document.getElementById("confettiSpeedSelect");

// Customize Panel - Background Tab
const bgFileInput = document.getElementById("bgFileInput");
const uploadBgBtn = document.getElementById("uploadBgBtn");
const bgUploadStatus = document.getElementById("bgUploadStatus");
const bgGradientPresetSelect = document.getElementById("bgGradientPresetSelect");

// Customize Panel - Music Tab
const audioFileInput = document.getElementById("audioFileInput");
const uploadAudioBtn = document.getElementById("uploadAudioBtn");
const uploadedAudioName = document.getElementById("uploadedAudioName");
const musicUploadStatus = document.getElementById("musicUploadStatus");
const devMusicInput = document.getElementById("devMusicInput");
const previewMusicBtn = document.getElementById("previewMusicBtn");
const devMusicVolume = document.getElementById("devMusicVolume");
const devMusicLoop = document.getElementById("devMusicLoop");

// Customize Panel - Colors Tab
const colorPinkIntensity = document.getElementById("colorPinkIntensity");
const colorBlueIntensity = document.getElementById("colorBlueIntensity");
const colorPurpleIntensity = document.getElementById("colorPurpleIntensity");

// Customize Panel - Quick Test & Footer Buttons
const testPhotoBurstActionBtn = document.getElementById("testPhotoBurstActionBtn");
const testBurstModalFooterBtn = document.getElementById("testBurstModalFooterBtn");
const closeDevModalBottomBtn = document.getElementById("closeDevModalBottomBtn");
const customizeNavTabs = document.getElementById("customizeNavTabs");

// Customize Panel - Admin Authentication Elements
const adminAuthBanner = document.getElementById("adminAuthBanner");
const adminStatusPill = document.getElementById("adminStatusPill");
const adminStatusLabel = document.getElementById("adminStatusLabel");
const toggleAdminLoginBtn = document.getElementById("toggleAdminLoginBtn");
const adminSignOutBtn = document.getElementById("adminSignOutBtn");
const adminLoginForm = document.getElementById("adminLoginForm");
const adminEmailInput = document.getElementById("adminEmailInput");
const adminPasswordInput = document.getElementById("adminPasswordInput");
const adminSignInBtn = document.getElementById("adminSignInBtn");
const adminMagicLinkBtn = document.getElementById("adminMagicLinkBtn");
const adminCancelLoginBtn = document.getElementById("adminCancelLoginBtn");
const adminAuthStatus = document.getElementById("adminAuthStatus");

// Quick Test Buttons
const testRevealSequenceBtn = document.getElementById("testRevealSequenceBtn");
const testZeroBtn = document.getElementById("testZeroBtn");
const testLastDayBtn = document.getElementById("testLastDayBtn");
const testGuestbookBtn = document.getElementById("testGuestbookBtn");
const resetExperienceBtn = document.getElementById("resetExperienceBtn");

// Lightbox Elements
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const closeLightboxBtn = document.getElementById("closeLightboxBtn");

// Tab elements in last-day section
const tabMemories = document.getElementById("tabMemories");
const tabVideos = document.getElementById("tabVideos");
const memoriesView = document.getElementById("memoriesView");
const videoBoothView = document.getElementById("videoBoothView");

// Video recorder elements (vault)
const recordVideoBtn = document.getElementById("recordVideoBtn");
const stopVideoBtn = document.getElementById("stopVideoBtn");
const saveVideoBtn = document.getElementById("saveVideoBtn");
const videoPreview = document.getElementById("videoPreview");
const recordingIndicator = document.getElementById("recordingIndicator");
const authorNameInput = document.getElementById("authorNameInput");
const recordedList = document.getElementById("recordedList");

let mediaStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let recordedBlobUrl = null;

// Multi-Page Chapter Navigation Elements
const pageChapter1 = document.getElementById("pageChapter1");
const pageChapter2 = document.getElementById("pageChapter2");
const pageChapter3 = document.getElementById("pageChapter3");
const pageChapter4 = document.getElementById("pageChapter4");
const chapterNavBar = document.getElementById("chapterNavBar");
const chapterBtn1 = document.getElementById("chapterBtn1") || document.getElementById("navChapterBtn1");
const chapterBtn2 = document.getElementById("chapterBtn2") || document.getElementById("navChapterBtn2");
const chapterBtn3 = document.getElementById("chapterBtn3") || document.getElementById("navChapterBtn3");
const chapterBtn4 = document.getElementById("chapterBtn4") || document.getElementById("navChapterBtn4");

// Tap to continue chapter banner buttons (matches both HTML IDs and legacy IDs)
const goToPage2Btn = document.getElementById("goToPage2Btn") || document.getElementById("turnToChapter2Btn");
const goToPage3Btn = document.getElementById("goToPage3Btn") || document.getElementById("turnToChapter3Btn");
const goToFinaleBtn = document.getElementById("goToFinaleBtn");
const backToPage1Btn = document.getElementById("backToPage1Btn") || document.getElementById("backToChapter1Btn");
const backToPage2Btn = document.getElementById("backToPage2Btn") || document.getElementById("backToChapter2Btn");
const backToPage1From3Btn = document.getElementById("backToPage1From3Btn") || document.getElementById("backToChapter1From3Btn");
const backToPage3FromFinaleBtn = document.getElementById("backToPage3FromFinaleBtn");
const openSignLoveNoteFromChapterBtn = document.getElementById("openSignLoveNoteFromChapterBtn");
const replayExperienceBtn = document.getElementById("replayExperienceBtn");
const finaleBackToMemoriesBtn = document.getElementById("finaleBackToMemoriesBtn");
const finaleBackToNotesBtn = document.getElementById("finaleBackToNotesBtn");

// Cinematic Heart Rain Overlay State
let isHeartSequenceActive = false;
let heartRainAnimFrame = null;
let heartWordTimeouts = [];
let heartRainResizeListener = null;

// ============================================================================
// INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initSupabaseAuth();
  initSiteTexts();
  setupDynamicContent();
  setupBackground();
  initOpeningScreen();
  initParticlesCanvas();
  initConfettiCanvas();
  setupEventListeners();
  initScrapbookMemories();
  initBackgroundMusic();
  initGuestbook();
  initLoveNotesSystem();
  initChapterSystem();
  initPhotoStorageAndBurstSettings();
  setupAdminPanelControls();
  loadBirthdayContentFromSupabase();
  loadBirthdayPhotosFromSupabase();
});

function setupDynamicContent() {
  if (openingPersonName) {
    openingPersonName.textContent = currentName;
  }
  if (openingMessage) {
    openingMessage.innerHTML = `I made something Just for you, <span class="recipient-highlight" id="openingPersonName">${currentName}</span> ❤️`;
  }

  // Update photo sticker image on Opening Screen with a real photo
  const stickerImg = document.getElementById("showMeStickerImg");
  if (stickerImg) {
    const photos = getThreeHeroPhotos();
    if (photos && photos.length > 0 && photos[0]) {
      stickerImg.src = photos[0];
    } else if (currentBgImage && currentBgImage.trim() !== "") {
      stickerImg.src = currentBgImage;
    }
  }

  if (heroPersonName) heroPersonName.textContent = currentName;

  const celebrationEyebrow = document.getElementById("celebrationEyebrow");
  if (celebrationEyebrow) {
    if (burstConfig.headline && burstConfig.headline.trim() !== "" && burstConfig.headline !== "Happy Birthday, My Love ❤️") {
      celebrationEyebrow.textContent = burstConfig.headline;
    } else {
      celebrationEyebrow.textContent = "✨ A VERY SPECIAL CELEBRATION ✨";
    }
  }
  if (celebrationTitle) {
    celebrationTitle.textContent = "Happy Birthday, My Love ❤️";
  }
  const celebrationSurpriseIntro = document.getElementById("celebrationSurpriseIntro");
  if (celebrationSurpriseIntro) {
    celebrationSurpriseIntro.textContent = "I made this little surprise just for you.";
  }
  if (celebrationMsg) celebrationMsg.textContent = currentMessage;

  // Set initial dev form values
  if (devNameInput) devNameInput.value = currentName;
  if (devMessageInput) devMessageInput.value = currentMessage;
  if (devBgInput) devBgInput.value = currentBgImage;
  if (devOpacityInput) {
    devOpacityInput.value = String(currentOverlayOpacity);
    if (devOpacityVal) devOpacityVal.textContent = `${Math.round(currentOverlayOpacity * 100)}%`;
  }
}

function setupBackground() {
  if (!bgImageEl || !bgOverlayEl) return;

  // Apply overlay opacity
  document.documentElement.style.setProperty("--overlay-opacity", String(currentOverlayOpacity));
  const bgWrapper = document.getElementById("bgWrapper");

  if (currentBgImage && currentBgImage.trim() !== "") {
    // Pre-test image to avoid broken icon
    const imgTest = new Image();
    imgTest.src = currentBgImage;
    imgTest.onload = () => {
      bgImageEl.style.backgroundImage = `url("${currentBgImage}")`;
      bgImageEl.style.opacity = "1";
      document.body.classList.add("has-bg-image");
      if (bgWrapper) bgWrapper.classList.add("has-bg-image");
    };
    imgTest.onerror = () => {
      // Graceful fallback to pure animated gradient mesh
      bgImageEl.style.opacity = "0";
      document.body.classList.remove("has-bg-image");
      if (bgWrapper) bgWrapper.classList.remove("has-bg-image");
    };
  } else {
    bgImageEl.style.opacity = "0";
    document.body.classList.remove("has-bg-image");
    if (bgWrapper) bgWrapper.classList.remove("has-bg-image");
  }
}

// ============================================================================
// EXPERIENCE SEQUENCE CONTROLLER
// (Opening Screen -> "SHOW ME" -> 3-2-1 Reveal -> 10s Photo Hover -> Main Celebration)
// ============================================================================
let revealCountdownTimer = null;
let photoRevealTimer = null;
let photoRevealSecondsInterval = null;

function initOpeningScreen() {
  if (revealCountdownTimer) {
    clearInterval(revealCountdownTimer);
    revealCountdownTimer = null;
  }
  if (photoRevealTimer) {
    clearTimeout(photoRevealTimer);
    photoRevealTimer = null;
  }
  if (photoRevealSecondsInterval) {
    clearInterval(photoRevealSecondsInterval);
    photoRevealSecondsInterval = null;
  }

  isCelebrationActive = false;

  // Make sure opening screen is active and visible
  if (openingScreen) {
    openingScreen.style.display = "flex";
    openingScreen.classList.add("active");
  }

  // Stop any active heart rain animation
  stopHeartRainAnimation();

  if (revealCountdownStage) {
    revealCountdownStage.style.display = "none";
  }

  if (tenSecondPhotoReveal) {
    tenSecondPhotoReveal.classList.remove("active");
    tenSecondPhotoReveal.style.display = "none";
  }

  if (celebrationScreen) {
    celebrationScreen.classList.remove("active");
  }

  // Hide Chapter navigation bar on opening screen
  if (chapterNavBar) {
    chapterNavBar.style.display = "none";
  }

  // Update recipient name in message
  if (openingPersonName) {
    openingPersonName.textContent = currentName;
  }
}

// Characters and palettes for the Matrix digital heart rain curtain
const MATRIX_HEART_CHARS = ["♥", "♡", "❤", "♥", "♥", "♡", "1", "0", "♥", "*", "♥"];
const MATRIX_PINK_COLORS = ["#ff2a7a", "#ff1493", "#ff007f", "#ff69b4", "#e0218a", "#ff80bf", "#f43f5e"];
const MATRIX_BLUE_COLORS = ["#00d2ff", "#00f0ff", "#38bdf8", "#7dd3fc"];

/**
 * Fine-Tuning Parameters for Digital Heart Rain Animation
 * Allows fine-tuning of trail decay rate, particle opacity, and high-resolution screen density.
 */
const HEART_RAIN_CONFIG = {
  // Trail Decay Rate (0.03 to 0.18):
  // Lower values leave longer, richer, persistent digital ghosting trails.
  // Higher values clear trails more rapidly. Calibrated to 0.068 for an immersive matrix look.
  trailDecayRate: 0.068,

  // Base Particle Opacity (0.1 to 1.0):
  // Global opacity multiplier applied to all falling hearts.
  baseParticleOpacity: 0.95,

  // Minimum Particle Opacity (0.02 to 0.20):
  // Preserves subtle delicate visibility at the very tail of each column.
  minParticleOpacity: 0.06,

  // Lead Particle Opacity (0.8 to 1.0):
  // Luminance of the leading head heart in each stream.
  leadParticleOpacity: 1.0,

  // Column Density Factor (higher = more columns across screen width):
  // Calibrated for high-density curtains across desktop, tablet, and mobile.
  columnDensityFactor: 98,

  // High-Resolution Screen Compensation:
  // On high-DPI screens (Retina, 2x, 3x displays), boosts opacity and scales font size
  // to ensure delicate heart glyphs render dense, rich, and saturated rather than faint.
  highDpiOpacityBoost: 1.15,
  minFontSize: 11,
  maxFontSize: 16,

  // Trail Length range:
  minTrailLength: 20,
  trailLengthSpan: 14 // 20 to 34 hearts per column
};

// Expose configuration globally for live inspection & adjustments
window.HEART_RAIN_CONFIG = HEART_RAIN_CONFIG;

// Clean, glowing neon pink vector heart matching the exact shade and bloom of the typography (NOT an OS emoji)
const NEON_HEART_SVG = `<svg class="neon-heart-svg" viewBox="0 0 24 24" fill="#ff2a7a" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

/**
 * Executes the full cinematic black screen + high-density digital raining hearts curtain +
 * countdown (3 -> 2 -> 1) -> words (HAPPY -> BIRTHDAY -> TO -> YOU -> JOY) ->
 * glowing neon pink heart, matching the exact neon shade and video flow.
 */
function startCinematicHeartSequence() {
  if (isHeartSequenceActive) return;
  isHeartSequenceActive = true;

  const overlay = document.getElementById("cinematicHeartRainOverlay");
  const canvas = document.getElementById("heartRainCanvas");
  const wordEl = document.getElementById("heartRainWord");

  if (!overlay || !canvas || !wordEl) {
    // If elements missing, proceed directly to existing countdown
    isHeartSequenceActive = false;
    proceedToExistingCountdown();
    return;
  }

  // Smoothly hide Opening Screen
  if (openingScreen) {
    openingScreen.classList.remove("active");
    openingScreen.style.display = "none";
  }
  if (celebrationScreen) {
    celebrationScreen.classList.remove("active");
  }

  // 1. FADE TO BLACK: Smoothly transition into pure black background
  overlay.style.display = "flex";
  void overlay.offsetWidth;
  overlay.classList.add("active");

  // Reset center word state
  wordEl.innerHTML = "";
  wordEl.className = "heart-rain-word";

  // Canvas setup with high-DPI scaling
  const ctx = canvas.getContext("2d");
  let dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  let logicalWidth = window.innerWidth;
  let logicalHeight = window.innerHeight;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    logicalWidth = window.innerWidth;
    logicalHeight = window.innerHeight;
    canvas.width = Math.floor(logicalWidth * dpr);
    canvas.height = Math.floor(logicalHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();

  heartRainResizeListener = () => {
    resizeCanvas();
  };
  window.addEventListener("resize", heartRainResizeListener, { passive: true });

  // Initial solid pure black fill
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, logicalWidth, logicalHeight);

  // 2. & 3. HIGH-DENSITY DIGITAL MATRIX HEART RAIN COLUMNS (Ultra-immersive curtain)
  const colSpacing = Math.max(9, Math.min(13, Math.floor(logicalWidth / HEART_RAIN_CONFIG.columnDensityFactor)));
  const fontSize = Math.max(HEART_RAIN_CONFIG.minFontSize, Math.min(HEART_RAIN_CONFIG.maxFontSize, Math.floor(colSpacing * 0.94)));
  const colCount = Math.floor(logicalWidth / colSpacing) + 1;
  const streams = [];

  // Multi-wave dense cascade during build-up:
  for (let i = 0; i < colCount; i++) {
    const isPinkTheme = Math.random() < 0.76;
    
    // Wave 1: 0 - 250ms (35% of streams immediately fall from top)
    // Wave 2: 250 - 750ms (35% more join)
    // Wave 3: 750 - 1500ms (remaining 30% fill the screen into rich immersive curtains)
    let activationTime = 0;
    const tier = Math.random();
    if (tier < 0.35) {
      activationTime = Math.random() * 250;
    } else if (tier < 0.70) {
      activationTime = 250 + Math.random() * 500;
    } else {
      activationTime = 750 + Math.random() * 750;
    }

    streams.push({
      x: i * colSpacing + colSpacing / 2,
      y: -Math.random() * 80 - 10,
      speed: Math.random() * 3.4 + 2.6,
      spacing: fontSize + 1,
      trailLength: Math.floor(Math.random() * HEART_RAIN_CONFIG.trailLengthSpan) + HEART_RAIN_CONFIG.minTrailLength,
      isPink: isPinkTheme,
      palette: isPinkTheme ? MATRIX_PINK_COLORS : MATRIX_BLUE_COLORS,
      brightness: Math.random() * 0.35 + 0.65,
      activationTime: activationTime,
      chars: Array.from({ length: 36 }, () => MATRIX_HEART_CHARS[Math.floor(Math.random() * MATRIX_HEART_CHARS.length)])
    });
  }

  const startTime = performance.now();
  let lastTimestamp = performance.now();
  let speedMultiplier = 1.0;
  let isRunning = true;

  function renderHeartRain(currentTime) {
    if (!isRunning) return;

    // Delta time ensures consistent high performance across 60Hz and high-refresh displays
    const delta = Math.min((currentTime - lastTimestamp) / 16.67, 2.0);
    lastTimestamp = currentTime;
    const elapsed = currentTime - startTime;

    // Fading trail effect: configurable decay rate ensures optimal density and ghosting on all screens
    const decayRate = Math.max(0.03, Math.min(0.2, HEART_RAIN_CONFIG.trailDecayRate));
    ctx.fillStyle = `rgba(0, 0, 0, ${decayRate})`;
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);

    const centerX = logicalWidth / 2;
    const centerY = logicalHeight / 2;
    const dpiBoost = dpr > 1.2 ? HEART_RAIN_CONFIG.highDpiOpacityBoost : 1.0;

    ctx.font = `bold ${fontSize}px "Courier New", monospace, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < streams.length; i++) {
      const s = streams[i];
      if (elapsed < s.activationTime) continue;

      // Smooth density ramp-in for each column
      const timeSinceActivation = elapsed - s.activationTime;
      const densityRamp = Math.min(1.0, timeSinceActivation / 280);

      s.y += s.speed * speedMultiplier * delta;

      // Draw subtle vertical trailing pattern of hearts
      const trailCount = s.trailLength;
      for (let j = 0; j <= trailCount; j++) {
        const py = s.y - j * s.spacing;
        if (py < -20 || py > logicalHeight + 20) continue;

        const isHead = j === 0;
        const char = s.chars[j % s.chars.length];

        // Subtle vertical falloff calibrated with HEART_RAIN_CONFIG
        const falloff = isHead ? 1.0 : Math.pow(1 - j / trailCount, 1.25);
        let alpha = falloff * s.brightness * densityRamp * HEART_RAIN_CONFIG.baseParticleOpacity * dpiBoost;

        // Keep center readable for neon numbers and words
        const distFromCenter = Math.hypot(s.x - centerX, py - centerY);
        if (distFromCenter < 240) {
          const ratio = distFromCenter / 240;
          alpha *= (0.24 + 0.76 * ratio);
        }

        const minAlpha = HEART_RAIN_CONFIG.minParticleOpacity;
        const maxAlpha = isHead ? HEART_RAIN_CONFIG.leadParticleOpacity : 0.96;
        ctx.globalAlpha = Math.max(minAlpha, Math.min(maxAlpha, alpha));

        if (isHead) {
          // Bright white-pink glowing lead head heart
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = s.isPink ? "#ff2a7a" : "#00e5ff";
          ctx.shadowBlur = 10;
        } else {
          // Trailing vertical pattern (shadowBlur disabled for 60fps performance)
          ctx.fillStyle = s.palette[j % s.palette.length];
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, s.x, py);
      }

      // Reset stream when fully off-screen
      if (s.y - s.trailLength * s.spacing > logicalHeight) {
        s.y = -Math.random() * 80 - 15;
        s.speed = Math.random() * 3.4 + 2.6;
        s.isPink = Math.random() < 0.76;
        s.palette = s.isPink ? MATRIX_PINK_COLORS : MATRIX_BLUE_COLORS;
        s.chars = Array.from({ length: 36 }, () => MATRIX_HEART_CHARS[Math.floor(Math.random() * MATRIX_HEART_CHARS.length)]);
      }
    }

    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
    heartRainAnimFrame = requestAnimationFrame(renderHeartRain);
  }

  heartRainAnimFrame = requestAnimationFrame(renderHeartRain);

  // Helper function to animate numbers, words, and hearts with neon bloom
  function showWord(word, customClass = "", duration = 1200, isHtml = false) {
    return new Promise((resolve) => {
      wordEl.className = `heart-rain-word ${customClass}`.trim();
      if (isHtml) {
        wordEl.innerHTML = word;
      } else {
        wordEl.textContent = word;
      }

      // Trigger entrance animation
      void wordEl.offsetWidth;
      wordEl.classList.add("word-show");

      // Schedule exit transition
      const exitTimer = setTimeout(() => {
        wordEl.classList.remove("word-show");
        wordEl.classList.add("word-exit");

        const nextTimer = setTimeout(() => {
          wordEl.className = "heart-rain-word";
          wordEl.innerHTML = "";
          resolve();
        }, 200);
        heartWordTimeouts.push(nextTimer);
      }, duration);

      heartWordTimeouts.push(exitTimer);
    });
  }

  // EXACT SEQUENCE FROM THE VIDEO:
  // Density build-up -> 3 -> 2 -> 1 -> HAPPY -> BIRTHDAY -> TO -> YOU -> JOY -> Glowing Pink Heart
  async function runWordSequence() {
    // 1. Density Build-Up: Allow the heart rain to build up immersion across the screen
    await new Promise((r) => {
      const t = setTimeout(r, 2400);
      heartWordTimeouts.push(t);
    });

    if (!isRunning) return;
    // 2. Countdown 3 -> 2 -> 1 right in the center of the rain (00:02 - 00:05 in video)
    await showWord("3", "word-countdown", 950);

    if (!isRunning) return;
    await new Promise((r) => {
      const t = setTimeout(r, 100);
      heartWordTimeouts.push(t);
    });

    if (!isRunning) return;
    await showWord("2", "word-countdown", 950);

    if (!isRunning) return;
    await new Promise((r) => {
      const t = setTimeout(r, 100);
      heartWordTimeouts.push(t);
    });

    if (!isRunning) return;
    await showWord("1", "word-countdown", 950);

    if (!isRunning) return;
    await new Promise((r) => {
      const t = setTimeout(r, 120);
      heartWordTimeouts.push(t);
    });

    // 3. Words sequence (00:06 - 00:12 in video)
    if (!isRunning) return;
    await showWord("HAPPY", "", 1150);

    if (!isRunning) return;
    await new Promise((r) => {
      const t = setTimeout(r, 120);
      heartWordTimeouts.push(t);
    });

    if (!isRunning) return;
    await showWord("BIRTHDAY", "", 1200);

    if (!isRunning) return;
    await new Promise((r) => {
      const t = setTimeout(r, 120);
      heartWordTimeouts.push(t);
    });

    if (!isRunning) return;
    await showWord("TO", "", 950);

    if (!isRunning) return;
    await new Promise((r) => {
      const t = setTimeout(r, 120);
      heartWordTimeouts.push(t);
    });

    if (!isRunning) return;
    await showWord("YOU", "", 950);

    if (!isRunning) return;
    await new Promise((r) => {
      const t = setTimeout(r, 120);
      heartWordTimeouts.push(t);
    });

    if (!isRunning) return;
    // 4. JOY: Large impactful neon bloom with speed pulse
    speedMultiplier = 1.35;
    await showWord("JOY", "word-joy", 1650);

    if (!isRunning) return;
    await new Promise((r) => {
      const t = setTimeout(r, 140);
      heartWordTimeouts.push(t);
    });

    if (!isRunning) return;
    // 5. Large Glowing Pink Heart (Matches exact same shade & bloom as words, NOT an emoji!)
    await showWord(NEON_HEART_SVG, "word-heart", 1600, true);

    if (!isRunning) return;
    // Hold brief moment after Heart, then smoothly transition into birthday celebration reveal
    const endTimer = setTimeout(() => {
      finishCinematicHeartSequence();
    }, 400);
    heartWordTimeouts.push(endTimer);
  }

  function finishCinematicHeartSequence() {
    isRunning = false;

    // Smooth fade out of black heart rain overlay
    overlay.classList.remove("active");

    setTimeout(() => {
      stopHeartRainAnimation();
      // Seamlessly proceed directly into photo reveal & celebration!
      triggerBirthdayRevealWithPhotoHover();
    }, 650);
  }

  runWordSequence();
}

/**
 * Safely terminates heart rain animation and frees all canvas/timer resources.
 */
function stopHeartRainAnimation() {
  const overlay = document.getElementById("cinematicHeartRainOverlay");
  const wordEl = document.getElementById("heartRainWord");

  if (overlay) {
    overlay.classList.remove("active");
    overlay.style.display = "none";
  }

  if (wordEl) {
    wordEl.textContent = "";
    wordEl.className = "heart-rain-word";
  }

  if (heartRainAnimFrame) {
    cancelAnimationFrame(heartRainAnimFrame);
    heartRainAnimFrame = null;
  }

  heartWordTimeouts.forEach((t) => clearTimeout(t));
  heartWordTimeouts = [];

  if (heartRainResizeListener) {
    window.removeEventListener("resize", heartRainResizeListener);
    heartRainResizeListener = null;
  }

  isHeartSequenceActive = false;
}

/**
 * Primary handler for SHOW ME button / photo sticker tap.
 * Primes audio, begins music playback, and launches the raining hearts sequence.
 */
function startRevealSequence() {
  if (isHeartSequenceActive) return;

  // Prime and play background music right away so it accompanies the heart rain sequence
  if (bgAudio) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && !audioContext) {
        audioContext = new AudioCtx();
      }
      if (audioContext && audioContext.state === "suspended") {
        audioContext.resume();
      }
    } catch (e) {}

    if (!userExplicitlyPaused) {
      playMusic();
    }
  }

  // Trigger cinematic raining hearts digital curtain + countdown + word reveal!
  startCinematicHeartSequence();
}

/**
 * EXISTING 3 -> 2 -> 1 Countdown Sequence.
 * Handed off seamlessly immediately following the heart rain + "JOY" sequence.
 */
function proceedToExistingCountdown() {
  // Show 3 -> 2 -> 1 Reveal stage
  if (revealCountdownStage) {
    revealCountdownStage.style.display = "flex";
  }

  let count = 3;
  if (revealCountdownNum) {
    revealCountdownNum.textContent = String(count);
    revealCountdownNum.className = "reveal-countdown-number tick-pop";
  }
  if (revealCountdownSub) {
    revealCountdownSub.textContent = "Getting your surprise ready...";
  }

  if (revealCountdownTimer) clearInterval(revealCountdownTimer);

  revealCountdownTimer = setInterval(() => {
    count--;
    if (count > 0) {
      if (revealCountdownNum) {
        revealCountdownNum.textContent = String(count);
        revealCountdownNum.className = "reveal-countdown-number";
        void revealCountdownNum.offsetWidth; // Restart CSS keyframe animation
        revealCountdownNum.className = "reveal-countdown-number tick-pop";
      }
      if (revealCountdownSub) {
        revealCountdownSub.textContent = count === 2 ? "Almost there..." : "Here it comes! ❤️";
      }
    } else {
      // Reached 0: Countdown finishes!
      clearInterval(revealCountdownTimer);
      revealCountdownTimer = null;

      if (revealCountdownStage) {
        revealCountdownStage.style.display = "none";
      }

      // STEP 8: Birthday music starts immediately
      if (!userExplicitlyPaused) {
        playMusic();
      }

      // STEP 9: The 3D sequential photo reveal begins
      triggerBirthdayRevealWithPhotoHover();
    }
  }, 1000);
}

function triggerBirthdayRevealWithPhotoHover() {
  // Launch celebration confetti
  startConfettiAnimation();

  // Launch the 10-second photo hover reveal
  startTenSecondPhotoReveal();
}

function getThreeHeroPhotos() {
  let photoUrls = [];

  if (Array.isArray(currentRevealPhotos) && currentRevealPhotos.some(u => Boolean(u) && typeof u === "string" && u.trim() !== "")) {
    photoUrls = currentRevealPhotos.map(u => (typeof u === "string" ? u.trim() : "")).filter(Boolean);
  }

  if (photoUrls.length === 0 && Array.isArray(currentPhotos) && currentPhotos.length > 0) {
    photoUrls = currentPhotos
      .map(p => (typeof p === "string" ? p : (p.src || p.url || "")))
      .filter(u => Boolean(u) && u.trim() !== "");
  }

  if (photoUrls.length === 0 && Array.isArray(defaultBurstPhotos) && defaultBurstPhotos.length > 0) {
    photoUrls = defaultBurstPhotos.slice();
  }

  // Fallback if no photos
  if (photoUrls.length === 0) {
    photoUrls = [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80"
    ];
  }

  const p1 = photoUrls[0] || "";
  const p2 = photoUrls[1] || photoUrls[0] || "";
  const p3 = photoUrls[2] || photoUrls[1] || photoUrls[0] || "";

  return [p1, p2, p3];
}

function getRevealThirdTitle() {
  if (burstConfig.revealThirdTitle && burstConfig.revealThirdTitle.trim() !== "") {
    return burstConfig.revealThirdTitle.trim();
  }
  if (currentPhotos && currentPhotos[2] && (currentPhotos[2].caption || currentPhotos[2].name)) {
    return (currentPhotos[2].caption || currentPhotos[2].name).trim();
  }
  return "MY EVERYTHING ❤️";
}

function startTenSecondPhotoReveal() {
  if (!tenSecondPhotoReveal) {
    // If element missing, jump directly to main celebration
    triggerCelebration();
    return;
  }

  // Pick the three prominent photos
  const [photo1, photo2, photo3] = getThreeHeroPhotos();
  const title1 = currentRevealTitles[0] || "MY BABY";
  const title2 = currentRevealTitles[1] || "MY LOVE";
  const title3 = getRevealThirdTitle();

  if (threeFloatingPhotosStage) {
    threeFloatingPhotosStage.innerHTML = `
      <!-- Photo 1: Furthest in background, smaller, slightly blurred/subdued, moves forward smoothly -->
      <div class="reveal-photo-card card-photo-1" id="revealCard1" title="Click to view memory (${escapeHtml(title1)})">
        <div class="reveal-card-inner">
          <img src="${photo1}" alt="${title1} - Cherished memory with ${escapeHtml(currentName)}" class="reveal-photo-img" />
          <div class="reveal-specular-sheen"></div>
        </div>
        <div class="reveal-photo-badge badge-photo-1">
          <span>✨</span>
          <span>${title1}</span>
          <span>✨</span>
        </div>
      </div>

      <!-- Photo 2: Starts behind Photo 1 / middle layer, slightly larger, moves forward toward viewer -->
      <div class="reveal-photo-card card-photo-2" id="revealCard2" title="Click to view memory (${escapeHtml(title2)})">
        <div class="reveal-card-inner">
          <img src="${photo2}" alt="${title2} - Cherished memory with ${escapeHtml(currentName)}" class="reveal-photo-img" />
          <div class="reveal-specular-sheen"></div>
        </div>
        <div class="reveal-photo-badge badge-photo-2">
          <span>❤️</span>
          <span>${title2}</span>
          <span>❤️</span>
        </div>
      </div>

      <!-- Photo 3: Starts deep, moves forward to front-center, largest, main focal centerpiece -->
      <div class="reveal-photo-card card-photo-3" id="revealCard3" title="Click to view memory (${escapeHtml(title3)})">
        <div class="reveal-card-inner">
          <img src="${photo3}" alt="${escapeHtml(title3)} - Cherished memory with ${escapeHtml(currentName)}" class="reveal-photo-img" />
          <div class="reveal-specular-sheen"></div>
        </div>
        <div class="reveal-photo-badge badge-photo-3">
          <span>👑</span>
          <span>${escapeHtml(title3)}</span>
          <span>✨</span>
        </div>
      </div>
    `;

    // Hook click to lightbox on each photo
    const card1 = document.getElementById("revealCard1");
    const card2 = document.getElementById("revealCard2");
    const card3 = document.getElementById("revealCard3");

    if (card1) card1.addEventListener("click", () => openLightbox(photo1, title1));
    if (card2) card2.addEventListener("click", () => openLightbox(photo2, title2));
    if (card3) card3.addEventListener("click", () => openLightbox(photo3, title3));
  }

  // Reset timer UI (10s progress bar and countdown)
  if (revealTimerProgress) {
    revealTimerProgress.style.animation = "none";
    void revealTimerProgress.offsetWidth;
    revealTimerProgress.style.animation = "revealBarShrink 10s linear forwards";
  }

  let remainingSec = 10;
  if (revealCountdownSeconds) {
    revealCountdownSeconds.textContent = `${remainingSec}s`;
  }

  if (photoRevealSecondsInterval) clearInterval(photoRevealSecondsInterval);
  photoRevealSecondsInterval = setInterval(() => {
    remainingSec--;
    if (remainingSec >= 1 && revealCountdownSeconds) {
      revealCountdownSeconds.textContent = `${remainingSec}s`;
    } else {
      clearInterval(photoRevealSecondsInterval);
      photoRevealSecondsInterval = null;
    }
  }, 1000);

  // Show the 10-second photo reveal overlay
  tenSecondPhotoReveal.style.display = "flex";
  void tenSecondPhotoReveal.offsetWidth;
  tenSecondPhotoReveal.classList.add("active");

  // Schedule transition to main birthday experience after 10 seconds
  if (photoRevealTimer) clearTimeout(photoRevealTimer);
  photoRevealTimer = setTimeout(() => {
    completePhotoRevealToMainExperience();
  }, 10000);
}

function completePhotoRevealToMainExperience() {
  if (photoRevealTimer) {
    clearTimeout(photoRevealTimer);
    photoRevealTimer = null;
  }
  if (photoRevealSecondsInterval) {
    clearInterval(photoRevealSecondsInterval);
    photoRevealSecondsInterval = null;
  }

  // Smooth fade out of the 10s photo reveal overlay
  if (tenSecondPhotoReveal) {
    tenSecondPhotoReveal.classList.remove("active");
    setTimeout(() => {
      tenSecondPhotoReveal.style.display = "none";
    }, 700);
  }

  // Transition into main birthday experience
  triggerCelebration();
}

function resetToOpeningScreen() {
  initOpeningScreen();
}

// ============================================================================
// CELEBRATION REVEAL & CONFETTI (Main Birthday Experience)
// ============================================================================
function triggerCelebration() {
  if (revealCountdownTimer) clearInterval(revealCountdownTimer);
  if (photoRevealTimer) clearTimeout(photoRevealTimer);
  if (photoRevealSecondsInterval) clearInterval(photoRevealSecondsInterval);

  isCelebrationActive = true;

  // Ensure Opening Screen and Reveal Stage are hidden
  if (openingScreen) {
    openingScreen.classList.remove("active");
    openingScreen.style.display = "none";
  }
  if (revealCountdownStage) {
    revealCountdownStage.style.display = "none";
  }
  if (tenSecondPhotoReveal) {
    tenSecondPhotoReveal.classList.remove("active");
    tenSecondPhotoReveal.style.display = "none";
  }

  // Activate Celebration screen
  if (celebrationScreen) celebrationScreen.classList.add("active");

  const celebrationEyebrow = document.getElementById("celebrationEyebrow");
  if (celebrationEyebrow) {
    if (burstConfig.headline && burstConfig.headline.trim() !== "" && burstConfig.headline !== "Happy Birthday, My Love ❤️") {
      celebrationEyebrow.textContent = burstConfig.headline;
    } else {
      celebrationEyebrow.textContent = "✨ A VERY SPECIAL CELEBRATION ✨";
    }
  }

  if (celebrationTitle) {
    celebrationTitle.textContent = "Happy Birthday, My Love ❤️";
  }

  const celebrationSurpriseIntro = document.getElementById("celebrationSurpriseIntro");
  if (celebrationSurpriseIntro) {
    celebrationSurpriseIntro.textContent = "I made this little surprise just for you.";
  }

  if (celebrationMsg) {
    celebrationMsg.textContent = currentMessage;
  }

  // Always unlock last-day features on celebration
  unlockLastDaySection();

  // Reveal Guestbook gallery alongside birthday celebration
  if (guestbookSection) {
    guestbookSection.classList.add("active");
    renderGuestbookGallery();
  }

  // Launch celebratory Confetti
  startConfettiAnimation();

  // Trigger Photo Burst feature (with 5-second pinned hero cards that settle into layout)
  showHeroPinnedPhotos();

  // Show Chapter navigation bar and ensure Chapter 1 is active
  if (chapterNavBar) {
    chapterNavBar.style.display = "flex";
  }
  showChapter(1, false);

  // Keep music playing smoothly; if not yet started and user hasn't explicitly paused, start it
  if (!isMusicPlaying && !userExplicitlyPaused) {
    playMusic();
  }
}

function unlockLastDaySection() {
  if (lastDaySection) {
    lastDaySection.classList.add("unlocked");
  }
}

// ============================================================================
// BACKGROUND MUSIC ENGINE (MP3 / WAV / OGG & Mobile Autoplay Policy Handler)
// ============================================================================

function initBackgroundMusic() {
  if (!bgAudio) return;

  // Configure audio tag with backgroundMusic setting
  bgAudio.src = backgroundMusic;
  bgAudio.loop = Boolean(loopMusic);
  bgAudio.volume = 0.65;

  bgAudio.addEventListener("ended", () => {
    if (!loopMusic) {
      isMusicPlaying = false;
      updateMusicUI(false);
    }
  });

  bgAudio.addEventListener("error", () => {
    console.warn("Notice: Audio file at " + backgroundMusic + " could not be loaded; using soft ambient chimes synthesizer as fallback.");
    if (isMusicPlaying) {
      startAmbientSynth();
    }
  });

  // Prepare audio element with user-configured volume and looping
  isMusicPlaying = false;
  updateMusicUI(false);
}

function playMusic() {
  userExplicitlyPaused = false;

  if (bgAudio) {
    const playPromise = bgAudio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isMusicPlaying = true;
          updateMusicUI(true);
        })
        .catch(() => {
          // Fallback to ambient chime synth if browser blocks media element
          startAmbientSynth();
          isMusicPlaying = true;
          updateMusicUI(true);
        });
    } else {
      isMusicPlaying = true;
      updateMusicUI(true);
    }
  } else {
    startAmbientSynth();
    isMusicPlaying = true;
    updateMusicUI(true);
  }
}

function pauseMusic() {
  if (bgAudio) {
    bgAudio.pause();
  }
  stopAmbientSynth();
  isMusicPlaying = false;
  userExplicitlyPaused = true;
  updateMusicUI(false);
  hideAutoplayPrompt();
}

function toggleMusic() {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function toggleMute() {
  if (!bgAudio) return;
  isMusicMuted = !isMusicMuted;
  bgAudio.muted = isMusicMuted;
  if (musicMuteBtn) {
    musicMuteBtn.textContent = isMusicMuted ? "🔇" : "🔊";
    musicMuteBtn.setAttribute("title", isMusicMuted ? "Unmute music" : "Mute music");
  }
}

function updateMusicUI(playing) {
  if (soundBars) {
    if (playing) {
      soundBars.classList.add("playing");
    } else {
      soundBars.classList.remove("playing");
    }
  }
  if (musicBtnLabel) {
    musicBtnLabel.textContent = playing ? "Playing" : "Music";
  }
  if (musicPlayBtn) {
    musicPlayBtn.setAttribute("title", playing ? "Pause background music" : "Play background music");
  }
  if (musicBtn) {
    if (playing) {
      musicBtn.classList.add("music-playing");
    } else {
      musicBtn.classList.remove("music-playing");
    }
  }
}

function showAutoplayPrompt() {
  // Autoplay prompt removed per specification: music starts directly after countdown
}

function hideAutoplayPrompt() {
  // Autoplay prompt removed
}

// Gentle pentatonic chime sequence (synthesizer fallback)
const CHIME_PENTATONIC = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  659.25  // E5
];

function playSoftChime(freq, duration = 3.5, gainLevel = 0.08) {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) audioContext = new AudioCtx();
  }
  if (!audioContext) return;
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  try {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, audioContext.currentTime);

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainLevel, audioContext.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + duration);
  } catch {
    // Graceful silent return
  }
}

function startAmbientSynth() {
  if (synthInterval) clearInterval(synthInterval);

  playSoftChime(261.63, 4, 0.06);
  setTimeout(() => playSoftChime(329.63, 4, 0.05), 300);
  setTimeout(() => playSoftChime(392.00, 4, 0.05), 600);

  synthInterval = setInterval(() => {
    if (!isMusicPlaying) return;
    const randomFreq = CHIME_PENTATONIC[Math.floor(Math.random() * CHIME_PENTATONIC.length)];
    playSoftChime(randomFreq, 3.2, 0.07);

    if (Math.random() > 0.5) {
      setTimeout(() => {
        const harmonyFreq = CHIME_PENTATONIC[Math.floor(Math.random() * CHIME_PENTATONIC.length)];
        playSoftChime(harmonyFreq, 3.5, 0.05);
      }, 600);
    }
  }, 2200);
}

function stopAmbientSynth() {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
}

// ============================================================================
// BIRTHDAY GUESTBOOK ENGINE (Text Notes, Video Wishes & Gallery)
// ============================================================================

const GUESTBOOK_STORAGE_KEY = "birthday_guestbook_messages_v1";

function initGuestbook() {
  loadGuestbookMessages();
  renderGuestbookGallery();
  setupGuestbookModal();
}

function loadGuestbookMessages() {
  try {
    const saved = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
    if (saved) {
      guestbookMessages = JSON.parse(saved);
    } else {
      guestbookMessages = [...defaultGuestbookMessages];
      saveGuestbookMessages();
    }
  } catch {
    guestbookMessages = [...defaultGuestbookMessages];
  }
}

function saveGuestbookMessages() {
  try {
    localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(guestbookMessages));
  } catch (err) {
    console.warn("Could not persist guestbook to localStorage:", err);
  }

  // Persist to Supabase birthday_content.love_notes
  if (!isInitialSupabaseLoading) {
    if (isCurrentUserAdmin()) {
      saveAllBirthdayContentToSupabase({ love_notes: guestbookMessages });
    } else {
      // Attempt visitor update with anon key (falls back cleanly to localStorage if unauthorized)
      saveAllBirthdayContentToSupabase({ love_notes: guestbookMessages }, false);
    }
  }
}

function renderGuestbookGallery(filter = currentGuestbookFilter) {
  if (!guestbookGallery) return;
  currentGuestbookFilter = filter;

  let filtered = guestbookMessages;
  if (filter === "text") {
    filtered = guestbookMessages.filter(m => m.type !== "video");
  } else if (filter === "video") {
    filtered = guestbookMessages.filter(m => m.type === "video");
  }

  if (guestbookCount) {
    guestbookCount.textContent = String(guestbookMessages.length);
  }

  guestbookGallery.innerHTML = "";

  // Prompt card to encourage visitors to sign
  const promptCard = document.createElement("div");
  promptCard.className = "guest-prompt-card";
  promptCard.id = "guestPromptCard";
  promptCard.innerHTML = `
    <div class="guest-prompt-icon">✍️</div>
    <div class="guest-prompt-title">Leave a Birthday Wish</div>
    <div class="guest-prompt-desc">Add a sweet note or video for ${escapeHtml(currentName)}!</div>
  `;
  promptCard.addEventListener("click", openSignGuestbook);
  guestbookGallery.appendChild(promptCard);

  // Render cards
  filtered.forEach((item) => {
    const card = document.createElement("div");
    card.className = "guest-item-card";
    card.id = `guestCard_${item.id}`;

    const isLiked = Boolean(item.likedByUser);
    const stickerHtml = item.sticker ? `<span class="guest-sticker-badge">${escapeHtml(item.sticker)}</span>` : "";

    if (item.type === "video") {
      card.innerHTML = `
        <div class="guest-item-header">
          <div class="guest-avatar">${escapeHtml(item.avatar || "🎥")}</div>
          <div class="guest-author-info">
            <span class="guest-author-name">${escapeHtml(item.author)}</span>
            <span class="guest-role-tag">${escapeHtml(item.role || "Friend 💕")}</span>
          </div>
          ${stickerHtml}
        </div>
        <div class="guest-video-wrapper">
          <video src="${item.videoUrl}" controls playsinline></video>
        </div>
        ${item.message ? `<p class="guest-message-text">${escapeHtml(item.message)}</p>` : ""}
        <div class="guest-item-footer">
          <span>${escapeHtml(item.date || "Today")}</span>
          <button class="guest-like-btn ${isLiked ? 'liked' : ''}" data-id="${item.id}" title="Send love">
            <span>${isLiked ? '❤️' : '🤍'}</span>
            <span>${item.likes || 0}</span>
          </button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="guest-item-header">
          <div class="guest-avatar">${escapeHtml(item.avatar || "💌")}</div>
          <div class="guest-author-info">
            <span class="guest-author-name">${escapeHtml(item.author)}</span>
            <span class="guest-role-tag">${escapeHtml(item.role || "Friend 💕")}</span>
          </div>
          ${stickerHtml}
        </div>
        <p class="guest-message-text">"${escapeHtml(item.message)}"</p>
        <div class="guest-item-footer">
          <span>${escapeHtml(item.date || "Today")}</span>
          <button class="guest-like-btn ${isLiked ? 'liked' : ''}" data-id="${item.id}" title="Send love">
            <span>${isLiked ? '❤️' : '🤍'}</span>
            <span>${item.likes || 0}</span>
          </button>
        </div>
      `;
    }

    const likeBtn = card.querySelector(".guest-like-btn");
    if (likeBtn) {
      likeBtn.addEventListener("click", () => handleLikeWish(item.id));
    }

    guestbookGallery.appendChild(card);
  });
}

function handleLikeWish(id) {
  const item = guestbookMessages.find(m => m.id === id);
  if (!item) return;

  if (item.likedByUser) {
    item.likes = Math.max(0, (item.likes || 1) - 1);
    item.likedByUser = false;
  } else {
    item.likes = (item.likes || 0) + 1;
    item.likedByUser = true;
  }
  saveGuestbookMessages();
  renderLoveNotes();
  renderGuestbookGallery(currentGuestbookFilter);
}

function openSignGuestbook() {
  if (signGuestbookModal) {
    signGuestbookModal.classList.add("active");
  }
}

function closeSignGuestbook() {
  if (signGuestbookModal) {
    signGuestbookModal.classList.remove("active");
  }
  stopModalCamera();
}

function stopModalCamera() {
  if (typeof stopNoteVideoCapture === "function") {
    stopNoteVideoCapture();
  }
  if (typeof stopNoteVoiceCapture === "function") {
    stopNoteVoiceCapture();
  }
}

// ============================================================================
// CHAPTER 3 — BIRTHDAY LOVE NOTES & WISHES ENGINE
// ============================================================================

let noteModalPhotos = []; // array of data URLs or URLs
let noteModalVideo = null; // video data URL or blob URL
let noteModalVoice = null; // audio data URL or blob URL
let noteModalSticker = "💖";
let noteModalVideoRecorder = null;
let noteModalVoiceRecorder = null;
let noteModalVideoStream = null;
let noteModalVoiceStream = null;
let noteModalVideoChunks = [];
let noteModalVoiceChunks = [];

function initLoveNotesSystem() {
  renderLoveNotes();
  setupLoveNotesModal();
  setupAdminLoveNotes();
}

function renderLoveNotes() {
  const loveNotesGrid = document.getElementById("loveNotesCardsGrid") || document.getElementById("loveNotesGrid");
  if (!loveNotesGrid) return;

  const countBadge = document.getElementById("guestbookCount");
  if (countBadge) {
    countBadge.textContent = String(guestbookMessages.length);
  }

  loveNotesGrid.innerHTML = "";

  // Prompt card to invite more wishes
  const promptCard = document.createElement("div");
  promptCard.className = "love-note-card prompt-card";
  promptCard.id = "loveNotePromptCard";
  promptCard.innerHTML = `
    <div style="text-align: center; padding: 1.5rem 1rem;">
      <div style="font-size: 2.2rem; margin-bottom: 0.6rem;">💌</div>
      <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--color-pink-primary); margin-bottom: 0.4rem;">Add Your Love Note</h4>
      <p style="font-size: 0.85rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1rem;">
        Leave a sweet birthday wish, photos, short video, or voice message for ${escapeHtml(currentName)}!
      </p>
      <button type="button" class="primary-btn pulse-glow" style="margin: 0 auto; padding: 0.6rem 1.3rem; font-size: 0.9rem;">
        <span>✍️ Write a Note</span>
      </button>
    </div>
  `;
  promptCard.addEventListener("click", openSignGuestbook);
  loveNotesGrid.appendChild(promptCard);

  guestbookMessages.forEach((item) => {
    const card = document.createElement("div");
    card.className = "love-note-card";
    card.id = `loveNoteCard_${item.id}`;

    const isLiked = Boolean(item.likedByUser);
    const stickerHtml = item.sticker ? `<span class="love-note-sticker">${escapeHtml(item.sticker)}</span>` : "";

    // Photos grid (up to 3)
    let photosHtml = "";
    if (item.photos && item.photos.length > 0) {
      const pCount = Math.min(item.photos.length, 3);
      const imgTags = item.photos.slice(0, 3).map((src, idx) => `
        <div class="love-note-media-item" data-photo-src="${escapeHtml(src)}">
          <img src="${src}" alt="Note photo ${idx + 1}" loading="lazy" />
        </div>
      `).join("");
      photosHtml = `<div class="love-note-media-grid count-${pCount}">${imgTags}</div>`;
    }

    // Video Box
    let videoHtml = "";
    if (item.videoUrl) {
      videoHtml = `
        <div class="love-note-video-box">
          <video src="${item.videoUrl}" controls playsinline preload="metadata"></video>
        </div>
      `;
    }

    // Voice / Audio Box
    let voiceHtml = "";
    if (item.audioUrl) {
      voiceHtml = `
        <div class="love-note-audio-box">
          <div class="love-note-audio-header">🎙️ Voice Note</div>
          <audio src="${item.audioUrl}" controls style="width: 100%; height: 38px;"></audio>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="love-note-header">
        <div class="love-note-avatar">${escapeHtml(item.avatar || "💌")}</div>
        <div class="love-note-author-meta">
          <span class="love-note-author-name">${escapeHtml(item.author)}</span>
          <span class="love-note-author-role">${escapeHtml(item.role || "Loved One 💕")}</span>
        </div>
        ${stickerHtml}
      </div>
      <p class="love-note-body-text">${escapeHtml(item.message || "")}</p>
      ${photosHtml}
      ${videoHtml}
      ${voiceHtml}
      <div class="love-note-footer">
        <span class="love-note-date">${escapeHtml(item.date || "Today")}</span>
        <button class="love-note-like-btn ${isLiked ? 'liked' : ''}" data-id="${item.id}" type="button" title="Send love">
          <span>${isLiked ? '❤️' : '🤍'}</span>
          <span>${item.likes || 0}</span>
        </button>
      </div>
    `;

    // Click photo to open lightbox
    card.querySelectorAll(".love-note-media-item").forEach(el => {
      el.addEventListener("click", () => {
        const src = el.getAttribute("data-photo-src");
        if (src) openLightbox(src, `${item.author}'s photo wish`);
      });
    });

    // Like button
    const likeBtn = card.querySelector(".love-note-like-btn");
    if (likeBtn) {
      likeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        handleLikeWish(item.id);
      });
    }

    loveNotesGrid.appendChild(card);
  });
}

// Multi-attachment rules and modal setup
function setupLoveNotesModal() {
  if (openSignGuestbookBtn) {
    openSignGuestbookBtn.addEventListener("click", openSignGuestbook);
  }
  if (closeSignGuestbookBtn) {
    closeSignGuestbookBtn.addEventListener("click", closeSignGuestbook);
  }
  if (signGuestbookModal) {
    signGuestbookModal.addEventListener("click", (e) => {
      if (e.target === signGuestbookModal) closeSignGuestbook();
    });
  }

  // Sticker Picker
  const stickerOptions = document.querySelectorAll("#stickerPicker .sticker-option");
  stickerOptions.forEach(btn => {
    btn.addEventListener("click", () => {
      stickerOptions.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      noteModalSticker = btn.dataset.sticker || "💖";
    });
  });

  // Photos file input
  const notePhotosInput = document.getElementById("notePhotosInput");
  if (notePhotosInput) {
    notePhotosInput.addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      const maxAllowed = (noteModalVideo || noteModalVoice) ? 2 : 3;
      const slotsRemaining = Math.max(0, maxAllowed - noteModalPhotos.length);

      if (slotsRemaining <= 0) {
        alert(`You can only attach up to ${maxAllowed} photos with your current selection.`);
        notePhotosInput.value = "";
        return;
      }

      const filesToRead = files.slice(0, slotsRemaining);
      let readCount = 0;

      filesToRead.forEach(file => {
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          noteModalPhotos.push(loadEvent.target.result);
          readCount++;
          if (readCount === filesToRead.length) {
            updateNoteAttachmentStatus();
          }
        };
        reader.readAsDataURL(file);
      });

      notePhotosInput.value = "";
    });
  }

  // Video Section toggles and recording
  const openVideoRecorderBtn = document.getElementById("openVideoRecorderBtn");
  const noteVideoPanel = document.getElementById("noteVideoPanel");
  const closeVideoPanelBtn = document.getElementById("closeVideoPanelBtn");
  const startNoteVideoRecBtn = document.getElementById("startNoteVideoRecBtn");
  const stopNoteVideoRecBtn = document.getElementById("stopNoteVideoRecBtn");
  const noteVideoFileInput = document.getElementById("noteVideoFileInput");
  const noteVideoPreview = document.getElementById("noteVideoPreview");
  const noteVideoRecIndicator = document.getElementById("noteVideoRecIndicator");

  if (openVideoRecorderBtn) {
    openVideoRecorderBtn.addEventListener("click", () => {
      if (noteModalVoice) {
        if (!confirm("You already have a voice note attached. Attaching a video will replace your voice note. Proceed?")) return;
        noteModalVoice = null;
      }
      if (noteVideoPanel) noteVideoPanel.style.display = "block";
      updateNoteAttachmentStatus();
    });
  }

  if (closeVideoPanelBtn) {
    closeVideoPanelBtn.addEventListener("click", () => {
      stopNoteVideoCapture();
      if (noteVideoPanel) noteVideoPanel.style.display = "none";
    });
  }

  if (startNoteVideoRecBtn) {
    startNoteVideoRecBtn.addEventListener("click", async () => {
      try {
        noteModalVideoStream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
          audio: true
        });
        if (noteVideoPreview) {
          noteVideoPreview.srcObject = noteModalVideoStream;
          noteVideoPreview.style.display = "block";
          noteVideoPreview.muted = true;
          noteVideoPreview.play();
        }

        noteModalVideoChunks = [];
        noteModalVideoRecorder = new MediaRecorder(noteModalVideoStream);
        noteModalVideoRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) noteModalVideoChunks.push(e.data);
        };
        noteModalVideoRecorder.onstop = () => {
          const blob = new Blob(noteModalVideoChunks, { type: "video/webm" });
          noteModalVideo = URL.createObjectURL(blob);
          noteModalVoice = null; // Video and voice are mutually exclusive
          if (noteVideoPreview) {
            noteVideoPreview.srcObject = null;
            noteVideoPreview.src = noteModalVideo;
            noteVideoPreview.muted = false;
            noteVideoPreview.controls = true;
          }
          stopNoteVideoCapture();
          updateNoteAttachmentStatus();
        };

        noteModalVideoRecorder.start();
        if (startNoteVideoRecBtn) startNoteVideoRecBtn.style.display = "none";
        if (stopNoteVideoRecBtn) stopNoteVideoRecBtn.style.display = "inline-flex";
        if (noteVideoRecIndicator) noteVideoRecIndicator.style.display = "inline-flex";
      } catch (err) {
        alert("Camera or microphone permission is required to record a video.");
      }
    });
  }

  if (stopNoteVideoRecBtn) {
    stopNoteVideoRecBtn.addEventListener("click", () => {
      if (noteModalVideoRecorder && noteModalVideoRecorder.state !== "inactive") {
        noteModalVideoRecorder.stop();
      }
      if (stopNoteVideoRecBtn) stopNoteVideoRecBtn.style.display = "none";
      if (startNoteVideoRecBtn) startNoteVideoRecBtn.style.display = "inline-flex";
      if (noteVideoRecIndicator) noteVideoRecIndicator.style.display = "none";
    });
  }

  if (noteVideoFileInput) {
    noteVideoFileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      noteModalVideo = URL.createObjectURL(file);
      noteModalVoice = null;
      if (noteVideoPreview) {
        noteVideoPreview.srcObject = null;
        noteVideoPreview.src = noteModalVideo;
        noteVideoPreview.style.display = "block";
        noteVideoPreview.controls = true;
      }
      updateNoteAttachmentStatus();
      noteVideoFileInput.value = "";
    });
  }

  // Voice Section toggles and recording
  const openVoiceRecorderBtn = document.getElementById("openVoiceRecorderBtn");
  const noteVoicePanel = document.getElementById("noteVoicePanel");
  const closeVoicePanelBtn = document.getElementById("closeVoicePanelBtn");
  const startNoteVoiceRecBtn = document.getElementById("startNoteVoiceRecBtn");
  const stopNoteVoiceRecBtn = document.getElementById("stopNoteVoiceRecBtn");
  const noteVoiceFileInput = document.getElementById("noteVoiceFileInput");
  const noteVoicePreview = document.getElementById("noteVoicePreview");
  const noteVoiceRecIndicator = document.getElementById("noteVoiceRecIndicator");

  if (openVoiceRecorderBtn) {
    openVoiceRecorderBtn.addEventListener("click", () => {
      if (noteModalVideo) {
        if (!confirm("You already have a video attached. Attaching a voice note will replace your video. Proceed?")) return;
        noteModalVideo = null;
      }
      if (noteVoicePanel) noteVoicePanel.style.display = "block";
      updateNoteAttachmentStatus();
    });
  }

  if (closeVoicePanelBtn) {
    closeVoicePanelBtn.addEventListener("click", () => {
      stopNoteVoiceCapture();
      if (noteVoicePanel) noteVoicePanel.style.display = "none";
    });
  }

  if (startNoteVoiceRecBtn) {
    startNoteVoiceRecBtn.addEventListener("click", async () => {
      try {
        noteModalVoiceStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        noteModalVoiceChunks = [];
        noteModalVoiceRecorder = new MediaRecorder(noteModalVoiceStream);
        noteModalVoiceRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) noteModalVoiceChunks.push(e.data);
        };
        noteModalVoiceRecorder.onstop = () => {
          const blob = new Blob(noteModalVoiceChunks, { type: "audio/webm" });
          noteModalVoice = URL.createObjectURL(blob);
          noteModalVideo = null; // Mutually exclusive
          if (noteVoicePreview) {
            noteVoicePreview.src = noteModalVoice;
            noteVoicePreview.style.display = "block";
          }
          stopNoteVoiceCapture();
          updateNoteAttachmentStatus();
        };

        noteModalVoiceRecorder.start();
        if (startNoteVoiceRecBtn) startNoteVoiceRecBtn.style.display = "none";
        if (stopNoteVoiceRecBtn) stopNoteVoiceRecBtn.style.display = "inline-flex";
        if (noteVoiceRecIndicator) noteVoiceRecIndicator.style.display = "inline-flex";
      } catch (err) {
        alert("Microphone permission is required to record a voice note.");
      }
    });
  }

  if (stopNoteVoiceRecBtn) {
    stopNoteVoiceRecBtn.addEventListener("click", () => {
      if (noteModalVoiceRecorder && noteModalVoiceRecorder.state !== "inactive") {
        noteModalVoiceRecorder.stop();
      }
      if (stopNoteVoiceRecBtn) stopNoteVoiceRecBtn.style.display = "none";
      if (startNoteVoiceRecBtn) startNoteVoiceRecBtn.style.display = "inline-flex";
      if (noteVoiceRecIndicator) noteVoiceRecIndicator.style.display = "none";
    });
  }

  if (noteVoiceFileInput) {
    noteVoiceFileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      noteModalVoice = URL.createObjectURL(file);
      noteModalVideo = null;
      if (noteVoicePreview) {
        noteVoicePreview.src = noteModalVoice;
        noteVoicePreview.style.display = "block";
      }
      updateNoteAttachmentStatus();
      noteVoiceFileInput.value = "";
    });
  }

  // Unified Form Submit (Enforces: author, message, combinations)
  const loveNoteSubmissionForm = document.getElementById("loveNoteSubmissionForm");
  if (loveNoteSubmissionForm) {
    loveNoteSubmissionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const authorInput = document.getElementById("wishAuthorName");
      const roleInput = document.getElementById("wishAuthorRole");
      const messageInput = document.getElementById("wishMessageText");

      const author = authorInput ? authorInput.value.trim() : "A Loving Friend";
      const role = (roleInput && roleInput.value.trim()) || "Loved One 💕";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!author || !message) {
        alert("Please provide your name and a heartfelt message!");
        return;
      }

      const initials = author.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "💌";

      let noteType = "text";
      if (noteModalVideo) noteType = "video";
      else if (noteModalVoice) noteType = "audio";
      else if (noteModalPhotos.length > 0) noteType = "photos";

      const newNote = {
        id: "wish-" + Date.now(),
        author: author,
        role: role,
        avatar: initials,
        message: message,
        sticker: noteModalSticker,
        photos: [...noteModalPhotos],
        videoUrl: noteModalVideo,
        audioUrl: noteModalVoice,
        date: "Just now",
        likes: 1,
        likedByUser: true,
        type: noteType
      };

      guestbookMessages.unshift(newNote);
      saveGuestbookMessages();

      // Reset form and attachments
      loveNoteSubmissionForm.reset();
      resetNoteModalAttachments();
      closeSignGuestbook();

      // Re-render both views
      renderLoveNotes();
      renderGuestbookGallery(currentGuestbookFilter);

      // Celebration burst
      startConfettiAnimation();
    });
  }

  // Initial status check
  updateNoteAttachmentStatus();
}

function stopNoteVideoCapture() {
  if (noteModalVideoStream) {
    noteModalVideoStream.getTracks().forEach(t => t.stop());
    noteModalVideoStream = null;
  }
}

function stopNoteVoiceCapture() {
  if (noteModalVoiceStream) {
    noteModalVoiceStream.getTracks().forEach(t => t.stop());
    noteModalVoiceStream = null;
  }
}

function resetNoteModalAttachments() {
  noteModalPhotos = [];
  noteModalVideo = null;
  noteModalVoice = null;
  stopNoteVideoCapture();
  stopNoteVoiceCapture();

  const noteVideoPanel = document.getElementById("noteVideoPanel");
  const noteVoicePanel = document.getElementById("noteVoicePanel");
  const noteVideoPreview = document.getElementById("noteVideoPreview");
  const noteVoicePreview = document.getElementById("noteVoicePreview");

  if (noteVideoPanel) noteVideoPanel.style.display = "none";
  if (noteVoicePanel) noteVoicePanel.style.display = "none";
  if (noteVideoPreview) {
    noteVideoPreview.srcObject = null;
    noteVideoPreview.src = "";
    noteVideoPreview.style.display = "none";
  }
  if (noteVoicePreview) {
    noteVoicePreview.src = "";
    noteVoicePreview.style.display = "none";
  }

  updateNoteAttachmentStatus();
}

// Enforces exact combinations:
// 1. Up to 3 photos (0 video, 0 voice)
// 2. Up to 2 photos + 1 short video (0 voice)
// 3. Up to 2 photos + 1 short voice (0 video)
function updateNoteAttachmentStatus() {
  const statusPhotosTag = document.getElementById("statusPhotosTag");
  const statusVideoTag = document.getElementById("statusVideoTag");
  const statusVoiceTag = document.getElementById("statusVoiceTag");
  const previewsContainer = document.getElementById("noteAttachedPreviews");
  const addPhotosLabel = document.getElementById("addPhotosLabel");

  const hasVideoOrVoice = Boolean(noteModalVideo || noteModalVoice);
  const maxPhotos = hasVideoOrVoice ? 2 : 3;

  // Trim photos if currently exceeds limit
  if (noteModalPhotos.length > maxPhotos) {
    noteModalPhotos = noteModalPhotos.slice(0, maxPhotos);
  }

  if (statusPhotosTag) {
    statusPhotosTag.textContent = `📸 Photos: ${noteModalPhotos.length}/${maxPhotos}`;
    statusPhotosTag.classList.toggle("active-attached", noteModalPhotos.length > 0);
  }

  if (statusVideoTag) {
    statusVideoTag.textContent = noteModalVideo ? "🎥 Video: 1 attached ✓" : "🎥 Video: None";
    statusVideoTag.classList.toggle("active-attached", Boolean(noteModalVideo));
  }

  if (statusVoiceTag) {
    statusVoiceTag.textContent = noteModalVoice ? "🎙️ Voice: 1 attached ✓" : "🎙️ Voice: None";
    statusVoiceTag.classList.toggle("active-attached", Boolean(noteModalVoice));
  }

  if (addPhotosLabel) {
    if (noteModalPhotos.length >= maxPhotos) {
      addPhotosLabel.style.opacity = "0.45";
      addPhotosLabel.style.pointerEvents = "none";
    } else {
      addPhotosLabel.style.opacity = "1";
      addPhotosLabel.style.pointerEvents = "auto";
    }
  }

  // Render previews with removal buttons
  if (previewsContainer) {
    previewsContainer.innerHTML = "";

    // Photos previews
    noteModalPhotos.forEach((src, idx) => {
      const chip = document.createElement("div");
      chip.className = "note-preview-chip";
      chip.innerHTML = `
        <img src="${src}" alt="Attached preview ${idx + 1}" />
        <span>Photo ${idx + 1}</span>
        <button type="button" class="remove-chip-btn" data-photo-idx="${idx}">&times;</button>
      `;
      chip.querySelector(".remove-chip-btn").addEventListener("click", () => {
        noteModalPhotos.splice(idx, 1);
        updateNoteAttachmentStatus();
      });
      previewsContainer.appendChild(chip);
    });

    // Video preview chip
    if (noteModalVideo) {
      const chip = document.createElement("div");
      chip.className = "note-preview-chip";
      chip.innerHTML = `
        <span>🎥 Video Attached</span>
        <button type="button" class="remove-chip-btn" id="removeVideoChipBtn">&times;</button>
      `;
      chip.querySelector("#removeVideoChipBtn").addEventListener("click", () => {
        noteModalVideo = null;
        const noteVideoPreview = document.getElementById("noteVideoPreview");
        if (noteVideoPreview) noteVideoPreview.src = "";
        updateNoteAttachmentStatus();
      });
      previewsContainer.appendChild(chip);
    }

    // Voice preview chip
    if (noteModalVoice) {
      const chip = document.createElement("div");
      chip.className = "note-preview-chip";
      chip.innerHTML = `
        <span>🎙️ Voice Note Attached</span>
        <button type="button" class="remove-chip-btn" id="removeVoiceChipBtn">&times;</button>
      `;
      chip.querySelector("#removeVoiceChipBtn").addEventListener("click", () => {
        noteModalVoice = null;
        const noteVoicePreview = document.getElementById("noteVoicePreview");
        if (noteVoicePreview) noteVoicePreview.src = "";
        updateNoteAttachmentStatus();
      });
      previewsContainer.appendChild(chip);
    }
  }
}

// Admin Love Notes Tab Management
function setupAdminLoveNotes() {
  const resetBtn = document.getElementById("adminResetNotesBtn") || document.getElementById("adminResetLoveNotesBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset love notes and wishes to the default messages?")) {
        guestbookMessages = [...defaultGuestbookMessages];
        saveGuestbookMessages();
        renderLoveNotes();
        renderGuestbookGallery(currentGuestbookFilter);
        renderAdminLoveNotesList();
      }
    });
  }

  const refreshBtn = document.getElementById("adminRefreshNotesBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      renderLoveNotes();
      renderGuestbookGallery(currentGuestbookFilter);
      renderAdminLoveNotesList();
    });
  }
}

function renderAdminLoveNotesList() {
  const container = document.getElementById("adminLoveNotesList");
  if (!container) return;

  container.innerHTML = "";

  if (guestbookMessages.length === 0) {
    container.innerHTML = `<p style="color: var(--color-text-secondary); font-size: 0.85rem; padding: 0.8rem;">No love notes currently registered.</p>`;
    return;
  }

  guestbookMessages.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "admin-note-item-row";

    let mediaBadge = "";
    if (item.videoUrl) mediaBadge += `<span class="note-media-badge">🎥 Video</span>`;
    if (item.audioUrl) mediaBadge += `<span class="note-media-badge">🎙️ Voice</span>`;
    if (item.photos && item.photos.length > 0) mediaBadge += `<span class="note-media-badge">📸 ${item.photos.length} Photo(s)</span>`;

    row.innerHTML = `
      <div class="note-item-main">
        <div class="note-item-header">
          <strong>${escapeHtml(item.author)}</strong>
          <span>${escapeHtml(item.sticker || '💖')}</span>
          <span style="font-size: 0.75rem; color: var(--color-text-secondary);">${escapeHtml(item.role || '')}</span>
          ${mediaBadge}
        </div>
        <div class="note-item-snippet">"${escapeHtml((item.message || '').slice(0, 75))}${(item.message || '').length > 75 ? '...' : ''}"</div>
      </div>
      <div class="note-item-actions">
        <button type="button" class="admin-danger-btn delete-note-btn" data-index="${index}">🗑️ Delete</button>
      </div>
    `;

    row.querySelector(".delete-note-btn").addEventListener("click", () => {
      if (confirm(`Delete love note from ${item.author}?`)) {
        guestbookMessages.splice(index, 1);
        saveGuestbookMessages();
        renderLoveNotes();
        renderGuestbookGallery(currentGuestbookFilter);
        renderAdminLoveNotesList();
      }
    });

    container.appendChild(row);
  });
}

function setupGuestbookModal() {
  // Legacy alias, full functionality handled in setupLoveNotesModal
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================================
// AMBIENT PARTICLES (Stars, Floating Hearts & Glowing Dots)
// ============================================================================
let particles = [];
let particlesAnimationId = null;

function initParticlesCanvas() {
  const canvas = document.getElementById("particlesCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Create subtle particles
  const count = Math.min(Math.floor(window.innerWidth / 18), 50);
  particles = [];

  const types = ["star", "heart", "circle"];
  const colors = ["#ff75a6", "#38bdf8", "#ffffff", "#ffd5e5", "#bfe9ff"];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3.5 + 1.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.7 + 0.3,
      fadeSpeed: Math.random() * 0.015 + 0.005,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: types[Math.floor(Math.random() * types.length)],
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.02
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.angularSpeed;

      // Wrap around
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;

      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      if (p.type === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "star") {
        drawStar(ctx, 0, 0, 4, p.size * 1.8, p.size * 0.8);
      } else if (p.type === "heart") {
        drawHeart(ctx, 0, 0, p.size * 1.4);
      }

      ctx.restore();
    }

    particlesAnimationId = requestAnimationFrame(renderParticles);
  }

  renderParticles();
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
}

function drawHeart(ctx, x, y, size) {
  ctx.beginPath();
  const topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  // top left curve
  ctx.bezierCurveTo(
    x, y, 
    x - size / 2, y, 
    x - size / 2, y + topCurveHeight
  );
  // bottom left curve
  ctx.bezierCurveTo(
    x - size / 2, y + (size + topCurveHeight) / 2, 
    x, y + (size + topCurveHeight) / 2, 
    x, y + size
  );
  // bottom right curve
  ctx.bezierCurveTo(
    x, y + (size + topCurveHeight) / 2, 
    x + size / 2, y + (size + topCurveHeight) / 2, 
    x + size / 2, y + topCurveHeight
  );
  // top right curve
  ctx.bezierCurveTo(
    x + size / 2, y, 
    x, y, 
    x, y + topCurveHeight
  );
  ctx.closePath();
  ctx.fill();
}

// ============================================================================
// CELEBRATION CONFETTI ENGINE (Pink, Light Pink, Blue, Light Blue, Purple, White)
// ============================================================================
let confettiPieces = [];
let confettiAnimationId = null;

function initConfettiCanvas() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;

  function resizeConfetti() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeConfetti();
  window.addEventListener("resize", resizeConfetti);
}

function startConfettiAnimation() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Confetti Color Palette specified in user requirements
  const colors = [
    "#ff2a7a", // Pink
    "#ff75a6", // Light pink
    "#00d2ff", // Blue
    "#38bdf8", // Light blue / Sky blue
    "#8b5cf6", // Purple
    "#ffffff"  // White
  ];

  confettiPieces = [];
  
  // Dynamic piece count with reduced density for crystal-clear readability
  let countFactor = 1.0;
  if (burstConfig.confettiAmount === "low") countFactor = 0.55;
  if (burstConfig.confettiAmount === "high") countFactor = 1.6;

  // Base count reduced so words are never overwhelmed
  const baseCount = window.innerWidth < 640 ? 36 : 56;
  const pieceCount = Math.round(baseCount * countFactor);

  // Dynamic speed based on burstConfig setting
  let speedMultiplier = 1.0;
  if (burstConfig.confettiSpeed === "slow") speedMultiplier = 0.55;
  if (burstConfig.confettiSpeed === "fast") speedMultiplier = 1.4;

  function spawnPiece(initialY = null) {
    const isFlank = Math.random() < 0.82; // 82% of confetti flows along the left and right flanks
    let x, alpha, w, h;

    if (isFlank) {
      // Position on left 26% or right 26% of viewport
      x = Math.random() < 0.5
        ? Math.random() * (canvas.width * 0.26)
        : canvas.width * 0.74 + Math.random() * (canvas.width * 0.26);
      alpha = Math.random() * 0.3 + 0.65;
      w = Math.random() * 6 + 6;
      h = Math.random() * 4 + 4;
    } else {
      // In the central area where words are, keep confetti minimal, faint, and small
      x = canvas.width * 0.26 + Math.random() * (canvas.width * 0.48);
      alpha = Math.random() * 0.15 + 0.20; // Very soft and translucent so words stand out
      w = Math.random() * 3 + 4;
      h = Math.random() * 2 + 3;
    }

    const y = initialY !== null ? initialY : Math.random() * -canvas.height * 0.8;

    return {
      x,
      y,
      w,
      h,
      alpha,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: (Math.random() * 3.2 + 1.8) * speedMultiplier,
      speedX: (Math.random() * 2 - 1) * speedMultiplier,
      angle: Math.random() * 360,
      angularSpeed: (Math.random() - 0.5) * 6 * speedMultiplier,
      flutterSpeed: Math.random() * 0.08 + 0.04,
      flutterPhase: Math.random() * Math.PI * 2
    };
  }

  for (let i = 0; i < pieceCount; i++) {
    confettiPieces.push(spawnPiece(Math.random() * canvas.height));
  }

  function renderConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of confettiPieces) {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.flutterPhase) * 1.2;
      p.flutterPhase += p.flutterSpeed;
      p.angle += p.angularSpeed;

      // Wrap to top: re-spawn predominantly at the sides
      if (p.y > canvas.height + 25) {
        const fresh = spawnPiece(-20);
        Object.assign(p, fresh);
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.fillStyle = p.color;
      if (p.alpha > 0.4) {
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
      }
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    confettiAnimationId = requestAnimationFrame(renderConfetti);
  }

  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  renderConfetti();
}

// ============================================================================
// MULTI-PAGE CHAPTER SYSTEM (Chapter 1, Chapter 2, Chapter 3, Chapter 4 Finale)
// ============================================================================

let currentActiveChapter = 1;

function initChapterSystem() {
  if (chapterBtn1) chapterBtn1.addEventListener("click", () => showChapter(1));
  if (chapterBtn2) chapterBtn2.addEventListener("click", () => showChapter(2));
  if (chapterBtn3) chapterBtn3.addEventListener("click", () => showChapter(3));
  if (chapterBtn4) chapterBtn4.addEventListener("click", () => showChapter(4));

  // Automatically bind any button with data-page attribute for seamless in-page SPA navigation
  document.querySelectorAll("[data-page]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const p = parseInt(btn.getAttribute("data-page"), 10);
      if (p) showChapter(p);
    });
  });

  // Turn to Next / Previous Chapter buttons (connecting both page continue banners & headers)
  if (goToPage2Btn) {
    goToPage2Btn.addEventListener("click", () => showChapter(2));
  }
  if (goToPage3Btn) {
    goToPage3Btn.addEventListener("click", () => showChapter(3));
  }
  if (goToFinaleBtn) {
    goToFinaleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showChapter(4);
    });
  }
  if (backToPage1Btn) {
    backToPage1Btn.addEventListener("click", () => showChapter(1));
  }
  if (backToPage2Btn) {
    backToPage2Btn.addEventListener("click", () => showChapter(2));
  }
  if (backToPage1From3Btn) {
    backToPage1From3Btn.addEventListener("click", () => showChapter(1));
  }
  if (backToPage3FromFinaleBtn) {
    backToPage3FromFinaleBtn.addEventListener("click", () => showChapter(3));
  }
  if (openSignLoveNoteFromChapterBtn) {
    openSignLoveNoteFromChapterBtn.addEventListener("click", () => openSignGuestbook());
  }

  // Replay Experience & auxiliary Finale buttons
  if (replayExperienceBtn) {
    replayExperienceBtn.addEventListener("click", () => {
      // Return to chapter 1 and trigger celebration joyously
      showChapter(1);
      setTimeout(() => {
        const celebrationSection = document.getElementById("celebrationScreen");
        if (celebrationSection) {
          celebrationSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        triggerCelebration();
      }, 350);
    });
  }

  if (finaleBackToMemoriesBtn) {
    finaleBackToMemoriesBtn.addEventListener("click", () => showChapter(2));
  }
  if (finaleBackToNotesBtn) {
    finaleBackToNotesBtn.addEventListener("click", () => showChapter(3));
  }
}

function showChapter(chapterNum, autoScroll = true) {
  currentActiveChapter = chapterNum;

  const page1 = document.getElementById("pageChapter1");
  const page2 = document.getElementById("pageChapter2");
  const page3 = document.getElementById("pageChapter3");
  const page4 = document.getElementById("pageChapter4");

  const btn1 = document.getElementById("chapterBtn1") || document.getElementById("navChapterBtn1");
  const btn2 = document.getElementById("chapterBtn2") || document.getElementById("navChapterBtn2");
  const btn3 = document.getElementById("chapterBtn3") || document.getElementById("navChapterBtn3");
  const btn4 = document.getElementById("chapterBtn4") || document.getElementById("navChapterBtn4");

  if (page1) {
    page1.style.display = (chapterNum === 1) ? "block" : "none";
    page1.classList.toggle("active", chapterNum === 1);
  }
  if (page2) {
    page2.style.display = (chapterNum === 2) ? "block" : "none";
    page2.classList.toggle("active", chapterNum === 2);
  }
  if (page3) {
    page3.style.display = (chapterNum === 3) ? "block" : "none";
    page3.classList.toggle("active", chapterNum === 3);
  }
  if (page4) {
    page4.style.display = (chapterNum === 4) ? "flex" : "none";
    page4.classList.toggle("active", chapterNum === 4);
  }

  if (btn1) btn1.classList.toggle("active", chapterNum === 1);
  if (btn2) btn2.classList.toggle("active", chapterNum === 2);
  if (btn3) btn3.classList.toggle("active", chapterNum === 3);
  if (btn4) btn4.classList.toggle("active", chapterNum === 4);

  if (chapterNum !== 4 && typeof disposeFinaleThreeScene === "function") {
    disposeFinaleThreeScene();
  }

  if (chapterNum === 2) {
    renderMemoriesScrapbook();
    setTimeout(() => {
      initHighlightedMemoriesObserver();
    }, 200);
  } else if (chapterNum === 3) {
    renderLoveNotes();
  } else if (chapterNum === 4) {
    // Initialize Extra section: 3D particle heart & envelope sequence directly within main page container
    requestAnimationFrame(() => {
      initFinaleScene();
      if (typeof window.initOurStoryEnvelope === "function") {
        window.initOurStoryEnvelope();
      }
      if (typeof window.resetOurStoryEnvelope === "function") {
        window.resetOurStoryEnvelope();
      }
    });
  }

  // Smooth scroll without interfering with normal user scrolling
  if (autoScroll) {
    let targetEl = null;
    if (chapterNum === 1) targetEl = document.getElementById("celebrationScreen");
    else if (chapterNum === 2) targetEl = page2;
    else if (chapterNum === 3) targetEl = page3;
    else if (chapterNum === 4) targetEl = page4;

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

// ============================================================================
// CHAPTER 2 — SCRAPBOOK MEMORIES & 3D SPOTLIGHT ENGINE
// ============================================================================

const MEMORIES_STORAGE_KEY = "birthday_scrapbook_memories_v2";
let activeMemories = [];

let activeSpotlightElement = null;
let isSpotlightLocked = false;
let memoriesObserver = null;

function updateMemoriesCounter() {
  const panelMemoriesCount = document.getElementById("panelMemoriesCount");
  if (panelMemoriesCount) {
    panelMemoriesCount.textContent = String(activeMemories ? activeMemories.length : 0);
  }
}

function initScrapbookMemories() {
  try {
    const saved = localStorage.getItem(MEMORIES_STORAGE_KEY);
    if (saved) {
      activeMemories = JSON.parse(saved);
    } else {
      activeMemories = [...defaultMemories];
      saveActiveMemories();
    }
  } catch {
    activeMemories = [...defaultMemories];
  }

  renderMemoriesScrapbook();
  renderMemories(); // Legacy grid support
  setupAdminMemories();
  initHighlightedMemoriesObserver();
  updateMemoriesCounter();
}

function saveActiveMemories() {
  try {
    localStorage.setItem(MEMORIES_STORAGE_KEY, JSON.stringify(activeMemories));
  } catch (err) {
    console.warn("Could not persist scrapbook memories to localStorage:", err);
  }

  // Persist to Supabase birthday_content.memories
  if (!isInitialSupabaseLoading && isCurrentUserAdmin()) {
    saveAllBirthdayContentToSupabase({ memories: activeMemories });
  }
}

function renderMemoriesScrapbook() {
  const scrapbook = document.getElementById("memoriesScrapbookContainer") || document.getElementById("memoriesScrapbook");
  if (!scrapbook) return;

  scrapbook.innerHTML = "";

  activeMemories.forEach((item, index) => {
    const card = document.createElement("div");
    const styleClass = item.style ? `style-${item.style}` : "style-tape";
    const sizeClass = item.size ? `size-${item.size}` : "size-normal";
    const tiltClass = item.tilt ? `tilt-${item.tilt}` : (index % 2 === 0 ? "tilt-left" : "tilt-right");
    const highlightClass = item.isHighlight ? "is-highlight-memory" : "";

    card.className = `memory-card ${styleClass} ${sizeClass} ${tiltClass} ${highlightClass}`.trim();
    card.id = `memCard_${item.id || index}`;
    card.setAttribute("data-index", String(index));
    card.setAttribute("draggable", "true");
    if (item.isHighlight) {
      card.setAttribute("data-is-highlight", "true");
    }

    // Title is strictly OPTIONAL — only rendered if title text exists!
    const hasTitle = Boolean(item.title && item.title.trim().length > 0);
    const titleHtml = hasTitle ? `<h4 class="memory-card-title">${escapeHtml(item.title.trim())}</h4>` : "";
    const dateHtml = item.date ? `<span class="memory-card-date">${escapeHtml(item.date)}</span>` : "";
    const captionHtml = item.caption ? `<p class="memory-card-caption">${escapeHtml(item.caption)}</p>` : "";
    const highlightBadge = item.isHighlight ? `<span class="memory-highlight-badge">⭐ Highlight</span>` : "";

    let mediaHtml = "";
    if (item.type === "video") {
      mediaHtml = `
        <div class="memory-video-wrap memory-media-wrap">
          <video class="memory-video" src="${item.mediaUrl}" controls playsinline preload="metadata"></video>
        </div>
      `;
    } else {
      const src = item.mediaUrl || item.image;
      mediaHtml = `
        <div class="memory-img-wrap memory-media-wrap">
          <img src="${src}" class="memory-img" alt="${escapeHtml(item.title || 'Scrapbook photo')}" loading="lazy" />
          <div class="memory-click-hint"><span>🔍 Full View</span></div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="memory-drag-handle" title="Drag to rearrange photos in scrapbook">
        <span class="drag-icon">⋮⋮</span>
        <span class="drag-label">Drag</span>
      </div>
      ${highlightBadge}
      ${mediaHtml}
      <div class="memory-content-box">
        ${titleHtml}
        ${captionHtml}
        ${dateHtml}
      </div>
    `;

    // 1. Drag & Drop Reordering (Desktop HTML5 Drag API)
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", String(index));
      e.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    });

    card.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      card.classList.add("drag-over");
    });

    card.addEventListener("dragleave", () => {
      card.classList.remove("drag-over");
    });

    card.addEventListener("drop", (e) => {
      e.preventDefault();
      card.classList.remove("drag-over");
      const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
      const toIndex = index;
      if (!isNaN(fromIndex) && fromIndex !== toIndex) {
        const [moved] = activeMemories.splice(fromIndex, 1);
        activeMemories.splice(toIndex, 0, moved);
        saveActiveMemories();
        renderMemoriesScrapbook();
      }
    });

    card.addEventListener("dragend", () => {
      document.querySelectorAll(".memory-card").forEach((c) => {
        c.classList.remove("is-dragging", "drag-over");
      });
    });

    // 2. Touch Drag & Reorder Support for Mobile/Tablet users
    const dragHandle = card.querySelector(".memory-drag-handle");
    if (dragHandle) {
      let isTouching = false;
      let currentHoveredCard = null;

      dragHandle.addEventListener("touchstart", (e) => {
        if (e.touches.length !== 1) return;
        isTouching = true;
        card.classList.add("is-dragging");
      }, { passive: true });

      dragHandle.addEventListener("touchmove", (e) => {
        if (!isTouching || e.touches.length !== 1) return;
        const touch = e.touches[0];
        const el = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetCard = el ? el.closest(".memory-card") : null;
        if (currentHoveredCard && currentHoveredCard !== targetCard) {
          currentHoveredCard.classList.remove("drag-over");
        }
        if (targetCard && targetCard !== card) {
          targetCard.classList.add("drag-over");
          currentHoveredCard = targetCard;
        }
      }, { passive: true });

      dragHandle.addEventListener("touchend", () => {
        if (!isTouching) return;
        isTouching = false;
        card.classList.remove("is-dragging");
        if (currentHoveredCard) {
          currentHoveredCard.classList.remove("drag-over");
          const toIndex = parseInt(currentHoveredCard.getAttribute("data-index"), 10);
          if (!isNaN(toIndex) && toIndex !== index) {
            const [moved] = activeMemories.splice(index, 1);
            activeMemories.splice(toIndex, 0, moved);
            saveActiveMemories();
            renderMemoriesScrapbook();
          }
          currentHoveredCard = null;
        }
      });
    }

    // 3. Pop Up Mode: Picture pops up in full with NO frame holding it & written words below
    card.addEventListener("click", (e) => {
      // Ignore clicks on drag handle, video controls, or buttons
      if (
        e.target.closest(".memory-drag-handle") ||
        e.target.closest("video") ||
        e.target.closest("button")
      ) {
        return;
      }
      if (item.type !== "video") {
        openLightbox(item);
      }
    });

    scrapbook.appendChild(card);
  });
}

// 3D Spotlight Scroll Effect:
// - Highlighted memories activate INDIVIDUALLY and SEQUENTIALLY based on scrolling.
// - NEVER shows multiple highlighted memories floating forward simultaneously.
// - Grows slightly larger, floats forward in 3D, subtle glow, surrounding memories dim.
// - Stays active for ~3 seconds before smoothly returning to normal.
// - Does not interfere with normal scrolling.
function initHighlightedMemoriesObserver() {
  if (memoriesObserver) {
    memoriesObserver.disconnect();
    memoriesObserver = null;
  }

  const highlightCards = document.querySelectorAll('.memories-scrapbook .memory-card[data-is-highlight="true"], #memoriesScrapbook .memory-card[data-is-highlight="true"], #memoriesScrapbookContainer .memory-card[data-is-highlight="true"]');
  if (!highlightCards || highlightCards.length === 0) return;

  if ('IntersectionObserver' in window) {
    memoriesObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !isSpotlightLocked && !activeSpotlightElement) {
          triggerSequentialSpotlight(entry.target);
          break; // Strictly one card at a time
        }
      }
    }, {
      root: null,
      rootMargin: "-15% 0px -15% 0px", // triggers when entering central viewport zone
      threshold: 0.35
    });

    highlightCards.forEach(card => memoriesObserver.observe(card));
  }
}

function triggerSequentialSpotlight(cardEl) {
  if (isSpotlightLocked || activeSpotlightElement) return;
  if (cardEl.dataset.recentlySpotlighted === "true") return;

  isSpotlightLocked = true;
  activeSpotlightElement = cardEl;
  cardEl.dataset.recentlySpotlighted = "true";

  const scrapbook = document.getElementById("memoriesScrapbookContainer") || document.getElementById("memoriesScrapbook");
  if (scrapbook) scrapbook.classList.add("has-active-spotlight");
  cardEl.classList.add("is-spotlight-active");

  // Stays active for ~3 seconds before smoothly returning to normal
  setTimeout(() => {
    cardEl.classList.remove("is-spotlight-active");
    if (scrapbook) scrapbook.classList.remove("has-active-spotlight");
    activeSpotlightElement = null;

    // Cooldown of 800ms before another highlighted memory can activate
    setTimeout(() => {
      isSpotlightLocked = false;
    }, 800);

    // Reset cooldown for this specific memory after 15 seconds
    setTimeout(() => {
      delete cardEl.dataset.recentlySpotlighted;
    }, 15000);
  }, 3000);
}

// Legacy Polaroid Reel Support
function renderMemories() {
  const container = document.getElementById("memoriesGrid");
  if (!container) return;

  container.innerHTML = "";
  activeMemories.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "polaroid-card";
    const src = item.mediaUrl || item.image;
    card.innerHTML = `
      <div class="polaroid-img-wrap">
        <img src="${src}" alt="${escapeHtml(item.title || 'Memory')}" loading="lazy" />
      </div>
      <div class="polaroid-caption">${escapeHtml(item.caption || '')}</div>
      <div class="polaroid-date">${escapeHtml(item.date || '')}</div>
    `;
    card.addEventListener("click", () => openLightbox(item));
    container.appendChild(card);
  });
}

/**
 * Compresses and resizes large phone photos (max width 1600px, JPEG quality 0.8).
 * Returns both a compressed File object suitable for Supabase Storage upload,
 * and an optimized base64 DataURL fallback for local offline storage.
 */
function compressImageFile(file, maxWidth = 1600, quality = 0.8) {
  return new Promise((resolve) => {
    if (!file || !file.type || !file.type.startsWith("image/")) {
      return resolve({ file, dataUrl: null });
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        if (w > maxWidth || h > maxWidth) {
          if (w >= h) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxWidth) / h);
            h = maxWidth;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);

        const dataUrl = canvas.toDataURL("image/jpeg", quality);

        if (canvas.toBlob) {
          canvas.toBlob((blob) => {
            if (!blob) {
              return resolve({ file, dataUrl });
            }
            const cleanBase = (file.name || "memory").replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
            const compressedFile = new File([blob], `${cleanBase}.jpg`, {
              type: "image/jpeg",
              lastModified: Date.now()
            });
            resolve({ file: compressedFile, dataUrl });
          }, "image/jpeg", quality);
        } else {
          resolve({ file, dataUrl });
        }
      };
      img.onerror = () => resolve({ file, dataUrl: e.target?.result || null });
      img.src = e.target.result;
    };
    reader.onerror = () => resolve({ file, dataUrl: null });
    reader.readAsDataURL(file);
  });
}

/**
 * Handles multiple photo selection for Scrapbook Memories.
 * Compresses large photos (max width ~1600px, JPEG quality ~0.8),
 * uploads to Supabase Storage, and adds each as a memory entry.
 */
async function handleMemoryPhotoFiles(files) {
  if (!isCurrentUserAdmin()) {
    openAdminLoginForm("🔒 Admin sign-in required to upload photo memories.");
    return;
  }

  const validFiles = Array.from(files).filter(f => f.type && f.type.startsWith("image/"));
  if (validFiles.length === 0) return;

  showStorageStatus(
    "adminMemoriesUploadStatus",
    `Optimizing & uploading ${validFiles.length} photo memor${validFiles.length > 1 ? "ies" : "y"}...`,
    "loading",
    0
  );

  let successCount = 0;
  let rlsNotice = false;

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i];
    showStorageStatus(
      "adminMemoriesUploadStatus",
      `Optimizing & uploading photo ${i + 1} of ${validFiles.length}...`,
      "loading",
      0
    );

    try {
      // 1. Compress / resize large phone photos (max 1600px, JPEG quality 0.8)
      const { file: fileToUpload, dataUrl } = await compressImageFile(file, 1600, 0.8);

      // 2. Upload to Supabase Storage bucket 'Birthday-assets' under memories/
      const uploadRes = await uploadToSupabaseStorage("memories", fileToUpload || file);

      let mediaUrl = "";
      if (uploadRes && uploadRes.success) {
        mediaUrl = uploadRes.publicUrl;
        successCount++;
      } else {
        if (uploadRes?.error && uploadRes.error.toLowerCase().includes("row-level security")) {
          rlsNotice = true;
        }
        mediaUrl = dataUrl || (await readFileAsOptimizedDataURL(file));
      }

      // 3. New memory entry with default title "A Special Memory" and spotlight off
      const newMem = {
        id: "mem-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        type: "photo",
        title: "A Special Memory",
        caption: "",
        date: "Special Day",
        image: mediaUrl,
        mediaUrl: mediaUrl,
        isHighlight: false,
        style: "tape",
        tilt: "slight",
        size: "normal"
      };

      activeMemories.push(newMem);
    } catch (err) {
      console.error("Failed processing memory photo file:", err);
    }
  }

  saveActiveMemories();
  renderMemoriesScrapbook();
  renderMemories();
  renderAdminMemoriesList();
  initHighlightedMemoriesObserver();
  updateMemoriesCounter();

  if (successCount > 0) {
    showStorageStatus(
      "adminMemoriesUploadStatus",
      `Saved ${successCount} photo memor${successCount > 1 ? "ies" : "y"} to Supabase Storage ❤️`,
      "success",
      5000
    );
  } else if (rlsNotice) {
    showStorageStatus(
      "adminMemoriesUploadStatus",
      "Saved locally! (Note: Enable INSERT policy on bucket 'Birthday-assets' for online storage)",
      "error",
      7500
    );
  } else {
    showStorageStatus(
      "adminMemoriesUploadStatus",
      `Saved ${validFiles.length} photo memor${validFiles.length > 1 ? "ies" : "y"} locally ❤️`,
      "success",
      4000
    );
  }
}

/**
 * Handles short video upload for Scrapbook Memories.
 * Uploads to Supabase Storage and creates memory entries.
 */
async function handleMemoryVideoFiles(files) {
  if (!isCurrentUserAdmin()) {
    openAdminLoginForm("🔒 Admin sign-in required to upload video memories.");
    return;
  }

  const validFiles = Array.from(files).filter(f => f.type && f.type.startsWith("video/"));
  if (validFiles.length === 0) return;

  showStorageStatus(
    "adminMemoriesUploadStatus",
    `Uploading ${validFiles.length} video memor${validFiles.length > 1 ? "ies" : "y"} to Supabase Storage...`,
    "loading",
    0
  );

  let successCount = 0;
  let rlsNotice = false;

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i];
    showStorageStatus(
      "adminMemoriesUploadStatus",
      `Uploading video ${i + 1} of ${validFiles.length}...`,
      "loading",
      0
    );

    try {
      const uploadRes = await uploadToSupabaseStorage("memories/videos", file);

      let mediaUrl = "";
      if (uploadRes && uploadRes.success) {
        mediaUrl = uploadRes.publicUrl;
        successCount++;
      } else {
        if (uploadRes?.error && uploadRes.error.toLowerCase().includes("row-level security")) {
          rlsNotice = true;
        }
        mediaUrl = URL.createObjectURL(file);
      }

      const newMem = {
        id: "mem-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        type: "video",
        title: "A Special Memory",
        caption: "",
        date: "Special Day",
        mediaUrl: mediaUrl,
        image: "",
        isHighlight: false,
        style: "tape",
        tilt: "slight",
        size: "normal"
      };

      activeMemories.push(newMem);
    } catch (err) {
      console.error("Failed processing video memory file:", err);
    }
  }

  saveActiveMemories();
  renderMemoriesScrapbook();
  renderMemories();
  renderAdminMemoriesList();
  initHighlightedMemoriesObserver();
  updateMemoriesCounter();

  if (successCount > 0) {
    showStorageStatus(
      "adminMemoriesUploadStatus",
      `Uploaded ${successCount} video memor${successCount > 1 ? "ies" : "y"} to Supabase Storage ❤️`,
      "success",
      5000
    );
  } else if (rlsNotice) {
    showStorageStatus(
      "adminMemoriesUploadStatus",
      "Saved locally! (Note: Enable INSERT policy on bucket 'Birthday-assets' for online storage)",
      "error",
      7500
    );
  } else {
    showStorageStatus(
      "adminMemoriesUploadStatus",
      `Added ${validFiles.length} video memor${validFiles.length > 1 ? "ies" : "y"} ❤️`,
      "success",
      4000
    );
  }
}

// Admin Memories Tab Management (Reordering, Highlighting, Adding, Deleting)
function setupAdminMemories() {
  const resetBtn = document.getElementById("adminResetMemoriesBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset memories to default list?")) {
        activeMemories = [...defaultMemories];
        saveActiveMemories();
        renderMemoriesScrapbook();
        renderMemories();
        renderAdminMemoriesList();
        initHighlightedMemoriesObserver();
        updateMemoriesCounter();
      }
    });
  }

  const addPhotoBtn = document.getElementById("adminAddMemoryPhotoBtn");
  const photoFileInput = document.getElementById("adminMemoryPhotoFileInput");
  if (addPhotoBtn) {
    addPhotoBtn.addEventListener("click", () => {
      if (!isCurrentUserAdmin()) {
        openAdminLoginForm("🔒 Admin sign-in required to add photo memories.");
        return;
      }
      if (photoFileInput) {
        photoFileInput.click();
      }
    });
  }

  if (photoFileInput) {
    photoFileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleMemoryPhotoFiles(Array.from(e.target.files));
        photoFileInput.value = "";
      }
    });
  }

  const addVideoBtn = document.getElementById("adminAddMemoryVideoBtn");
  const videoFileInput = document.getElementById("adminMemoryVideoFileInput");
  if (addVideoBtn) {
    addVideoBtn.addEventListener("click", () => {
      if (!isCurrentUserAdmin()) {
        openAdminLoginForm("🔒 Admin sign-in required to add video memories.");
        return;
      }
      if (videoFileInput) {
        videoFileInput.click();
      }
    });
  }

  if (videoFileInput) {
    videoFileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleMemoryVideoFiles(Array.from(e.target.files));
        videoFileInput.value = "";
      }
    });
  }
}

function renderAdminMemoriesList() {
  const container = document.getElementById("adminMemoriesList");
  updateMemoriesCounter();
  if (!container) return;

  container.innerHTML = "";

  // Apply uniform grid layout with aspect-ratio: 1/1 and object-fit: cover for all photo cards
  container.className = "admin-memories-list admin-memories-grid";
  container.style.display = "";
  container.style.gridTemplateColumns = "";

  if (activeMemories.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem 1rem; background: rgba(255,255,255,0.03); border: 1px dashed rgba(255,255,255,0.18); border-radius: 12px;">
        <p style="color: var(--color-text-secondary); font-size: 0.9rem; margin-bottom: 0.35rem;">🎞️ No memories currently added.</p>
        <p style="color: rgba(255,255,255,0.6); font-size: 0.8rem;">Click <strong>"+ Add Photo Memory"</strong> to pick pictures from your device!</p>
      </div>
    `;
    return;
  }

  activeMemories.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "admin-memory-grid-card admin-memory-item-row";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.background = "rgba(255, 255, 255, 0.05)";
    card.style.border = "1px solid rgba(255, 255, 255, 0.15)";
    card.style.borderRadius = "14px";
    card.style.overflow = "hidden";
    card.style.position = "relative";
    card.style.transition = "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease";

    const displayTitle = item.title && item.title.trim().length > 0 ? item.title : "A Special Memory";
    const mediaThumb = item.image || item.mediaUrl || "";

    // Uniform square media container with object-fit: cover and aspect-ratio: 1/1
    let mediaMarkup = "";
    if (item.type === "video") {
      mediaMarkup = `
        <div class="admin-memory-media-container" style="position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden; background: #060919;">
          <video src="${escapeHtml(item.mediaUrl)}" class="admin-memory-media-video" style="width: 100%; height: 100%; object-fit: cover; aspect-ratio: 1 / 1; display: block;" muted playsinline preload="metadata"></video>
          <span style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.75); backdrop-filter: blur(4px); color: #fff; font-size: 0.72rem; padding: 2px 7px; border-radius: 6px; font-weight: 600;">🎥 Video</span>
          <button type="button" class="admin-preview-video-btn" style="position: absolute; inset: 0; background: transparent; border: none; cursor: pointer; width: 100%; height: 100%;" title="Click to play/preview video"></button>
        </div>
      `;
    } else if (mediaThumb) {
      mediaMarkup = `
        <div class="admin-memory-media-container" style="position: relative; width: 100%; aspect-ratio: 1 / 1; overflow: hidden; background: #060919; cursor: pointer;">
          <img src="${escapeHtml(mediaThumb)}" class="admin-memory-media-img" alt="${escapeHtml(displayTitle)}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; aspect-ratio: 1 / 1; display: block; transition: transform 0.3s ease;" />
          <span style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px); color: #ffd700; font-size: 0.68rem; padding: 2px 6px; border-radius: 6px; font-weight: 600;">#${index + 1}</span>
          ${item.isHighlight ? `<span style="position: absolute; top: 8px; left: 8px; background: rgba(255, 215, 0, 0.25); border: 1px solid rgba(255, 215, 0, 0.55); backdrop-filter: blur(4px); color: #ffd700; font-size: 0.65rem; padding: 2px 6px; border-radius: 9999px; font-weight: 700;">⭐ Star</span>` : ''}
        </div>
      `;
    } else {
      mediaMarkup = `
        <div class="admin-memory-media-container" style="position: relative; width: 100%; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); color: var(--color-text-secondary); font-size: 2rem;">
          📷
        </div>
      `;
    }

    card.innerHTML = `
      ${mediaMarkup}
      <div class="admin-memory-card-body" style="padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; flex: 1;">
        <div style="display: flex; align-items: center; gap: 4px;">
          <input 
            type="text" 
            class="admin-memory-title-input form-input" 
            value="${escapeHtml(item.title || '')}" 
            placeholder="A Special Memory" 
            title="Edit memory title (click to change)" 
            style="font-size: 0.82rem; font-weight: 600; padding: 4px 7px; width: 100%; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.18); border-radius: 6px; color: #fff;"
          />
          <button type="button" class="admin-icon-btn edit-title-prompt-btn" title="Edit title in prompt dialog" style="font-size: 0.72rem; padding: 3px 5px; opacity: 0.75; flex-shrink: 0;">✏️</button>
        </div>
        <div class="admin-memory-card-footer" style="display: flex; justify-content: space-between; align-items: center; gap: 0.35rem; margin-top: auto; padding-top: 0.4rem; border-top: 1px solid rgba(255,255,255,0.08);">
          <label class="memory-highlight-toggle" style="display: flex; align-items: center; gap: 0.25rem; font-size: 0.76rem; cursor: pointer; color: #ffd700; user-select: none;">
            <input type="checkbox" class="toggle-highlight-checkbox" ${item.isHighlight ? 'checked' : ''} />
            <span>⭐ Star</span>
          </label>
          <div style="display: flex; align-items: center; gap: 3px;">
            <button type="button" class="admin-icon-btn move-up-btn" ${index === 0 ? 'disabled' : ''} title="Move earlier in story" style="padding: 2px 6px; font-size: 0.75rem;">▲</button>
            <button type="button" class="admin-icon-btn move-down-btn" ${index === activeMemories.length - 1 ? 'disabled' : ''} title="Move later in story" style="padding: 2px 6px; font-size: 0.75rem;">▼</button>
            <button type="button" class="admin-danger-btn delete-mem-btn" title="Delete memory" style="padding: 2px 6px; font-size: 0.75rem;">🗑️</button>
          </div>
        </div>
      </div>
    `;

    // Click on photo container to open lightbox
    if (item.type !== "video" && mediaThumb) {
      const mediaContainer = card.querySelector(".admin-memory-media-container");
      if (mediaContainer) {
        mediaContainer.addEventListener("click", () => {
          openLightbox(item);
        });
      }
    } else if (item.type === "video") {
      const previewBtn = card.querySelector(".admin-preview-video-btn");
      const videoEl = card.querySelector(".admin-memory-media-video");
      if (previewBtn && videoEl) {
        previewBtn.addEventListener("click", () => {
          if (videoEl.paused) {
            videoEl.play();
          } else {
            videoEl.pause();
          }
        });
      }
    }

    // Title editing via inline input
    const titleInput = card.querySelector(".admin-memory-title-input");
    if (titleInput) {
      titleInput.addEventListener("change", (e) => {
        item.title = e.target.value.trim() || "A Special Memory";
        saveActiveMemories();
        renderMemoriesScrapbook();
      });
      titleInput.addEventListener("blur", (e) => {
        const val = e.target.value.trim() || "A Special Memory";
        if (item.title !== val) {
          item.title = val;
          saveActiveMemories();
          renderMemoriesScrapbook();
        }
      });
    }

    // Title editing via prompt button
    const editPencilBtn = card.querySelector(".edit-title-prompt-btn");
    if (editPencilBtn) {
      editPencilBtn.addEventListener("click", () => {
        const promptVal = prompt("Edit Memory Title:", item.title || "A Special Memory");
        if (promptVal !== null) {
          item.title = promptVal.trim() || "A Special Memory";
          if (titleInput) titleInput.value = item.title;
          saveActiveMemories();
          renderMemoriesScrapbook();
        }
      });
    }

    // Toggle highlight (Spotlight)
    const cb = card.querySelector(".toggle-highlight-checkbox");
    if (cb) {
      cb.addEventListener("change", (e) => {
        item.isHighlight = e.target.checked;
        saveActiveMemories();
        renderMemoriesScrapbook();
        initHighlightedMemoriesObserver();
      });
    }

    // Move Up
    const upBtn = card.querySelector(".move-up-btn");
    if (upBtn && index > 0) {
      upBtn.addEventListener("click", () => {
        const temp = activeMemories[index];
        activeMemories[index] = activeMemories[index - 1];
        activeMemories[index - 1] = temp;
        saveActiveMemories();
        renderMemoriesScrapbook();
        renderMemories();
        renderAdminMemoriesList();
        initHighlightedMemoriesObserver();
      });
    }

    // Move Down
    const downBtn = card.querySelector(".move-down-btn");
    if (downBtn && index < activeMemories.length - 1) {
      downBtn.addEventListener("click", () => {
        const temp = activeMemories[index];
        activeMemories[index] = activeMemories[index + 1];
        activeMemories[index + 1] = temp;
        saveActiveMemories();
        renderMemoriesScrapbook();
        renderMemories();
        renderAdminMemoriesList();
        initHighlightedMemoriesObserver();
      });
    }

    // Delete
    const delBtn = card.querySelector(".delete-mem-btn");
    if (delBtn) {
      delBtn.addEventListener("click", () => {
        if (confirm(`Remove memory "${item.title || 'this memory'}"?`)) {
          activeMemories.splice(index, 1);
          saveActiveMemories();
          renderMemoriesScrapbook();
          renderMemories();
          renderAdminMemoriesList();
          initHighlightedMemoriesObserver();
          updateMemoriesCounter();
        }
      });
    }

    container.appendChild(card);
  });
}

function openLightbox(mediaOrItem, caption = "", title = "", date = "", isHighlight = false) {
  if (!lightboxModal || !lightboxImg) return;

  let imgSrc = "";
  let itemTitle = "";
  let itemCaption = "";
  let itemDate = "";
  let itemHighlight = false;

  if (mediaOrItem && typeof mediaOrItem === "object") {
    imgSrc = mediaOrItem.mediaUrl || mediaOrItem.image || "";
    itemTitle = mediaOrItem.title || "";
    itemCaption = mediaOrItem.caption || "";
    itemDate = mediaOrItem.date || "";
    itemHighlight = Boolean(mediaOrItem.isHighlight);
  } else {
    imgSrc = mediaOrItem || "";
    itemCaption = caption || "";
    itemTitle = title || "";
    itemDate = date || "";
    itemHighlight = Boolean(isHighlight);
  }

  lightboxImg.src = imgSrc;
  lightboxImg.alt = itemTitle || "Memory photo in full";

  const titleEl = document.getElementById("lightboxTitle");
  if (titleEl) {
    if (itemTitle && itemTitle.trim().length > 0) {
      titleEl.textContent = itemTitle.trim();
      titleEl.style.display = "block";
    } else {
      titleEl.textContent = "";
      titleEl.style.display = "none";
    }
  }

  const captionEl = document.getElementById("lightboxCaption");
  if (captionEl) {
    if (itemCaption && itemCaption.trim().length > 0) {
      captionEl.textContent = itemCaption.trim();
      captionEl.style.display = "block";
    } else {
      captionEl.textContent = "";
      captionEl.style.display = "none";
    }
  }

  const dateEl = document.getElementById("lightboxDate");
  if (dateEl) {
    if (itemDate && itemDate.trim().length > 0) {
      dateEl.textContent = `📅 ${itemDate.trim()}`;
      dateEl.style.display = "inline-flex";
    } else {
      dateEl.textContent = "";
      dateEl.style.display = "none";
    }
  }

  const badgeEl = document.getElementById("lightboxHighlightBadge");
  if (badgeEl) {
    badgeEl.style.display = itemHighlight ? "inline-flex" : "none";
  }

  lightboxModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightboxModal) return;
  lightboxModal.classList.remove("active");
  document.body.style.overflow = "";
}

// ============================================================================
// HEARTFELT VIDEO MESSAGE BOOTH (Camera & Audio Recording)
// ============================================================================
async function startCamera() {
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
      audio: true
    });
    if (videoPreview) {
      videoPreview.srcObject = mediaStream;
      videoPreview.style.display = "block";
      videoPreview.muted = true;
      videoPreview.play();
    }
    return true;
  } catch (err) {
    alert("Camera & microphone access is needed to record a video message! Please check permissions in your browser.");
    return false;
  }
}

function stopCamera() {
  if (mediaStream) {
    mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  }
  if (videoPreview) {
    videoPreview.style.display = "none";
    videoPreview.srcObject = null;
  }
}

async function handleRecordStart() {
  const ready = await startCamera();
  if (!ready) return;

  recordedChunks = [];
  try {
    mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      recordedBlobUrl = URL.createObjectURL(blob);
      if (videoPreview) {
        videoPreview.srcObject = null;
        videoPreview.src = recordedBlobUrl;
        videoPreview.muted = false;
        videoPreview.controls = true;
      }
      if (saveVideoBtn) saveVideoBtn.style.display = "inline-flex";
      stopCamera();
    };

    mediaRecorder.start();
    if (recordVideoBtn) recordVideoBtn.style.display = "none";
    if (stopVideoBtn) stopVideoBtn.style.display = "inline-flex";
    if (recordingIndicator) recordingIndicator.style.display = "inline-flex";
  } catch (err) {
    alert("MediaRecorder is not supported in this browser.");
  }
}

function handleRecordStop() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
  if (stopVideoBtn) stopVideoBtn.style.display = "none";
  if (recordVideoBtn) recordVideoBtn.style.display = "inline-flex";
  if (recordingIndicator) recordingIndicator.style.display = "none";
}

function handleSaveVideo() {
  if (!recordedBlobUrl) return;
  const author = (authorNameInput && authorNameInput.value.trim()) || "A Loving Friend";

  const card = document.createElement("div");
  card.className = "message-video-card";
  card.innerHTML = `
    <video src="${recordedBlobUrl}" controls></video>
    <div class="message-meta">
      <span class="author-name">💌 ${author}</span>
      <a href="${recordedBlobUrl}" download="birthday-wish-${author}.webm" class="footer-link" style="color: var(--color-blue-baby); font-size:0.75rem;">Download</a>
    </div>
  `;
  if (recordedList) {
    recordedList.prepend(card);
  }

  // Reset recorder UI
  if (saveVideoBtn) saveVideoBtn.style.display = "none";
  if (authorNameInput) authorNameInput.value = "";
  if (videoPreview) {
    videoPreview.style.display = "none";
    videoPreview.src = "";
  }
}

// ============================================================================
// EVENT LISTENERS & CUSTOMIZATION
// ============================================================================
function setupEventListeners() {
  // Main music play/pause toggle button
  if (musicPlayBtn) {
    musicPlayBtn.addEventListener("click", () => toggleMusic());
  } else if (musicBtn) {
    musicBtn.addEventListener("click", () => toggleMusic());
  }

  // Music mute/unmute button
  if (musicMuteBtn) {
    musicMuteBtn.addEventListener("click", () => toggleMute());
  }

  // Mobile autoplay tap-to-play pill
  if (autoplayMusicPrompt) {
    autoplayMusicPrompt.addEventListener("click", () => {
      playMusic();
    });
  }

  // Celebrate More Confetti button
  const celebrateMoreBtn = document.getElementById("celebrateMoreBtn");
  if (celebrateMoreBtn) {
    celebrateMoreBtn.addEventListener("click", () => startConfettiAnimation());
  }

  // Show Me button / Photo Sticker on Opening Screen
  if (showMeBtn) {
    showMeBtn.addEventListener("click", () => {
      startRevealSequence();
    });
  }
  const showMeStickerContainer = document.getElementById("showMeStickerContainer");
  if (showMeStickerContainer) {
    showMeStickerContainer.addEventListener("click", () => {
      startRevealSequence();
    });
  }
  const stickerWrappers = document.querySelectorAll(".photo-sticker-wrapper");
  stickerWrappers.forEach(w => {
    w.addEventListener("click", () => {
      startRevealSequence();
    });
  });

  // Skip Reveal button on 10s Photo Reveal
  if (skipRevealBtn) {
    skipRevealBtn.addEventListener("click", () => {
      completePhotoRevealToMainExperience();
    });
  }

  // Expose key handlers to window for backwards compatibility
  window.startConfettiAnimation = startConfettiAnimation;
  window.toggleMusic = toggleMusic;
  window.playMusic = playMusic;
  window.pauseMusic = pauseMusic;
  window.toggleMute = toggleMute;

  // Lightbox close
  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener("click", closeLightbox);
  }
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal || e.target.classList.contains("lightbox-close-btn")) {
        closeLightbox();
      }
    });
  }
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightboxModal && lightboxModal.classList.contains("active")) {
      closeLightbox();
    }
  });

  // Tabs for last day section
  if (tabMemories && tabVideos) {
    tabMemories.addEventListener("click", () => {
      tabMemories.classList.add("active");
      tabVideos.classList.remove("active");
      if (memoriesView) memoriesView.style.display = "grid";
      if (videoBoothView) videoBoothView.style.display = "none";
    });

    tabVideos.addEventListener("click", () => {
      tabVideos.classList.add("active");
      tabMemories.classList.remove("active");
      if (memoriesView) memoriesView.style.display = "none";
      if (videoBoothView) videoBoothView.style.display = "flex";
    });
  }

  // Video recording actions
  if (recordVideoBtn) recordVideoBtn.addEventListener("click", handleRecordStart);
  if (stopVideoBtn) stopVideoBtn.addEventListener("click", handleRecordStop);
  if (saveVideoBtn) saveVideoBtn.addEventListener("click", handleSaveVideo);

  // Dev modal triggers
  if (devToggleBtn) {
    devToggleBtn.addEventListener("click", () => {
      if (devModal) devModal.classList.add("active");
      populateAdminTextInputs();
      updateAdminMediaCards();
      updateAdminRevealCards();
    });
  }
  if (closeDevModalBtn) {
    closeDevModalBtn.addEventListener("click", () => {
      if (devModal) devModal.classList.remove("active");
    });
  }
  if (devModal) {
    devModal.addEventListener("click", (e) => {
      if (e.target === devModal) devModal.classList.remove("active");
    });
  }

  // Dev overlay opacity live slider
  if (devOpacityInput) {
    devOpacityInput.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (devOpacityVal) devOpacityVal.textContent = `${Math.round(val * 100)}%`;
      document.documentElement.style.setProperty("--overlay-opacity", String(val));
    });
  }

  // Apply dev changes
  if (applyDevBtn) {
    applyDevBtn.addEventListener("click", async () => {
      if (devDateInput && devDateInput.value) {
        targetDate = new Date(devDateInput.value);
      }
      if (devNameInput && devNameInput.value) {
        currentName = devNameInput.value.trim();
        try { localStorage.setItem("birthday_custom_name_v1", currentName); } catch (_) {}
      }
      if (devMessageInput && devMessageInput.value) {
        currentMessage = devMessageInput.value.trim();
        try { localStorage.setItem("birthday_custom_message_v1", currentMessage); } catch (_) {}
      }
      if (devBgInput && devBgInput.value) {
        currentBgImage = devBgInput.value.trim();
        try { localStorage.setItem("birthday_bg_image_v1", currentBgImage); } catch (_) {}
      }
      if (devMusicInput && devMusicInput.value) {
        currentMusicUrl = devMusicInput.value.trim();
        try { localStorage.setItem("birthday_custom_music_v1", currentMusicUrl); } catch (_) {}
        if (bgAudio) bgAudio.src = currentMusicUrl;
      }
      if (devOpacityInput) {
        currentOverlayOpacity = parseFloat(devOpacityInput.value);
      }
      if (devRevealThirdTitleInput && devRevealThirdTitleInput.value) {
        burstConfig.revealThirdTitle = devRevealThirdTitleInput.value.trim();
        currentRevealTitles[2] = burstConfig.revealThirdTitle;
        saveBurstSettings();
      }

      // Read any edited website texts and apply immediately to DOM
      readAdminTextInputs();
      applySiteTextsToDOM();

      // Persist latest configuration to Supabase birthday_content table (row id=1)
      await saveAllBirthdayContentToSupabase();

      setupDynamicContent();
      setupBackground();
      
      // Reset view to opening screen
      initOpeningScreen();

      if (devModal) devModal.classList.remove("active");
    });
  }

  // Quick Test Reveal Sequence (3-2-1 -> 10s Photo Reveal -> Celebration)
  if (testRevealSequenceBtn) {
    testRevealSequenceBtn.addEventListener("click", () => {
      if (devModal) devModal.classList.remove("active");
      startRevealSequence();
    });
  }

  // Quick Test Zero / Celebration
  if (testZeroBtn) {
    testZeroBtn.addEventListener("click", () => {
      triggerCelebration();
      if (devModal) devModal.classList.remove("active");
    });
  }

  // Quick Test Last Day Vault
  if (testLastDayBtn) {
    testLastDayBtn.addEventListener("click", () => {
      unlockLastDaySection();
      if (devModal) devModal.classList.remove("active");
      if (lastDaySection) {
        lastDaySection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Quick Test Guestbook Section
  if (testGuestbookBtn) {
    testGuestbookBtn.addEventListener("click", () => {
      if (guestbookSection) {
        guestbookSection.classList.add("active");
        renderGuestbookGallery();
        guestbookSection.scrollIntoView({ behavior: "smooth" });
      }
      if (devModal) devModal.classList.remove("active");
    });
  }

  // Reset Experience to Opening Screen
  if (resetExperienceBtn) {
    resetExperienceBtn.addEventListener("click", () => {
      currentName = birthdayName;
      currentMessage = birthdayMessage;
      currentBgImage = backgroundImage;
      currentOverlayOpacity = overlayOpacity;
      setupDynamicContent();
      setupBackground();
      resetToOpeningScreen();
      if (devModal) devModal.classList.remove("active");
    });
  }

  // Copy Clean Config Snippet
  if (copyConfigBtn) {
    copyConfigBtn.addEventListener("click", () => {
      const codeSnippet = `// Paste into top of script.js:
const birthdayDate = "${devDateInput ? devDateInput.value : birthdayDate}";
const birthdayName = "${devNameInput ? devNameInput.value : birthdayName}";
const birthdayMessage = "${devMessageInput ? devMessageInput.value.replace(/"/g, '\\"') : birthdayMessage}";
const backgroundImage = "${devBgInput ? devBgInput.value : backgroundImage}";
const overlayOpacity = ${devOpacityInput ? devOpacityInput.value : overlayOpacity};
const backgroundMusic = "${backgroundMusic}";
const loopMusic = ${loopMusic};`;

      navigator.clipboard.writeText(codeSnippet).then(() => {
        const originalText = copyConfigBtn.textContent;
        copyConfigBtn.textContent = "Copied to Clipboard! ✓";
        setTimeout(() => {
          copyConfigBtn.textContent = originalText;
        }, 2000);
      });
    });
  }

  // ============================================================================
  // ADMIN AUTHENTICATION CONTROLS
  // ============================================================================
  if (toggleAdminLoginBtn && adminLoginForm) {
    toggleAdminLoginBtn.addEventListener("click", () => {
      const isHidden = adminLoginForm.style.display === "none";
      adminLoginForm.style.display = isHidden ? "block" : "none";
      if (isHidden && adminPasswordInput) {
        adminPasswordInput.focus();
      }
    });
  }

  if (adminCancelLoginBtn && adminLoginForm) {
    adminCancelLoginBtn.addEventListener("click", () => {
      adminLoginForm.style.display = "none";
    });
  }

  if (adminSignInBtn) {
    adminSignInBtn.addEventListener("click", async () => {
      const email = adminEmailInput ? adminEmailInput.value.trim() : "";
      const password = adminPasswordInput ? adminPasswordInput.value : "";
      if (!email || !password) {
        showStorageStatus("adminAuthStatus", "Please enter both admin email and password.", "error", 4000);
        return;
      }

      showStorageStatus("adminAuthStatus", "Authenticating with Supabase...", "loading", 0);
      const client = getSupabaseClient();
      if (!client || !client.auth) {
        showStorageStatus("adminAuthStatus", "Supabase client not available. Check network connection.", "error", 4000);
        return;
      }

      try {
        const { data, error } = await client.auth.signInWithPassword({ email, password });
        if (error) {
          showStorageStatus("adminAuthStatus", `Sign in failed: ${error.message}`, "error", 6000);
        } else if (data?.session) {
          updateAdminUI(data.session);
          showStorageStatus("adminAuthStatus", "Admin authenticated successfully! Online modifications enabled. ❤️", "success", 4000);
        }
      } catch (err) {
        showStorageStatus("adminAuthStatus", `Sign in error: ${err.message}`, "error", 5000);
      }
    });
  }

  if (adminMagicLinkBtn) {
    adminMagicLinkBtn.addEventListener("click", async () => {
      const email = adminEmailInput ? adminEmailInput.value.trim() : "";
      if (!email) {
        showStorageStatus("adminAuthStatus", "Please enter admin email to receive magic sign-in link.", "error", 4000);
        return;
      }

      showStorageStatus("adminAuthStatus", "Sending magic sign-in link...", "loading", 0);
      const client = getSupabaseClient();
      if (!client || !client.auth) {
        showStorageStatus("adminAuthStatus", "Supabase client not available.", "error", 4000);
        return;
      }

      try {
        const { error } = await client.auth.signInWithOtp({
          email,
          options: {
            emailRedirectTo: window.location.href
          }
        });
        if (error) {
          showStorageStatus("adminAuthStatus", `Magic link error: ${error.message}`, "error", 6000);
        } else {
          showStorageStatus("adminAuthStatus", `Magic link dispatched to ${email}! Check email to authenticate.`, "success", 7000);
        }
      } catch (err) {
        showStorageStatus("adminAuthStatus", `Magic link error: ${err.message}`, "error", 5000);
      }
    });
  }

  if (adminSignOutBtn) {
    adminSignOutBtn.addEventListener("click", async () => {
      const client = getSupabaseClient();
      if (client && client.auth) {
        await client.auth.signOut().catch(() => {});
      }
      updateAdminUI(null);
      showStorageStatus("adminAuthStatus", "Signed out of admin mode. Site is now in visitor read-only mode.", "loading", 3500);
    });
  }

  // Allow pressing Enter on password field to submit
  if (adminPasswordInput && adminSignInBtn) {
    adminPasswordInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        adminSignInBtn.click();
      }
    });
  }

  // ============================================================================
  // WIRE UP PHOTO BURST & CUSTOMIZE CELEBRATION CONTROLS
  // ============================================================================

  // Tab Navigation in Customize Modal
  if (customizeNavTabs) {
    const tabButtons = customizeNavTabs.querySelectorAll(".customize-tab-btn");
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetTabId = btn.getAttribute("data-tab");
        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const panes = document.querySelectorAll(".customize-pane");
        panes.forEach(p => {
          if (p.id === targetTabId) {
            p.classList.add("active");
          } else {
            p.classList.remove("active");
          }
        });

        if (targetTabId === "tabMemoriesAdmin") {
          renderAdminMemoriesList();
        } else if (targetTabId === "tabLoveNotesAdmin") {
          renderAdminLoveNotesList();
        } else if (targetTabId === "tabText") {
          populateAdminTextInputs();
        } else if (targetTabId === "tabRevealAdmin") {
          updateAdminRevealCards();
        } else if (targetTabId === "tabBackground") {
          updateAdminMediaCards();
        } else if (targetTabId === "tabMusic") {
          updateAdminMediaCards();
        }
      });
    });
  }

  // Photo Upload Actions
  if (addPhotosBtn && photoFileInput) {
    addPhotosBtn.addEventListener("click", () => {
      if (!isCurrentUserAdmin()) {
        openAdminLoginForm("🔒 Admin sign-in required to upload photos to Supabase Storage.");
        return;
      }
      photoFileInput.click();
    });
  }

  if (syncSupabasePhotosBtn) {
    syncSupabasePhotosBtn.addEventListener("click", async () => {
      showStorageStatus("photoUploadStatus", "Checking Supabase Storage (photos/)...", "loading", 0);
      const loaded = await loadBirthdayPhotosFromSupabase();
      if (loaded) {
        showStorageStatus("photoUploadStatus", `Synced ${currentPhotos.length} photo(s) from Supabase ❤️`, "success", 4500);
      } else {
        showStorageStatus("photoUploadStatus", "No remote photos found in Supabase Storage. Current photos active.", "loading", 3500);
      }
    });
  }

  if (photoFileInput) {
    photoFileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handlePhotoFiles(Array.from(e.target.files));
        photoFileInput.value = "";
      }
    });
  }

  if (loadSamplePhotosBtn) {
    loadSamplePhotosBtn.addEventListener("click", () => {
      loadSamplePhotos();
    });
  }

  if (clearAllPhotosBtn) {
    clearAllPhotosBtn.addEventListener("click", () => {
      const hasRemote = currentPhotos.some(p => p.fromSupabase);
      if (hasRemote && !isCurrentUserAdmin()) {
        openAdminLoginForm("🔒 Admin sign-in required to delete online celebration photos.");
        return;
      }
      if (confirm("Are you sure you want to clear all uploaded celebration photos?")) {
        clearAllPhotos();
      }
    });
  }

  // Replay Photo Burst Button (in Celebration Screen)
  if (replayBurstBtn) {
    replayBurstBtn.addEventListener("click", () => {
      triggerPhotoBurst();
      startConfettiAnimation();
    });
  }

  // Test Photo Burst Buttons (in Modal)
  if (testPhotoBurstActionBtn) {
    testPhotoBurstActionBtn.addEventListener("click", () => {
      triggerCelebration();
      if (devModal) devModal.classList.remove("active");
    });
  }

  if (testBurstModalFooterBtn) {
    testBurstModalFooterBtn.addEventListener("click", () => {
      triggerCelebration();
      if (devModal) devModal.classList.remove("active");
    });
  }

  if (closeDevModalBottomBtn) {
    closeDevModalBottomBtn.addEventListener("click", () => {
      if (devModal) devModal.classList.remove("active");
    });
  }

  // Burst & FX Live Setting Listeners
  if (burstStyleSelect) {
    burstStyleSelect.addEventListener("change", (e) => {
      burstConfig.burstStyle = e.target.value;
      saveBurstSettings();
    });
  }
  if (photoShapeSelect) {
    photoShapeSelect.addEventListener("change", (e) => {
      burstConfig.photoShape = e.target.value;
      saveBurstSettings();
    });
  }
  if (photoSizeSelect) {
    photoSizeSelect.addEventListener("change", (e) => {
      burstConfig.photoSize = e.target.value;
      saveBurstSettings();
    });
  }
  if (burstSpeedSelect) {
    burstSpeedSelect.addEventListener("change", (e) => {
      burstConfig.burstSpeed = e.target.value;
      saveBurstSettings();
    });
  }
  if (burstDurationSelect) {
    burstDurationSelect.addEventListener("change", (e) => {
      burstConfig.burstDuration = e.target.value;
      saveBurstSettings();
    });
  }
  if (photoRotationSelect) {
    photoRotationSelect.addEventListener("change", (e) => {
      burstConfig.photoRotation = e.target.value;
      saveBurstSettings();
    });
  }
  if (photoBorderColorSelect) {
    photoBorderColorSelect.addEventListener("change", (e) => {
      burstConfig.photoBorderColor = e.target.value;
      saveBurstSettings();
    });
  }
  if (photoBorderThicknessSelect) {
    photoBorderThicknessSelect.addEventListener("change", (e) => {
      burstConfig.photoBorderThickness = e.target.value;
      saveBurstSettings();
    });
  }
  if (photoCornerRadiusInput) {
    photoCornerRadiusInput.addEventListener("input", (e) => {
      burstConfig.photoCornerRadius = parseInt(e.target.value, 10);
      saveBurstSettings();
    });
  }
  if (photoGlowIntensityInput) {
    photoGlowIntensityInput.addEventListener("input", (e) => {
      burstConfig.photoGlowIntensity = parseFloat(e.target.value);
      saveBurstSettings();
    });
  }
  if (confettiAmountSelect) {
    confettiAmountSelect.addEventListener("change", (e) => {
      burstConfig.confettiAmount = e.target.value;
      saveBurstSettings();
    });
  }
  if (confettiSpeedSelect) {
    confettiSpeedSelect.addEventListener("change", (e) => {
      burstConfig.confettiSpeed = e.target.value;
      saveBurstSettings();
    });
  }

  // Background Customization Listeners
  if (uploadBgBtn && bgFileInput) {
    uploadBgBtn.addEventListener("click", () => {
      if (!isCurrentUserAdmin()) {
        openAdminLoginForm("🔒 Admin sign-in required to upload background images to Supabase Storage.");
        return;
      }
      bgFileInput.click();
    });
  }

  if (bgFileInput) {
    bgFileInput.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        showStorageStatus(
          "bgUploadStatus",
          "Uploading background image to Supabase Storage (backgrounds/)...",
          "loading",
          0
        );

        try {
          const uploadRes = await uploadToSupabaseStorage("backgrounds", file);
          if (uploadRes.success) {
            currentBgImage = uploadRes.publicUrl;
            if (devBgInput) devBgInput.value = currentBgImage;
            setupBackground();
            // Save public URL to birthday_content table
            await saveBirthdayContentToSupabase(currentMessage, currentBgImage, currentMusicUrl);
            showStorageStatus("bgUploadStatus", "Saved successfully ❤️", "success", 5000);
          } else {
            // Local fallback preview
            const reader = new FileReader();
            reader.onload = (event) => {
              currentBgImage = event.target.result;
              if (devBgInput) devBgInput.value = "Custom Uploaded Photo (Local)";
              setupBackground();
            };
            reader.readAsDataURL(file);

            const isRLS = uploadRes.error && uploadRes.error.toLowerCase().includes("row-level security");
            showStorageStatus(
              "bgUploadStatus",
              isRLS
                ? "Applied locally! (Note: Enable INSERT policy on 'Birthday-assets' in Supabase to sync online)"
                : `Upload notice: ${uploadRes.error || "applied locally"}`,
              isRLS ? "error" : "loading",
              7000
            );
          }
        } catch (err) {
          console.error("Background upload error:", err);
          showStorageStatus("bgUploadStatus", "Failed to upload to Supabase, check network.", "error", 5000);
        }
      }
    });
  }

  if (bgGradientPresetSelect) {
    bgGradientPresetSelect.addEventListener("change", (e) => {
      burstConfig.gradientPreset = e.target.value;
      applyGradientPreset(e.target.value);
      saveBurstSettings();
    });
  }

  // Music Customization Listeners
  if (uploadAudioBtn && audioFileInput) {
    uploadAudioBtn.addEventListener("click", () => {
      if (!isCurrentUserAdmin()) {
        openAdminLoginForm("🔒 Admin sign-in required to upload music to Supabase Storage.");
        return;
      }
      audioFileInput.click();
    });
  }

  if (audioFileInput) {
    audioFileInput.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (uploadedAudioName) uploadedAudioName.textContent = file.name;
        showStorageStatus(
          "musicUploadStatus",
          "Uploading audio file to Supabase Storage (music/)...",
          "loading",
          0
        );

        try {
          const uploadRes = await uploadToSupabaseStorage("music", file);
          if (uploadRes.success) {
            currentMusicUrl = uploadRes.publicUrl;
            if (devMusicInput) devMusicInput.value = currentMusicUrl;
            if (bgAudio) {
              bgAudio.src = currentMusicUrl;
              playMusic();
            }
            // Save public URL to birthday_content table
            await saveBirthdayContentToSupabase(currentMessage, currentBgImage, currentMusicUrl);
            showStorageStatus("musicUploadStatus", "Saved successfully ❤️", "success", 5000);
          } else {
            // Local blob preview fallback
            const objectUrl = URL.createObjectURL(file);
            if (bgAudio) {
              bgAudio.src = objectUrl;
              playMusic();
            }
            const isRLS = uploadRes.error && uploadRes.error.toLowerCase().includes("row-level security");
            showStorageStatus(
              "musicUploadStatus",
              isRLS
                ? "Playing locally! (Note: Enable INSERT policy on 'Birthday-assets' in Supabase to sync online)"
                : `Upload notice: ${uploadRes.error || "playing locally"}`,
              isRLS ? "error" : "loading",
              7000
            );
          }
        } catch (err) {
          console.error("Music upload error:", err);
          showStorageStatus("musicUploadStatus", "Failed to upload to Supabase, check network.", "error", 5000);
        }
      }
    });
  }

  if (previewMusicBtn) {
    previewMusicBtn.addEventListener("click", () => {
      toggleMusic();
      previewMusicBtn.textContent = isMusicPlaying ? "⏸ Pause Preview" : "▶ Play Preview";
    });
  }

  if (devMusicVolume) {
    devMusicVolume.addEventListener("input", (e) => {
      const vol = parseFloat(e.target.value);
      if (bgAudio) bgAudio.volume = vol;
    });
  }

  if (devMusicLoop) {
    devMusicLoop.addEventListener("change", (e) => {
      if (bgAudio) bgAudio.loop = e.target.checked;
    });
  }

  // Headline Listener
  if (devHeadlineInput) {
    devHeadlineInput.addEventListener("input", (e) => {
      burstConfig.headline = e.target.value;
      const celebrationEyebrow = document.getElementById("celebrationEyebrow");
      if (celebrationEyebrow) celebrationEyebrow.textContent = e.target.value;
      saveBurstSettings();
    });
  }

  // Color Intensity Sliders
  if (colorPinkIntensity) {
    colorPinkIntensity.addEventListener("input", (e) => {
      burstConfig.colorPinkIntensity = parseFloat(e.target.value);
      applyThemeIntensities();
      saveBurstSettings();
    });
  }
  if (colorBlueIntensity) {
    colorBlueIntensity.addEventListener("input", (e) => {
      burstConfig.colorBlueIntensity = parseFloat(e.target.value);
      applyThemeIntensities();
      saveBurstSettings();
    });
  }
  if (colorPurpleIntensity) {
    colorPurpleIntensity.addEventListener("input", (e) => {
      burstConfig.colorPurpleIntensity = parseFloat(e.target.value);
      applyThemeIntensities();
      saveBurstSettings();
    });
  }
}

// ============================================================================
// ADMIN PANEL FULL CONTENT MANAGEMENT (TEXT, REVEAL PHOTOS, BACKGROUND, MUSIC)
// ============================================================================
function setupAdminPanelControls() {
  // --------------------------------------------------------------------------
  // 1. All Website Text Tab Controls & GitHub Publishing
  // --------------------------------------------------------------------------
  async function handleSaveAllText() {
    readAdminTextInputs();
    applySiteTextsToDOM();

    showStorageStatus("adminTextSaveStatus", "Saving all website text to Supabase...", "loading", 0);
    updatePublishingStatusUI("supabase", "saving");

    const saved = await saveAllBirthdayContentToSupabase();
    if (saved) {
      updatePublishingStatusUI("supabase", "saved");
      showStorageStatus("adminTextSaveStatus", "Saved successfully ❤️ (All website texts updated in database)", "success", 4000);
      updatePublishingStatusUI("github", "unsynced");
    } else {
      updatePublishingStatusUI("supabase", "unsaved");
      showStorageStatus("adminTextSaveStatus", `Supabase save failed: ${lastSupabaseError || "Database update failed"}`, "error", 6000);
    }
  }

  async function saveWebsiteChangesToGitHub() {
    const statusId = "adminGitHubSaveStatus";
    const btn = document.getElementById("adminSaveToGitHubBtn");
    const bottomBtn = document.getElementById("adminSaveToGitHubBtnBottom");

    if (!isCurrentUserAdmin()) {
      openAdminLoginForm("🔒 Admin sign-in required to commit changes to GitHub.");
      showStorageStatus(statusId, "Admin authentication required. Please sign in to publish.", "error", 6000);
      return;
    }

    readAdminTextInputs();
    applySiteTextsToDOM();

    // 1. Supabase save FIRST
    showStorageStatus(statusId, "Step 1/2: Saving changes to Supabase...", "loading", 0);
    updatePublishingStatusUI("supabase", "saving");

    const saved = await saveAllBirthdayContentToSupabase();
    if (!saved) {
      updatePublishingStatusUI("supabase", "unsaved");
      const errDetail = lastSupabaseError ? ` (${lastSupabaseError})` : "";
      showStorageStatus(statusId, `Supabase save failed${errDetail}. GitHub commit aborted to prevent desynchronization.`, "error", 7000);
      return;
    }
    updatePublishingStatusUI("supabase", "saved");

    // 2. GitHub commit through Supabase Edge Function
    showStorageStatus(statusId, "Step 2/2: Committing content to GitHub repository via Supabase Edge Function...", "loading", 0);
    updatePublishingStatusUI("github", "syncing");
    if (btn) btn.disabled = true;
    if (bottomBtn) bottomBtn.disabled = true;

    try {
      const contentPayload = buildSiteContentObject();
      const token = currentAdminSession?.access_token;
      const client = getSupabaseClient();

      let resData = null;
      let invokeError = null;

      if (client && client.functions) {
        try {
          const { data, error } = await client.functions.invoke("github-update-content", {
            body: {
              content: contentPayload,
              expectedSha: lastKnownGitHubSha || undefined,
              commitMessage: `Update website content from Admin Console`
            }
          });
          if (error) {
            invokeError = error;
          } else {
            resData = data;
          }
        } catch (fnErr) {
          invokeError = fnErr;
        }
      }

      if (!resData) {
        const edgeUrl = `${SUPABASE_URL}/functions/v1/github-update-content`;
        const res = await fetch(edgeUrl, {
          method: "POST",
          headers: {
            "apikey": SUPABASE_PUBLISHABLE_KEY,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: contentPayload,
            expectedSha: lastKnownGitHubSha || undefined,
            commitMessage: `Update website content from Admin Console`
          })
        });

        resData = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 409) {
            updatePublishingStatusUI("github", "conflict");
            showStorageStatus(statusId, "GitHub file changed externally. Please reload and try again.", "error", 8000);
            return;
          }
          const errMsg = resData?.error || invokeError?.message || `GitHub commit request failed (${res.status})`;
          throw new Error(errMsg);
        }
      }

      if (resData?.conflict) {
        updatePublishingStatusUI("github", "conflict");
        showStorageStatus(statusId, "GitHub file changed externally. Please reload and try again.", "error", 8000);
        return;
      }

      if (!resData?.success) {
        updatePublishingStatusUI("github", "error");
        const safeMsg = resData?.error || "GitHub repository update failed.";
        showStorageStatus(statusId, safeMsg, "error", 7000);
        return;
      }

      const commitSha = resData.commit?.sha || "";
      const shortSha = resData.commit?.shortSha || (commitSha ? commitSha.substring(0, 7) : "");
      const commitUrl = resData.commit?.htmlUrl || `https://github.com/Cat7890-sys/Birthday-countdown-v1/commit/${commitSha}`;
      const newFileSha = resData.file?.sha || null;
      if (newFileSha) lastKnownGitHubSha = newFileSha;

      gitHubSyncStatus = {
        synced: true,
        lastSyncTime: new Date().toISOString(),
        commitSha: shortSha,
        commitUrl: commitUrl,
        fileSha: newFileSha
      };

      try {
        localStorage.setItem("birthday_github_sync_status_v1", JSON.stringify(gitHubSyncStatus));
      } catch (_) {}

      updatePublishingStatusUI("github", "synced", gitHubSyncStatus);

      const successMsg = "Saved to GitHub successfully. Changes committed to GitHub. GitHub Pages may take a short time to deploy.";
      showStorageStatus(statusId, `✅ ${successMsg}${shortSha ? ` (Commit: ${shortSha})` : ""}`, "success", 10000);

    } catch (err) {
      console.error("[GitHub Sync] Commit error:", err);
      updatePublishingStatusUI("github", "error");
      const cleanErr = err?.message || "GitHub repository update failed.";
      showStorageStatus(statusId, cleanErr, "error", 7000);
    } finally {
      if (btn) btn.disabled = false;
      if (bottomBtn) bottomBtn.disabled = false;
    }
  }

  const saveAllTextBtn = document.getElementById("adminSaveAllTextBtn");
  if (saveAllTextBtn) saveAllTextBtn.addEventListener("click", handleSaveAllText);

  const saveAllTextBtnBottom = document.getElementById("adminSaveAllTextBtnBottom");
  if (saveAllTextBtnBottom) saveAllTextBtnBottom.addEventListener("click", handleSaveAllText);

  const saveToGitHubBtn = document.getElementById("adminSaveToGitHubBtn");
  if (saveToGitHubBtn) saveToGitHubBtn.addEventListener("click", saveWebsiteChangesToGitHub);

  const saveToGitHubBtnBottom = document.getElementById("adminSaveToGitHubBtnBottom");
  if (saveToGitHubBtnBottom) saveToGitHubBtnBottom.addEventListener("click", saveWebsiteChangesToGitHub);

  // Mark changes as unsynced when user types in any text inputs
  SITE_TEXT_FIELDS.forEach(item => {
    const input = document.getElementById(item.inputId);
    if (input) {
      input.addEventListener("input", () => {
        updatePublishingStatusUI("supabase", "unsaved");
        updatePublishingStatusUI("github", "unsynced");
      });
    }
  });

  const resetTextBtn = document.getElementById("adminResetTextBtn");
  if (resetTextBtn) {
    resetTextBtn.addEventListener("click", async () => {
      if (!confirm("Are you sure you want to restore all website text back to original default settings?")) return;
      currentSiteTexts = { ...defaultSiteTexts };
      populateAdminTextInputs();
      applySiteTextsToDOM();
      showStorageStatus("adminTextSaveStatus", "Resetting text to defaults...", "loading", 0);
      await saveAllBirthdayContentToSupabase();
      showStorageStatus("adminTextSaveStatus", "All texts reset to defaults! ❤️", "success", 3000);
    });
  }

  // --------------------------------------------------------------------------
  // 2. Reveal Sequence Tab Controls (Photos & Titles)
  // --------------------------------------------------------------------------
  async function handleRevealPhotoUpload(slotIndex, file) {
    if (!file || !file.type || !file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    const statusId = "adminRevealStatus";
    showStorageStatus(statusId, `Uploading Reveal Photo #${slotIndex + 1} to Supabase Storage (photos/)...`, "loading", 0);
    try {
      let photoSrc = "";
      let isRemote = false;

      if (isCurrentUserAdmin()) {
        const uploadRes = await uploadToSupabaseStorage("photos", file);
        if (uploadRes.success && uploadRes.publicUrl) {
          photoSrc = uploadRes.publicUrl;
          isRemote = true;
        } else {
          console.warn("Supabase upload returned without publicUrl, falling back to local data URL:", uploadRes.error);
          photoSrc = await readFileAsOptimizedDataURL(file);
        }
      } else {
        photoSrc = await readFileAsOptimizedDataURL(file);
      }

      currentRevealPhotos[slotIndex] = photoSrc;
      try {
        localStorage.setItem("birthday_reveal_photos_v1", JSON.stringify(currentRevealPhotos));
      } catch (_) {}

      const photoItem = {
        id: "reveal-hero-" + (slotIndex + 1) + "-" + Date.now(),
        name: file.name,
        src: photoSrc,
        caption: currentRevealTitles[slotIndex] || `Hero Photo ${slotIndex + 1}`,
        timestamp: Date.now(),
        fromSupabase: isRemote
      };

      while (currentPhotos.length <= slotIndex) {
        currentPhotos.push({
          id: "placeholder-" + currentPhotos.length,
          name: "Celebration Photo",
          src: photoSrc,
          fromSupabase: isRemote
        });
      }
      currentPhotos[slotIndex] = photoItem;

      await savePhotoRecord(photoItem);
      updateAdminRevealCards();
      renderPhotoThumbnails();

      const saved = await saveAllBirthdayContentToSupabase();
      if (saved) {
        showStorageStatus(statusId, `Reveal Photo #${slotIndex + 1} updated and synced with Supabase! ❤️`, "success", 4500);
      } else {
        if (isCurrentUserAdmin()) {
          showStorageStatus(statusId, `Reveal Photo #${slotIndex + 1} saved locally! Supabase error: ${lastSupabaseError || "Sync failed"}`, "error", 5000);
        } else {
          showStorageStatus(statusId, `Reveal Photo #${slotIndex + 1} updated locally! (Admin sign-in required to sync online)`, "loading", 4000);
        }
      }
    } catch (err) {
      console.error("Reveal photo upload failed:", err);
      showStorageStatus(statusId, "Failed to upload photo. Check network connection.", "error", 4000);
    }
  }

  function setupRevealSlot(slotIndex, triggerIds, inputIds, removeIds, saveBtnId, titleInputId) {
    triggerIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", () => {
          for (const inpId of inputIds) {
            const input = document.getElementById(inpId);
            if (input) {
              input.click();
              break;
            }
          }
        });
      }
    });

    inputIds.forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener("change", (e) => {
          if (e.target.files && e.target.files[0]) {
            handleRevealPhotoUpload(slotIndex, e.target.files[0]);
            e.target.value = "";
          }
        });
      }
    });

    removeIds.forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.addEventListener("click", async () => {
          currentRevealPhotos[slotIndex] = "";
          try {
            localStorage.setItem("birthday_reveal_photos_v1", JSON.stringify(currentRevealPhotos));
          } catch (_) {}
          updateAdminRevealCards();
          renderPhotoThumbnails();
          await saveAllBirthdayContentToSupabase();
          showStorageStatus("adminRevealStatus", `Photo #${slotIndex + 1} removed ❤️`, "success", 3000);
        });
      }
    });

    if (saveBtnId) {
      const saveBtn = document.getElementById(saveBtnId);
      if (saveBtn) {
        saveBtn.addEventListener("click", async () => {
          if (titleInputId) {
            const tInput = document.getElementById(titleInputId);
            if (tInput && tInput.value.trim()) {
              currentRevealTitles[slotIndex] = tInput.value.trim();
              if (slotIndex === 2) {
                burstConfig.revealThirdTitle = tInput.value.trim();
                const devThird = document.getElementById("devRevealThirdTitleInput");
                if (devThird) devThird.value = burstConfig.revealThirdTitle;
                saveBurstSettings();
              }
            }
          }
          showStorageStatus("adminRevealStatus", `Saving Reveal Photo #${slotIndex + 1}...`, "loading", 0);
          const saved = await saveAllBirthdayContentToSupabase();
          if (saved) {
            showStorageStatus("adminRevealStatus", `Reveal Photo #${slotIndex + 1} saved successfully! ❤️`, "success", 3500);
          } else {
            showStorageStatus("adminRevealStatus", `Supabase save failed: ${lastSupabaseError || "Database update rejected"}`, "error", 5000);
          }
        });
      }
    }
  }

  // Bind Slot 0 (Reveal Photo 1)
  setupRevealSlot(
    0,
    ["uploadRevealPhoto1", "changeRevealPhoto1Btn", "adminChangeRevealPhoto1"],
    ["revealPhotoInput1", "revealPhoto1Input", "adminRevealFileInput1"],
    ["removeRevealPhoto1Btn"],
    "saveRevealPhoto1Btn",
    "revealTitle1Input"
  );

  // Bind Slot 1 (Reveal Photo 2)
  setupRevealSlot(
    1,
    ["uploadRevealPhoto2", "changeRevealPhoto2Btn", "adminChangeRevealPhoto2"],
    ["revealPhotoInput2", "revealPhoto2Input", "adminRevealFileInput2"],
    ["removeRevealPhoto2Btn"],
    "saveRevealPhoto2Btn",
    "revealTitle2Input"
  );

  // Bind Slot 2 (Reveal Photo 3)
  setupRevealSlot(
    2,
    ["uploadRevealPhoto3", "changeRevealPhoto3Btn", "adminChangeRevealPhoto3"],
    ["revealPhotoInput3", "revealPhoto3Input", "adminRevealFileInput3"],
    ["removeRevealPhoto3Btn"],
    "saveRevealPhoto3Btn",
    "revealTitle3Input"
  );

  // Save All Reveal Sequence Button
  async function handleSaveAllReveal() {
    const t1 = document.getElementById("revealTitle1Input") || document.getElementById("adminRevealTitle1");
    const t2 = document.getElementById("revealTitle2Input") || document.getElementById("adminRevealTitle2");
    const t3 = document.getElementById("revealTitle3Input") || document.getElementById("adminRevealTitle3");

    if (t1 && t1.value.trim()) currentRevealTitles[0] = t1.value.trim();
    if (t2 && t2.value.trim()) currentRevealTitles[1] = t2.value.trim();
    if (t3 && t3.value.trim()) {
      currentRevealTitles[2] = t3.value.trim();
      burstConfig.revealThirdTitle = t3.value.trim();
      const devThird = document.getElementById("devRevealThirdTitleInput");
      if (devThird) devThird.value = burstConfig.revealThirdTitle;
      saveBurstSettings();
    }

    try {
      localStorage.setItem("birthday_reveal_titles_v1", JSON.stringify(currentRevealTitles));
    } catch (_) {}

    showStorageStatus("adminRevealStatus", "Saving reveal sequence to Supabase...", "loading", 0);
    const saved = await saveAllBirthdayContentToSupabase();
    if (saved) {
      showStorageStatus("adminRevealStatus", "Saved successfully ❤️ (Reveal Sequence updated)", "success", 4000);
    } else {
      showStorageStatus("adminRevealStatus", `Supabase save failed: ${lastSupabaseError || "Database update failed"}`, "error", 5000);
    }
  }

  const adminSaveAllRevealBtn = document.getElementById("adminSaveAllRevealBtn");
  if (adminSaveAllRevealBtn) adminSaveAllRevealBtn.addEventListener("click", handleSaveAllReveal);

  const saveAllRevealBtn = document.getElementById("saveAllRevealBtn");
  if (saveAllRevealBtn) saveAllRevealBtn.addEventListener("click", handleSaveAllReveal);

  const adminSaveRevealBtn = document.getElementById("adminSaveRevealBtn");
  if (adminSaveRevealBtn) adminSaveRevealBtn.addEventListener("click", handleSaveAllReveal);

  // Test Reveal Button
  const testRevealBtn = document.getElementById("adminTestRevealBtn");
  if (testRevealBtn) {
    testRevealBtn.addEventListener("click", () => {
      if (devModal) devModal.classList.remove("active");
      startRevealSequence();
    });
  }

  // --------------------------------------------------------------------------
  // 3. Background Tab Controls
  // --------------------------------------------------------------------------
  const changeBgBtn = document.getElementById("changeBgBtn") || document.getElementById("adminChangeBgBtn");
  const bgFileInput = document.getElementById("bgFileInput") || document.getElementById("adminBgFileInput");
  const resetBgBtn = document.getElementById("removeBgBtn") || document.getElementById("adminResetBgBtn");
  const saveBgBtn = document.getElementById("saveBgBtn");

  if (changeBgBtn && bgFileInput) {
    changeBgBtn.addEventListener("click", () => bgFileInput.click());

    bgFileInput.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      bgFileInput.value = "";

      showStorageStatus("bgUploadStatus", "Uploading background to Supabase Storage (photos/)...", "loading", 0);
      try {
        if (isCurrentUserAdmin()) {
          const uploadRes = await uploadToSupabaseStorage("photos", file);
          if (uploadRes.success && uploadRes.publicUrl) {
            currentBgImage = uploadRes.publicUrl;
          } else {
            currentBgImage = await readFileAsOptimizedDataURL(file);
          }
        } else {
          currentBgImage = await readFileAsOptimizedDataURL(file);
        }

        try { localStorage.setItem("birthday_bg_image_v1", currentBgImage); } catch (_) {}
        if (devBgInput) devBgInput.value = currentBgImage;

        setupBackground();
        updateAdminMediaCards();

        const saved = await saveAllBirthdayContentToSupabase({ background_url: currentBgImage });
        if (saved) {
          showStorageStatus("bgUploadStatus", "Saved successfully ❤️ (Background synced)", "success", 4500);
        } else {
          if (isCurrentUserAdmin()) {
            showStorageStatus("bgUploadStatus", `Background saved locally! Supabase error: ${lastSupabaseError || "Sync failed"}`, "error", 5000);
          } else {
            showStorageStatus("bgUploadStatus", "Background updated locally! (Sign in to sync online)", "loading", 4000);
          }
        }
      } catch (err) {
        console.error("Background upload failed:", err);
        showStorageStatus("bgUploadStatus", "Failed to upload background. Check connection.", "error", 4000);
      }
    });
  }

  if (resetBgBtn) {
    resetBgBtn.addEventListener("click", async () => {
      currentBgImage = "";
      try { localStorage.removeItem("birthday_bg_image_v1"); } catch (_) {}
      if (devBgInput) devBgInput.value = "";
      setupBackground();
      updateAdminMediaCards();
      await saveAllBirthdayContentToSupabase({ background_url: "" });
      showStorageStatus("bgUploadStatus", "Reset to festive default gradient! ❤️", "success", 3000);
    });
  }

  if (saveBgBtn) {
    saveBgBtn.addEventListener("click", async () => {
      if (devBgInput && devBgInput.value !== undefined) {
        currentBgImage = devBgInput.value.trim();
        try { localStorage.setItem("birthday_bg_image_v1", currentBgImage); } catch (_) {}
        setupBackground();
        updateAdminMediaCards();
      }
      showStorageStatus("bgUploadStatus", "Saving background...", "loading", 0);
      const saved = await saveAllBirthdayContentToSupabase({ background_url: currentBgImage });
      if (saved) {
        showStorageStatus("bgUploadStatus", "Background saved successfully! ❤️", "success", 3500);
      } else {
        if (isCurrentUserAdmin()) {
          showStorageStatus("bgUploadStatus", `Background saved locally! Supabase error: ${lastSupabaseError || "Sync failed"}`, "error", 5000);
        } else {
          showStorageStatus("bgUploadStatus", "Background saved locally! (Sign in to sync online)", "loading", 3500);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Music Tab Controls
  // --------------------------------------------------------------------------
  const changeMusicBtn = document.getElementById("changeMusicBtn") || document.getElementById("adminChangeMusicBtn");
  const musicFileInput = document.getElementById("audioFileInput") || document.getElementById("adminMusicFileInput");
  const testMusicBtn = document.getElementById("previewMusicBtn2") || document.getElementById("adminTestMusicBtn");
  const removeMusicBtn = document.getElementById("removeMusicBtn") || document.getElementById("adminRemoveMusicBtn");
  const saveMusicBtn = document.getElementById("saveMusicBtn");

  if (changeMusicBtn && musicFileInput) {
    changeMusicBtn.addEventListener("click", () => musicFileInput.click());

    musicFileInput.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      musicFileInput.value = "";

      showStorageStatus("musicUploadStatus", "Uploading audio to Supabase Storage (music/)...", "loading", 0);
      try {
        if (isCurrentUserAdmin()) {
          const uploadRes = await uploadToSupabaseStorage("music", file);
          if (uploadRes.success && uploadRes.publicUrl) {
            currentMusicUrl = uploadRes.publicUrl;
          } else {
            currentMusicUrl = URL.createObjectURL(file);
          }
        } else {
          currentMusicUrl = URL.createObjectURL(file);
        }

        try { localStorage.setItem("birthday_custom_music_v1", currentMusicUrl); } catch (_) {}
        if (devMusicInput) devMusicInput.value = currentMusicUrl;

        if (bgAudio) {
          bgAudio.src = currentMusicUrl;
          playMusic();
        }

        updateAdminMediaCards();

        const saved = await saveAllBirthdayContentToSupabase({ music_url: currentMusicUrl });
        if (saved) {
          showStorageStatus("musicUploadStatus", "Saved successfully ❤️ (Music synced with Supabase)", "success", 4500);
        } else {
          if (isCurrentUserAdmin()) {
            showStorageStatus("musicUploadStatus", `Music saved locally! Supabase error: ${lastSupabaseError || "Sync failed"}`, "error", 5000);
          } else {
            showStorageStatus("musicUploadStatus", "Music updated locally! (Sign in to sync online)", "loading", 4000);
          }
        }
      } catch (err) {
        console.error("Music upload failed:", err);
        showStorageStatus("musicUploadStatus", "Failed to upload music track. Check connection.", "error", 4000);
      }
    });
  }

  if (testMusicBtn) {
    testMusicBtn.addEventListener("click", () => {
      toggleMusic();
      testMusicBtn.textContent = isMusicPlaying ? "⏸ Pause Audio" : "▶ Play Audio";
    });
  }

  if (removeMusicBtn) {
    removeMusicBtn.addEventListener("click", async () => {
      currentMusicUrl = "";
      try { localStorage.removeItem("birthday_custom_music_v1"); } catch (_) {}
      if (bgAudio) {
        bgAudio.pause();
        bgAudio.src = "";
      }
      if (devMusicInput) devMusicInput.value = "";
      updateAdminMediaCards();
      await saveAllBirthdayContentToSupabase({ music_url: "" });
      showStorageStatus("musicUploadStatus", "Music removed (muted) ❤️", "success", 3000);
    });
  }

  if (saveMusicBtn) {
    saveMusicBtn.addEventListener("click", async () => {
      if (devMusicInput && devMusicInput.value !== undefined) {
        currentMusicUrl = devMusicInput.value.trim();
        try { localStorage.setItem("birthday_custom_music_v1", currentMusicUrl); } catch (_) {}
        if (bgAudio) bgAudio.src = currentMusicUrl;
        updateAdminMediaCards();
      }
      showStorageStatus("musicUploadStatus", "Saving audio configuration...", "loading", 0);
      const saved = await saveAllBirthdayContentToSupabase({ music_url: currentMusicUrl });
      if (saved) {
        showStorageStatus("musicUploadStatus", "Music saved successfully! ❤️", "success", 3500);
      } else {
        if (isCurrentUserAdmin()) {
          showStorageStatus("musicUploadStatus", `Music saved locally! Supabase error: ${lastSupabaseError || "Sync failed"}`, "error", 5000);
        } else {
          showStorageStatus("musicUploadStatus", "Music saved locally! (Sign in to sync online)", "loading", 3500);
        }
      }
    });
  }
}

// ============================================================================
// PHOTO STORAGE (INDEXEDDB WITH LOCALSTORAGE FALLBACK)
// ============================================================================
const DB_NAME = "BirthdayCelebrationDB";
const DB_VERSION = 1;
const PHOTO_STORE = "celebration_photos";

function openPhotoDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null); // Fallback to localStorage
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(PHOTO_STORE)) {
        db.createObjectStore(PHOTO_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

async function initPhotoStorageAndBurstSettings() {
  // 1. Load Burst Config from localStorage
  try {
    const savedConfig = localStorage.getItem("birthday_burst_settings_v1");
    if (savedConfig) {
      burstConfig = Object.assign(burstConfig, JSON.parse(savedConfig));
    }
  } catch (err) {
    console.warn("Could not load burst settings from localStorage:", err);
  }

  // Sync inputs with burstConfig
  syncInputsWithBurstConfig();

  // 2. Load Photos from IndexedDB or LocalStorage
  const db = await openPhotoDB();
  if (db) {
    try {
      const tx = db.transaction(PHOTO_STORE, "readonly");
      const store = tx.objectStore(PHOTO_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        if (req.result && req.result.length > 0) {
          currentPhotos = req.result;
        } else {
          // Seed with default high quality photos
          currentPhotos = [...defaultBurstPhotos];
          seedDefaultPhotosToDB(db, currentPhotos);
        }
        renderPhotoThumbnails();
      };
      req.onerror = () => {
        fallbackLoadLocalStoragePhotos();
      };
    } catch {
      fallbackLoadLocalStoragePhotos();
    }
  } else {
    fallbackLoadLocalStoragePhotos();
  }

  applyGradientPreset(burstConfig.gradientPreset || "dusk");
  applyThemeIntensities();
}

function fallbackLoadLocalStoragePhotos() {
  try {
    const raw = localStorage.getItem("birthday_burst_photos_v1");
    if (raw) {
      currentPhotos = JSON.parse(raw);
    } else {
      currentPhotos = [...defaultBurstPhotos];
      localStorage.setItem("birthday_burst_photos_v1", JSON.stringify(currentPhotos));
    }
  } catch {
    currentPhotos = [...defaultBurstPhotos];
  }
  renderPhotoThumbnails();
}

function seedDefaultPhotosToDB(db, photos) {
  try {
    const tx = db.transaction(PHOTO_STORE, "readwrite");
    const store = tx.objectStore(PHOTO_STORE);
    photos.forEach(p => store.put(p));
  } catch (e) {
    console.warn("Could not seed IndexedDB photos:", e);
  }
}

function saveBurstSettings() {
  try {
    localStorage.setItem("birthday_burst_settings_v1", JSON.stringify(burstConfig));
  } catch (e) {
    console.warn("Could not save burst config:", e);
  }
}

function syncInputsWithBurstConfig() {
  if (burstStyleSelect) burstStyleSelect.value = burstConfig.burstStyle;
  if (photoShapeSelect) photoShapeSelect.value = burstConfig.photoShape;
  if (photoSizeSelect) photoSizeSelect.value = burstConfig.photoSize;
  if (burstSpeedSelect) burstSpeedSelect.value = burstConfig.burstSpeed;
  if (burstDurationSelect) burstDurationSelect.value = burstConfig.burstDuration;
  if (photoRotationSelect) photoRotationSelect.value = burstConfig.photoRotation;
  if (photoBorderColorSelect) photoBorderColorSelect.value = burstConfig.photoBorderColor;
  if (photoBorderThicknessSelect) photoBorderThicknessSelect.value = burstConfig.photoBorderThickness;
  if (photoCornerRadiusInput) photoCornerRadiusInput.value = burstConfig.photoCornerRadius;
  if (photoGlowIntensityInput) photoGlowIntensityInput.value = burstConfig.photoGlowIntensity;
  if (confettiAmountSelect) confettiAmountSelect.value = burstConfig.confettiAmount;
  if (confettiSpeedSelect) confettiSpeedSelect.value = burstConfig.confettiSpeed;
  if (devHeadlineInput) devHeadlineInput.value = burstConfig.headline;
  if (devRevealThirdTitleInput) devRevealThirdTitleInput.value = burstConfig.revealThirdTitle || "MY EVERYTHING ❤️";
  if (bgGradientPresetSelect) bgGradientPresetSelect.value = burstConfig.gradientPreset;
  if (colorPinkIntensity) colorPinkIntensity.value = burstConfig.colorPinkIntensity;
  if (colorBlueIntensity) colorBlueIntensity.value = burstConfig.colorBlueIntensity;
  if (colorPurpleIntensity) colorPurpleIntensity.value = burstConfig.colorPurpleIntensity;
}

// Render Thumbnail Gallery in Customize Panel
function renderPhotoThumbnails() {
  if (panelPhotoCount) panelPhotoCount.textContent = String(currentPhotos.length);
  if (!photoThumbnailsGrid) return;

  photoThumbnailsGrid.innerHTML = "";

  if (currentPhotos.length === 0) {
    photoThumbnailsGrid.innerHTML = `
      <div class="thumb-card-empty">
        <p>📷 No celebration photos uploaded yet.</p>
        <p style="font-size: 0.8rem; margin-top: 0.35rem; color: rgba(255,255,255,0.7);">
          Click <strong>"+ Add Photos"</strong> to upload memories, or click <strong>"Load Sample Photos"</strong> to restore the festive presets!
        </p>
      </div>
    `;
    return;
  }

  currentPhotos.forEach((photo, index) => {
    const card = document.createElement("div");
    card.className = "thumb-card";

    // Badges for top 3 main hero cards that pin for 5 seconds
    let badgeHtml = "";
    if (index === 0) badgeHtml = `<span class="thumb-badge">★ #1 Hero (Pinned)</span>`;
    else if (index === 1) badgeHtml = `<span class="thumb-badge">★ #2 Hero (Pinned)</span>`;
    else if (index === 2) badgeHtml = `<span class="thumb-badge">★ #3 Hero (Pinned)</span>`;

    card.innerHTML = `
      <img src="${photo.src}" class="thumb-img" alt="${photo.name || 'Photo'}" loading="lazy" />
      ${badgeHtml}
      <button type="button" class="thumb-remove-btn" title="Remove photo" aria-label="Remove photo">&times;</button>
    `;

    // Click photo to preview in lightbox
    const imgEl = card.querySelector(".thumb-img");
    imgEl.addEventListener("click", () => {
      openLightbox(photo.src, photo.caption || photo.name || "Celebration Photo");
    });

    // Remove photo button
    const removeBtn = card.querySelector(".thumb-remove-btn");
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePhoto(photo.id);
    });

    photoThumbnailsGrid.appendChild(card);
  });
}

// Photo file processing with Supabase Storage upload
async function handlePhotoFiles(files) {
  if (!isCurrentUserAdmin()) {
    openAdminLoginForm("🔒 Admin sign-in required to upload photos to Supabase Storage.");
    return;
  }

  const validFiles = Array.from(files).filter(f => f.type && f.type.startsWith("image/"));
  if (validFiles.length === 0) return;

  showStorageStatus(
    "photoUploadStatus",
    `Uploading ${validFiles.length} photo(s) to Supabase Storage (photos/)...`,
    "loading",
    0
  );

  let successCount = 0;
  let rlsNotice = false;

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i];
    showStorageStatus(
      "photoUploadStatus",
      `Uploading photo ${i + 1} of ${validFiles.length} to photos/...`,
      "loading",
      0
    );

    try {
      // 1. Upload to Supabase Storage bucket 'Birthday-assets' under photos/
      const uploadRes = await uploadToSupabaseStorage("photos", file);
      
      let photoSrc = "";
      let photoName = file.name;
      let isRemote = false;

      if (uploadRes.success) {
        photoSrc = uploadRes.publicUrl;
        photoName = uploadRes.fileName || file.name;
        isRemote = true;
        successCount++;
      } else {
        if (uploadRes.error && uploadRes.error.toLowerCase().includes("row-level security")) {
          rlsNotice = true;
        }
        // Fallback to local optimized DataURL preview if upload failed so user experience is smooth
        photoSrc = await readFileAsOptimizedDataURL(file);
      }

      const newPhoto = {
        id: "photo-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        name: photoName,
        src: photoSrc,
        caption: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        timestamp: Date.now(),
        fromSupabase: isRemote
      };

      currentPhotos.push(newPhoto);
      await savePhotoRecord(newPhoto);
    } catch (err) {
      console.error("Failed processing photo file:", err);
    }
  }

  renderPhotoThumbnails();

  if (isCurrentUserAdmin()) {
    saveAllBirthdayContentToSupabase();
  }

  if (successCount > 0) {
    showStorageStatus(
      "photoUploadStatus",
      `Saved successfully ❤️ (${successCount} photo${successCount > 1 ? "s" : ""} in Supabase Storage)`,
      "success",
      5000
    );
  } else if (rlsNotice) {
    showStorageStatus(
      "photoUploadStatus",
      "Saved locally! (Note: Enable INSERT policy on bucket 'Birthday-assets' in Supabase Storage for online sync)",
      "error",
      8000
    );
  } else {
    showStorageStatus("photoUploadStatus", "Saved locally in browser cache ❤️", "success", 4000);
  }
}

function readFileAsOptimizedDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Max dimension 1000px for optimal speed and storage safety
        const maxDim = 1000;
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
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function savePhotoRecord(photo) {
  const db = await openPhotoDB();
  if (db) {
    try {
      const tx = db.transaction(PHOTO_STORE, "readwrite");
      tx.objectStore(PHOTO_STORE).put(photo);
    } catch {
      // Fallback
    }
  }
  try {
    localStorage.setItem("birthday_burst_photos_v1", JSON.stringify(currentPhotos));
  } catch {
    // If storage quota exceeded in localStorage, IndexedDB still holds the record
  }
}

async function deletePhoto(id) {
  const target = currentPhotos.find(p => p.id === id);
  if (target && target.fromSupabase && !isCurrentUserAdmin()) {
    openAdminLoginForm("🔒 Admin sign-in required to delete online celebration photos.");
    return;
  }

  currentPhotos = currentPhotos.filter(p => p.id !== id);
  renderPhotoThumbnails();

  // If photo was stored in Supabase Storage, attempt remote deletion as well
  if (target && target.name && target.fromSupabase && isCurrentUserAdmin()) {
    try {
      const client = getSupabaseClient();
      if (client && client.storage) {
        client.storage.from(SUPABASE_STORAGE_BUCKET).remove([`photos/${target.name}`]).catch(() => {});
      }
    } catch (_) {}
  }

  const db = await openPhotoDB();
  if (db) {
    try {
      const tx = db.transaction(PHOTO_STORE, "readwrite");
      tx.objectStore(PHOTO_STORE).delete(id);
    } catch {
      // Ignore
    }
  }
  try {
    localStorage.setItem("birthday_burst_photos_v1", JSON.stringify(currentPhotos));
  } catch {}

  if (!isInitialSupabaseLoading && isCurrentUserAdmin()) {
    saveAllBirthdayContentToSupabase();
  }
}

async function clearAllPhotos() {
  currentPhotos = [];
  renderPhotoThumbnails();

  const db = await openPhotoDB();
  if (db) {
    try {
      const tx = db.transaction(PHOTO_STORE, "readwrite");
      tx.objectStore(PHOTO_STORE).clear();
    } catch {}
  }
  try {
    localStorage.removeItem("birthday_burst_photos_v1");
  } catch {}

  if (!isInitialSupabaseLoading && isCurrentUserAdmin()) {
    saveAllBirthdayContentToSupabase();
  }
}

async function loadSamplePhotos() {
  currentPhotos = [...defaultBurstPhotos];
  renderPhotoThumbnails();

  const db = await openPhotoDB();
  if (db) {
    seedDefaultPhotosToDB(db, currentPhotos);
  }
  try {
    localStorage.setItem("birthday_burst_photos_v1", JSON.stringify(currentPhotos));
  } catch {}
}

// Apply Color Atmosphere Presets
function applyGradientPreset(preset) {
  const root = document.documentElement;
  switch (preset) {
    case "sunset":
      root.style.setProperty("--color-pink-primary", "#ff1e78");
      root.style.setProperty("--color-blue-primary", "#9333ea");
      root.style.setProperty("--color-blue-deep", "#3b0764");
      break;
    case "cyber":
      root.style.setProperty("--color-pink-primary", "#ff007f");
      root.style.setProperty("--color-blue-primary", "#00ffff");
      root.style.setProperty("--color-blue-deep", "#0a0a23");
      break;
    case "pastel":
      root.style.setProperty("--color-pink-primary", "#f472b6");
      root.style.setProperty("--color-blue-primary", "#60a5fa");
      root.style.setProperty("--color-blue-deep", "#1e293b");
      break;
    case "midnight":
      root.style.setProperty("--color-pink-primary", "#e11d48");
      root.style.setProperty("--color-blue-primary", "#6366f1");
      root.style.setProperty("--color-blue-deep", "#09090b");
      break;
    case "dusk":
    default:
      root.style.setProperty("--color-pink-primary", "#ff2a7a");
      root.style.setProperty("--color-blue-primary", "#00d2ff");
      root.style.setProperty("--color-blue-deep", "#0e1533");
      break;
  }
}

function applyThemeIntensities() {
  const root = document.documentElement;
  const p = burstConfig.colorPinkIntensity || 1.0;
  const b = burstConfig.colorBlueIntensity || 1.0;
  root.style.setProperty("--pink-intensity", String(p));
  root.style.setProperty("--blue-intensity", String(b));
}

// ============================================================================
// PHOTO BURST ENGINE (Burst outward from center, rotate, scale, and glow)
// ============================================================================

function stopPhotoBurst() {
  if (photoBurstActiveTimeout) {
    clearTimeout(photoBurstActiveTimeout);
    photoBurstActiveTimeout = null;
  }
  if (heroPhotosTimerTimeout) {
    clearTimeout(heroPhotosTimerTimeout);
    heroPhotosTimerTimeout = null;
  }
  if (photoBurstOverlay) {
    photoBurstOverlay.innerHTML = "";
    photoBurstOverlay.classList.remove("active");
  }
}

function triggerPhotoBurst() {
  stopPhotoBurst();

  // If no photos have been uploaded or loaded, skip photo animation and let confetti shine alone
  if (!currentPhotos || currentPhotos.length === 0) {
    if (heroPhotosPinnedContainer) {
      heroPhotosPinnedContainer.style.display = "none";
    }
    return;
  }

  if (!photoBurstOverlay) return;
  photoBurstOverlay.classList.add("active");

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Decide photos to display
  let photosToDisplay = [...currentPhotos];
  // If user only uploaded 1 or 2 photos, clone to make a balanced festive burst of at least 4 items
  if (photosToDisplay.length === 1) {
    photosToDisplay = [photosToDisplay[0], photosToDisplay[0], photosToDisplay[0], photosToDisplay[0]];
  } else if (photosToDisplay.length === 2) {
    photosToDisplay = [photosToDisplay[0], photosToDisplay[1], photosToDisplay[0], photosToDisplay[1]];
  }

  const count = photosToDisplay.length;

  // Speed mapping
  let speedDurationSec = 1.2;
  if (burstConfig.burstSpeed === "slow") speedDurationSec = 1.8;
  else if (burstConfig.burstSpeed === "fast") speedDurationSec = 0.8;
  else if (burstConfig.burstSpeed === "explosive") speedDurationSec = 0.5;

  // Rotation ranges
  let maxRotation = 25;
  if (burstConfig.photoRotation === "none") maxRotation = 0;
  else if (burstConfig.photoRotation === "subtle") maxRotation = 12;
  else if (burstConfig.photoRotation === "wild") maxRotation = 45;

  // Size mapping
  let sizePx = 180;
  if (burstConfig.photoSize === "small") sizePx = Math.min(vw * 0.35, 130);
  else if (burstConfig.photoSize === "large") sizePx = Math.min(vw * 0.5, 230);
  else sizePx = Math.min(vw * 0.42, 180);

  // Distribute burst items in a balanced outward spiral from screen center
  photosToDisplay.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "burst-photo-item";

    // Shape assignment
    let shape = burstConfig.photoShape;
    if (shape === "mixed") {
      const shapes = ["polaroid", "rounded", "circle", "square"];
      shape = shapes[index % shapes.length];
    }
    item.classList.add(`shape-${shape}`);

    // Border glow assignment
    const borderTheme = burstConfig.photoBorderColor || "gradient";
    item.classList.add(`border-glow-${borderTheme}`);

    // Dimensions
    item.style.width = `${sizePx}px`;
    item.style.height = shape === "circle" ? `${sizePx}px` : `${Math.round(sizePx * 1.25)}px`;

    // Position & angle math: outward burst from (50vw, 50vh)
    const angle = (index / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
    const minRadius = Math.min(vw, vh) * 0.22;
    const maxRadius = Math.min(vw, vh) * 0.44;
    const radius = minRadius + (index % 2) * (maxRadius - minRadius) * 0.85 + (Math.random() - 0.5) * 40;

    const targetX = Math.round(Math.cos(angle) * radius);
    const targetY = Math.round(Math.sin(angle) * radius);
    const targetRot = Math.round((Math.random() - 0.5) * 2 * maxRotation);

    const floatDx = Math.round((Math.random() - 0.5) * 35);
    const floatDy = Math.round((Math.random() - 0.5) * 35);

    // CSS variables for keyframes
    item.style.setProperty("--target-x", `${targetX}px`);
    item.style.setProperty("--target-y", `${targetY}px`);
    item.style.setProperty("--target-rot", `${targetRot}deg`);
    item.style.setProperty("--float-dx", `${floatDx}px`);
    item.style.setProperty("--float-dy", `${floatDy}px`);
    item.style.setProperty("--burst-border-width", `${burstConfig.photoBorderThickness || 2}px`);
    item.style.setProperty("--burst-radius", `${burstConfig.photoCornerRadius || 16}px`);
    item.style.setProperty("--burst-glow", `${burstConfig.photoGlowIntensity || 0.8}`);

    // Place element in the exact viewport center
    item.style.left = "50vw";
    item.style.top = "50vh";

    // Style animation
    let animName = "photoBurstOut";
    const userStyle = burstConfig.burstStyle;
    if (userStyle === "float") animName = "photoFloatGentle";
    else if (userStyle === "fall") animName = "photoFallDown";
    else if (userStyle === "pop") animName = "photoPopIn";
    else if (userStyle === "mixed") {
      const anims = ["photoBurstOut", "photoFloatGentle", "photoPopIn", "photoFallDown"];
      animName = anims[index % anims.length];
    }

    const staggerDelay = index * 0.08;
    item.style.animation = `${animName} ${speedDurationSec}s cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}s forwards, photoFloatGentle 4s ease-in-out ${speedDurationSec + staggerDelay}s infinite alternate`;

    // Inner Image
    item.innerHTML = `<img src="${photo.src}" class="burst-photo-img" alt="${photo.name || 'Photo'}" />`;

    // Click to view in Lightbox
    item.addEventListener("click", () => {
      openLightbox(photo.src, photo.caption || photo.name || "Birthday Memory");
    });

    photoBurstOverlay.appendChild(item);
  });

  // Display 3 Main Hero Photos (Pastes on screen for 5s after burst, then settles)
  showHeroPinnedPhotos();

  // Overlay duration
  if (burstConfig.burstDuration !== "infinite") {
    const durSec = parseInt(burstConfig.burstDuration, 10) || 12;
    photoBurstActiveTimeout = setTimeout(() => {
      if (photoBurstOverlay) {
        photoBurstOverlay.style.transition = "opacity 1.5s ease";
        photoBurstOverlay.style.opacity = "0";
        setTimeout(() => {
          photoBurstOverlay.innerHTML = "";
          photoBurstOverlay.style.opacity = "1";
          photoBurstOverlay.style.transition = "";
          photoBurstOverlay.classList.remove("active");
        }, 1500);
      }
    }, durSec * 1000);
  }
}

// ============================================================================
// PINNED 3 MAIN HERO PHOTOS (Pastes on screen for 5 seconds after burst)
// ============================================================================
function showHeroPinnedPhotos() {
  if (!heroPhotosPinnedContainer || !heroPhotosPinnedCards) return;

  // Pick top 3 hero photos (from currentPhotos or fallback)
  const threePhotos = getThreeHeroPhotos();
  if (!threePhotos || threePhotos.length === 0) return;

  // Reset container state
  heroPhotosPinnedContainer.classList.remove("settled");
  heroPhotosPinnedContainer.style.display = "block";

  heroPhotosPinnedCards.innerHTML = "";

  const roles = ["hero-left", "hero-center", "hero-right"];
  const badges = ["✨ My Favorite Smile", "❤️ The One I Adore ✨", "🥰 Forever With You"];

  threePhotos.forEach((photoUrl, idx) => {
    const card = document.createElement("div");
    card.className = `hero-pinned-card ${roles[idx]}`;
    card.innerHTML = `
      <img src="${photoUrl}" class="hero-pinned-img" alt="Hero Photo" />
      <span class="hero-pinned-badge">${badges[idx]}</span>
    `;

    // Click opens Lightbox
    card.addEventListener("click", () => {
      openLightbox(photoUrl, badges[idx]);
    });

    heroPhotosPinnedCards.appendChild(card);
  });

  // Re-trigger the 5-second shrink animation on timer bar
  if (heroTimerProgress) {
    heroTimerProgress.style.animation = "none";
    // Trigger reflow
    void heroTimerProgress.offsetWidth;
    heroTimerProgress.style.animation = "heroTimerShrink 5s linear forwards";
  }

  // After 5 seconds, paste settles smoothly into the celebration layout
  if (heroPhotosTimerTimeout) clearTimeout(heroPhotosTimerTimeout);
  heroPhotosTimerTimeout = setTimeout(() => {
    if (heroPhotosPinnedContainer) {
      heroPhotosPinnedContainer.classList.add("settled");
    }
  }, 5000);
}

// ============================================================================
// CHAPTER 4 — THE BIRTHDAY EXPERIENCE FINALE: 2D/2.5D FLAT GLOWING PARTICLE-BURST HEART
// ============================================================================

let finaleCanvasEl = null;
let finaleCtx = null;
let finaleAnimId = null;
let finaleResizeObserver = null;

// Interaction & Parallax State
let finaleTiltX = 0; // -1 to 1 horizontal tilt
let finaleTiltY = 0; // -1 to 1 vertical tilt
let finaleTargetTiltX = 0;
let finaleTargetTiltY = 0;
let finaleTiltVelX = 0;
let finaleTiltVelY = 0;
let finaleIsDragging = false;
let finaleDragStart = { x: 0, y: 0 };
let finalePrevPointer = { x: 0, y: 0 };
let finaleTotalDragDistance = 0;
let finaleLastInteractionTime = Date.now();
let finaleTapPulseProgress = 0; // 0 to 1 bump for tap reaction

// ============================================================================
// CHAPTER 4 — EXTRA: 3D PARTICLE HEART & GLOWING PLATFORM SIMULATION
// ============================================================================

let extra3DAnimId = null;
let extra3DParticles = [];
let extra3DPortalSparks = [];
let extra3DRotY = 0;
let extra3DRotX = 0;
let extra3DTargetRotY = 0;
let extra3DTargetRotX = 0;
let extra3DRotVelY = 0.005;
let extra3DRotVelX = 0;
let extra3DIsDragging = false;
let extra3DPrevMouseX = 0;
let extra3DPrevMouseY = 0;
let extra3DLastInteraction = performance.now();
let extra3DResizeListener = null;
let extra3DPointersAttached = false;
let extra3DCanvas = null;
let extra3DCtx = null;

function resetPortalSpark(index, initial) {
  const angle = Math.random() * Math.PI * 2;
  const radius = Math.random() * 90;
  extra3DPortalSparks[index] = {
    x: Math.cos(angle) * radius,
    y: (initial ? Math.random() * 100 : 0) + 120, // starts at platform level
    z: Math.sin(angle) * (radius * 0.35),
    vy: -(Math.random() * 1.8 + 0.9), // rising upward towards heart
    vx: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.6 + 0.4,
    size: Math.random() * 1.6 + 0.6,
    life: Math.random() * 60 + 40
  };
}

function createExtra3DHeartParticles() {
  const baseCount = window.innerWidth < 640 ? 1200 : 2100;
  const particleCount = Math.round(baseCount * 1.30);
  const sparkCount = 38;
  extra3DParticles = [];

  for (let i = 0; i < particleCount; i++) {
    let t;
    const angleBias = Math.random();
    if (angleBias < 0.28) {
      t = Math.PI + (Math.random() - 0.5) * 0.65;
    } else if (angleBias < 0.54) {
      t = (Math.random() > 0.5 ? 0 : Math.PI * 2) + (Math.random() - 0.5) * 0.75;
    } else {
      t = Math.random() * Math.PI * 2;
    }

    const x0 = 16 * Math.pow(Math.sin(t), 3);
    const y0 = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const normY = (y0 + 17) / 29;
    const maxThickness = Math.sin(normY * Math.PI) * 8.5 * Math.pow(Math.max(0, 1 - normY * 0.62), 0.72);
    const isOuterShell = (i % 100) < 78;
    const shellFactor = isOuterShell
      ? (0.92 + Math.random() * 0.08)
      : (0.42 + Math.pow(Math.random(), 0.75) * 0.46);

    const zAngle = (Math.random() - 0.5) * Math.PI;
    const x = x0 * shellFactor;
    const y = y0 * shellFactor;
    const z = Math.sin(zAngle) * maxThickness * (isOuterShell ? 0.94 : shellFactor);

    const twinkleSpeed = Math.random() * 0.04 + 0.02;
    const twinklePhase = Math.random() * Math.PI * 2;
    const size = isOuterShell ? (Math.random() * 1.5 + 0.9) : (Math.random() * 1.2 + 0.6);

    // EXACTLY 27% PINK, 73% CYAN/BLUE
    const isPink = (i % 100) < 27;
    let r, g, b;
    if (isPink) {
      const pinkTone = Math.random();
      if (pinkTone > 0.72) {
        r = 255; g = 205; b = 235;
      } else if (pinkTone > 0.35) {
        r = 255; g = 42; b = 132;
      } else {
        r = 255; g = 78; b = 168;
      }
    } else {
      const blueTone = Math.random();
      if (blueTone > 0.75) {
        r = 190; g = 245; b = 255;
      } else if (blueTone < 0.28) {
        r = 0; g = 110; b = 255;
      } else {
        r = 0; g = 217; b = 255;
      }
    }

    extra3DParticles.push({
      origX: x,
      origY: y,
      origZ: z,
      x: x,
      y: y,
      z: z,
      size: size,
      r: r,
      g: g,
      b: b,
      baseAlpha: isOuterShell ? (Math.random() * 0.35 + 0.65) : (Math.random() * 0.35 + 0.45),
      alpha: 1,
      twinkleSpeed: twinkleSpeed,
      twinklePhase: twinklePhase
    });
  }

  extra3DPortalSparks = [];
  for (let i = 0; i < sparkCount; i++) {
    resetPortalSpark(i, true);
  }
}

function resizeExtra3DCanvas() {
  if (!extra3DCanvas || !extra3DCtx) return;
  const container = document.getElementById("finale3DHeartContainer");
  const rect = extra3DCanvas.getBoundingClientRect();
  const width = rect.width || (container ? container.clientWidth : 0) || Math.min(window.innerWidth - 32, 600);
  const height = rect.height || (container ? container.clientHeight : 0) || 420;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  extra3DCanvas.width = width * dpr;
  extra3DCanvas.height = height * dpr;
  extra3DCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function disposeFinaleThreeScene() {
  if (typeof window.stop3DExtraHeartScene === "function") {
    window.stop3DExtraHeartScene();
  }
}

function initFinaleScene() {
  if (typeof window.start3DExtraHeartScene === "function") {
    window.start3DExtraHeartScene();
    return;
  }
  const canvas = document.getElementById("heartCanvas") || document.getElementById("finaleCanvas");
  const container = document.getElementById("finale3DHeartContainer");
  if (!canvas || !container) return;

  // Clean up any existing instances
  disposeFinaleThreeScene();

  finaleCanvasEl = canvas;
  finaleCtx = canvas.getContext("2d", { alpha: true });
  if (!finaleCtx) return;

  // Setup HiDPI Canvas
  finaleOnWindowResize();
  window.addEventListener("resize", finaleOnWindowResize, { passive: true });

  const containerW = container.clientWidth || 540;
  const containerH = container.clientHeight || 400;
  const heartCenterX = containerW / 2;
  const heartCenterY = containerH * 0.48;

  // 1. GENERATE BACKGROUND TWINKLING STARFIELD
  const starCount = 140;
  finaleStars = [];
  for (let i = 0; i < starCount; i++) {
    finaleStars.push({
      x: Math.random() * containerW,
      y: Math.random() * containerH,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.7 + 0.2,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      phase: Math.random() * Math.PI * 2,
      depthLayer: Math.random() * 0.3 + 0.05, // deep background parallax
      color: Math.random() > 0.4 ? "rgba(0, 240, 255," : "rgba(255, 140, 200,"
    });
  }

  // 2. GENERATE FLAT HEART PARTICLE POSITIONS (Parametric Heart Curve Fireworks Burst)
  // Parametric heart formula:
  // x = 16 * sin^3(t)
  // y = -(13*cos(t) - 5*cos(2t) - 2*cos(3t) - cos(4t)) (inverted for screen coordinates)
  const isMobile = window.innerWidth < 640;
  const heartScale = isMobile ? 8.2 : 11.2;
  const particleCount = isMobile ? 950 : 1600;
  finaleParticles = [];

  for (let i = 0; i < particleCount; i++) {
    const t = Math.random() * Math.PI * 2;
    // Base parametric coordinates
    const rawX = 16 * Math.pow(Math.sin(t), 3);
    const rawY = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

    // Fill distribution: heavy concentration near perimeter outline (fireworks shell),
    // with soft interior dusting
    const fillBias = Math.random();
    const r = fillBias > 0.35 ? 1.0 - Math.pow(Math.random(), 3.5) * 0.22 : Math.pow(Math.random(), 0.5);

    // Target coordinates on flat heart silhouette
    const targetX = heartCenterX + rawX * heartScale * r + (Math.random() - 0.5) * 6;
    const targetY = heartCenterY + (rawY * heartScale * r) + (Math.random() - 0.5) * 6;

    // Outward burst trajectory from center point
    const angleFromCenter = Math.atan2(targetY - heartCenterY, targetX - heartCenterX);
    const burstSpeed = Math.random() * 4.5 + 2.5;

    // Depth layer for 2.5D parallax tilt (0.7 to 1.35)
    // Deeper particles shift differently on tilt
    const depthLayer = 0.75 + (r * 0.35) + ((Math.random() - 0.5) * 0.4);

    // Color gradient across height (y): Cyan-blue at core/bottom (#00f0ff, #00b4d8),
    // radiant magenta/pink (#ff2a7a, #ff70a6) towards upper curved lobes
    const normHeight = 1 - (targetY - (heartCenterY - 16 * heartScale)) / (32 * heartScale);
    let rCol = 0, gCol = 240, bCol = 255; // default electric cyan
    if (normHeight > 0.45) {
      // blend to radiant magenta-pink
      const blend = Math.min((normHeight - 0.45) / 0.5, 1.0);
      rCol = Math.round(0 + 255 * blend);
      gCol = Math.round(240 - 198 * blend);
      bCol = Math.round(255 - 133 * blend);
    }

    finaleParticles.push({
      targetX: targetX,
      targetY: targetY,
      // Fireworks burst initial position at central origin
      currentX: heartCenterX + (Math.random() - 0.5) * 12,
      currentY: heartCenterY + (Math.random() - 0.5) * 12,
      velX: Math.cos(angleFromCenter) * burstSpeed,
      velY: Math.sin(angleFromCenter) * burstSpeed,
      burstProgress: 0, // 0 to 1 as it bursts outward and settles
      burstDelay: Math.random() * 25, // staggered burst frames
      size: Math.random() * 2.2 + 1.2,
      glowRadius: Math.random() * 7 + 4,
      r: rCol,
      g: gCol,
      b: bCol,
      baseAlpha: Math.random() * 0.45 + 0.55,
      alpha: 0,
      twinkleSpeed: Math.random() * 0.05 + 0.02,
      twinklePhase: Math.random() * Math.PI * 2,
      depthLayer: depthLayer,
      bloomOffX: 0,
      bloomOffY: 0,
      bloomAlphaBoost: 0,
      // Wispy trail emitter probability (from lower heart edges/taper)
      isTrailEmitter: (rawY > 4 && r > 0.75 && Math.random() < 0.18)
    });
  }

  // 3. PRE-COMPUTE CONSTELLATION WEB THREADS
  // Connect select pairs of nearby particles
  finaleConstellationLines = [];
  const subsetCount = Math.min(finaleParticles.length, 280);
  const maxDistSq = (isMobile ? 26 : 34) * (isMobile ? 26 : 34);

  for (let i = 0; i < subsetCount; i++) {
    for (let j = i + 1; j < subsetCount; j++) {
      const dx = finaleParticles[i].targetX - finaleParticles[j].targetX;
      const dy = finaleParticles[i].targetY - finaleParticles[j].targetY;
      const distSq = dx * dx + dy * dy;
      if (distSq < maxDistSq) {
        finaleConstellationLines.push({
          pA: finaleParticles[i],
          pB: finaleParticles[j],
          maxDist: Math.sqrt(maxDistSq)
        });
        if (finaleConstellationLines.length >= 240) break;
      }
    }
    if (finaleConstellationLines.length >= 240) break;
  }

  // 4. INTERACTION LISTENERS (Drag-to-tilt, touch swipe, inertia, auto-drift)
  const hintEl = document.getElementById("finaleInteractiveHint");

  function hideHint() {
    if (hintEl) {
      hintEl.style.opacity = "0";
      hintEl.style.pointerEvents = "none";
    }
  }

  function onPointerDown(clientX, clientY) {
    finaleIsDragging = true;
    finaleDragStart.x = clientX;
    finaleDragStart.y = clientY;
    finalePrevPointer.x = clientX;
    finalePrevPointer.y = clientY;
    finaleTotalDragDistance = 0;
    finaleTiltVelX = 0;
    finaleTiltVelY = 0;
    finaleLastInteractionTime = Date.now();
  }

  function onPointerMove(clientX, clientY) {
    if (!finaleIsDragging) return;

    const dx = clientX - finalePrevPointer.x;
    const dy = clientY - finalePrevPointer.y;
    finaleTotalDragDistance += Math.abs(dx) + Math.abs(dy);

    if (finaleTotalDragDistance > 6) {
      hideHint();
    }

    // Direct sensitivity
    const sensitivity = 0.005;
    finaleTargetTiltX = Math.max(-1.0, Math.min(1.0, finaleTargetTiltX + dx * sensitivity));
    finaleTargetTiltY = Math.max(-1.0, Math.min(1.0, finaleTargetTiltY + dy * sensitivity));

    finaleTiltVelX = dx * sensitivity;
    finaleTiltVelY = dy * sensitivity;

    finalePrevPointer.x = clientX;
    finalePrevPointer.y = clientY;
    finaleLastInteractionTime = Date.now();
  }

  function onPointerUp(clientX, clientY) {
    if (!finaleIsDragging) return;
    finaleIsDragging = false;

    // Tap to pulse if tap without dragging
    if (finaleTotalDragDistance < 10) {
      const rect = container.getBoundingClientRect();
      const tapX = typeof clientX === "number" ? clientX - rect.left : (containerW / 2);
      const tapY = typeof clientY === "number" ? clientY - rect.top : (containerH * 0.48);
      triggerHeartPulse(tapX, tapY);
    }
    finaleLastInteractionTime = Date.now();
  }

  let lastPulseTriggerTime = 0;
  function triggerHeartPulse(originX, originY) {
    const now = Date.now();
    if (now - lastPulseTriggerTime < 80) return;
    lastPulseTriggerTime = now;

    const w = container.clientWidth || 540;
    const h = container.clientHeight || 400;
    const centerX = (typeof originX === "number" && !isNaN(originX)) ? originX : w / 2;
    const centerY = (typeof originY === "number" && !isNaN(originY)) ? originY : h * 0.48;

    // 1. Trigger CSS Scale Pulse Animation on #finale3DHeartContainer DOM element
    container.classList.remove("heart-tapped-pulse");
    void container.offsetWidth; // Force reflow to immediately replay animation
    container.classList.add("heart-tapped-pulse");

    // Remove animation class after completion to keep DOM clean
    container.addEventListener("animationend", () => {
      container.classList.remove("heart-tapped-pulse");
    }, { once: true });

    hideHint();

    // 2. Set Canvas Tap Pulse Scale Progress (decayed in render loop)
    finaleTapPulseProgress = 1.0;

    // 3. Dual Expanding Radiant Particle Bloom Shockwaves
    const isSmall = window.innerWidth < 640;
    finaleBloomWaves.push({
      x: centerX,
      y: centerY,
      radius: 6,
      maxRadius: Math.max(w, h) * 0.75,
      speed: isSmall ? 10 : 15,
      alpha: 0.95,
      lineWidth: 3.5,
      r: 255,
      g: 42,
      b: 122
    });
    finaleBloomWaves.push({
      x: centerX,
      y: centerY,
      radius: 2,
      maxRadius: Math.max(w, h) * 0.65,
      speed: isSmall ? 7.5 : 11.5,
      alpha: 0.85,
      lineWidth: 2.5,
      r: 0,
      g: 225,
      b: 255
    });

    // 4. Elastic Outward Radial Bloom Impulse on Heart Particles
    const bloomRadius = isSmall ? 190 : 250;
    const maxImpulse = isSmall ? 15 : 22;
    for (let i = 0; i < finaleParticles.length; i++) {
      const p = finaleParticles[i];
      const pX = p.renderedX || p.targetX;
      const pY = p.renderedY || p.targetY;
      const dx = pX - centerX;
      const dy = pY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      if (dist < bloomRadius) {
        const factor = Math.pow(1 - dist / bloomRadius, 1.25);
        const impulse = factor * maxImpulse;
        p.bloomOffX = (dx / dist) * impulse;
        p.bloomOffY = (dy / dist) * impulse;
        p.bloomAlphaBoost = 0.55 * factor;
      }
    }

    // 5. Spawn Burst of Radiant Shooting Spark Trails
    const sparkCount = isSmall ? 28 : 42;
    for (let i = 0; i < sparkCount; i++) {
      spawnTapSpark(centerX, centerY);
    }

    // 6. Tactile Device Vibration
    if (navigator.vibrate) {
      try { navigator.vibrate([20, 35, 20]); } catch (e) {}
    }
  }

  function spawnTapSpark(cx, cy) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6.5 + 2.5;
    const colorPick = Math.random();
    let r = 255, g = 42, b = 122; // vibrant pink
    if (colorPick < 0.35) {
      r = 0; g = 240; b = 255; // electric cyan
    } else if (colorPick < 0.6) {
      r = 255; g = 215; b = 0; // radiant gold
    } else if (colorPick < 0.75) {
      r = 255; g = 255; b = 255; // diamond white
    }
    finaleTrails.push({
      x: cx + (Math.random() - 0.5) * 25,
      y: cy + (Math.random() - 0.5) * 25,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed + 0.8,
      length: Math.random() * 16 + 8,
      alpha: 1.0,
      decay: Math.random() * 0.035 + 0.02,
      r: r,
      g: g,
      b: b,
      depthLayer: 1.0
    });
  }

  // Mouse event attachments
  container.addEventListener("mousedown", (e) => {
    onPointerDown(e.clientX, e.clientY);
  });

  window.addEventListener("mousemove", (e) => {
    if (finaleIsDragging) {
      onPointerMove(e.clientX, e.clientY);
    }
  });

  window.addEventListener("mouseup", (e) => {
    if (finaleIsDragging) {
      onPointerUp(e.clientX, e.clientY);
    }
  });

  // Direct click handler reinforcement
  container.addEventListener("click", (e) => {
    if (finaleTotalDragDistance < 10) {
      const rect = container.getBoundingClientRect();
      triggerHeartPulse(e.clientX - rect.left, e.clientY - rect.top);
    }
  });

  // Touch event attachments with non-hijacking vertical scroll
  container.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  container.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1 && finaleIsDragging) {
      const deltaX = Math.abs(e.touches[0].clientX - finalePrevPointer.x);
      const deltaY = Math.abs(e.touches[0].clientY - finalePrevPointer.y);
      if (deltaX > deltaY || finaleTotalDragDistance > 12) {
        if (e.cancelable) e.preventDefault();
      }
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });

  container.addEventListener("touchend", () => {
    if (finaleIsDragging) {
      onPointerUp(finalePrevPointer.x, finalePrevPointer.y);
    }
  }, { passive: true });

  // 5. ANIMATION & RENDER LOOP
  let startTime = performance.now();
  let frameCount = 0;

  function render2DFinale(currentTime) {
    if (currentActiveChapter !== 4) {
      disposeFinaleThreeScene();
      return;
    }

    finaleAnimId = requestAnimationFrame(render2DFinale);
    frameCount++;

    const elapsedSec = (currentTime - startTime) / 1000;
    const ctx = finaleCtx;
    const w = container.clientWidth || 540;
    const h = container.clientHeight || 400;
    const curHeartX = w / 2;
    const curHeartY = h * 0.48;

    // Reset transform & clear
    ctx.clearRect(0, 0, w, h);

    // Ambient radial glow behind the heart
    const radialGlow = ctx.createRadialGradient(curHeartX, curHeartY, 20, curHeartX, curHeartY, w * 0.55);
    const glowPinkAlpha = 0.16 + (finaleTapPulseProgress > 0 ? finaleTapPulseProgress * 0.35 : 0);
    const glowBlueAlpha = 0.08 + (finaleTapPulseProgress > 0 ? finaleTapPulseProgress * 0.25 : 0);
    radialGlow.addColorStop(0, `rgba(255, 42, 122, ${glowPinkAlpha})`);
    radialGlow.addColorStop(0.45, `rgba(0, 210, 255, ${glowBlueAlpha})`);
    radialGlow.addColorStop(1, "rgba(3, 10, 25, 0)");
    ctx.fillStyle = radialGlow;
    ctx.fillRect(0, 0, w, h);

    // Heartbeat Pulse Logic:
    // Subtle double-beat (lub-dub) scale oscillation on a ~1.15s cycle
    const cycleTime = (elapsedSec % 1.15) / 1.15;
    let heartbeatScale = 1.0;
    if (cycleTime < 0.16) {
      // First pulse (lub)
      heartbeatScale = 1.0 + 0.065 * Math.sin((cycleTime / 0.16) * Math.PI);
    } else if (cycleTime > 0.22 && cycleTime < 0.38) {
      // Second pulse (dub)
      heartbeatScale = 1.0 + 0.042 * Math.sin(((cycleTime - 0.22) / 0.16) * Math.PI);
    }

    // Additive tap pulse bump with spring bounce
    if (finaleTapPulseProgress > 0) {
      const tapScaleBonus = Math.sin(finaleTapPulseProgress * Math.PI) * 0.22;
      heartbeatScale += tapScaleBonus;
      finaleTapPulseProgress = Math.max(0, finaleTapPulseProgress - 0.038);
    }

    // Interactivity: Tilt Parallax & Inertia
    if (finaleIsDragging) {
      finaleTiltX += (finaleTargetTiltX - finaleTiltX) * 0.18;
      finaleTiltY += (finaleTargetTiltY - finaleTiltY) * 0.18;
    } else {
      // Apply momentum decay
      finaleTargetTiltX += finaleTiltVelX;
      finaleTargetTiltY += finaleTiltVelY;
      finaleTiltVelX *= 0.93;
      finaleTiltVelY *= 0.93;

      // Soft spring back towards equilibrium
      finaleTargetTiltX *= 0.985;
      finaleTargetTiltY *= 0.985;

      finaleTiltX += (finaleTargetTiltX - finaleTiltX) * 0.12;
      finaleTiltY += (finaleTargetTiltY - finaleTiltY) * 0.12;

      // Auto-drift after 2.2s of inactivity
      const idleTime = Date.now() - finaleLastInteractionTime;
      if (idleTime > 2200) {
        const driftFactor = Math.min((idleTime - 2200) / 2000, 1.0);
        finaleTiltX += Math.sin(elapsedSec * 1.2) * 0.003 * driftFactor;
        finaleTiltY += Math.cos(elapsedSec * 0.9) * 0.002 * driftFactor;
      }
    }

    // 1. DRAW BACKGROUND STARFIELD
    ctx.save();
    for (let s of finaleStars) {
      s.phase += s.twinkleSpeed;
      const curAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.phase));
      const starParallaxX = s.x + finaleTiltX * 18 * s.depthLayer;
      const starParallaxY = s.y + finaleTiltY * 18 * s.depthLayer;

      ctx.fillStyle = s.color + curAlpha + ")";
      ctx.beginPath();
      ctx.arc(starParallaxX, starParallaxY, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // 2. UPDATE & DRAW PARTICLES
    ctx.save();
    // Additive blending for fireworks & starlight glow
    ctx.globalCompositeOperation = "lighter";

    const settledParticles = [];

    for (let i = 0; i < finaleParticles.length; i++) {
      const p = finaleParticles[i];

      // Staggered fireworks burst from center
      if (p.burstProgress < 1.0) {
        if (frameCount > p.burstDelay) {
          p.burstProgress += 0.024;
          if (p.burstProgress >= 1.0) {
            p.burstProgress = 1.0;
          }
          // Smooth easeOutCubic curve into heart silhouette
          const tEase = 1 - Math.pow(1 - p.burstProgress, 3);
          p.currentX = curHeartX + (p.targetX - curHeartX) * tEase;
          p.currentY = curHeartY + (p.targetY - curHeartY) * tEase;
          p.alpha = p.baseAlpha * Math.min(p.burstProgress * 1.5, 1.0);
        }
      } else {
        // Settled into silhouette: animate subtle idle breathing & heartbeat scale
        p.alpha = p.baseAlpha * (0.8 + 0.2 * Math.sin(p.twinklePhase + elapsedSec * 3));
        p.twinklePhase += p.twinkleSpeed;
      }

      // Parallax shift based on depth layer and user tilt
      const depthOffset = (p.depthLayer - 1.0) * 35;
      const offsetX = finaleTiltX * depthOffset;
      const offsetY = finaleTiltY * depthOffset;

      // Elastic spring decay for tap bloom displacement back towards natural shape
      p.bloomOffX = (p.bloomOffX || 0) * 0.88;
      p.bloomOffY = (p.bloomOffY || 0) * 0.88;
      p.bloomAlphaBoost = Math.max(0, (p.bloomAlphaBoost || 0) - 0.035);

      // Heartbeat pulse + tap bloom offset applied radially from heart center
      const dxFromCenter = (p.targetX - curHeartX);
      const dyFromCenter = (p.targetY - curHeartY);
      const pulsedX = curHeartX + dxFromCenter * heartbeatScale + offsetX + p.bloomOffX;
      const pulsedY = curHeartY + dyFromCenter * heartbeatScale + offsetY + p.bloomOffY;

      // Draw particle dot with soft glowing aura and tap flash boost
      const curAlpha = Math.min(1.0, p.alpha + p.bloomAlphaBoost);
      const drawSize = p.size * (heartbeatScale > 1.02 ? 1.2 : 1.0);

      // Core bright dot
      ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${curAlpha})`;
      ctx.beginPath();
      ctx.arc(pulsedX, pulsedY, drawSize, 0, Math.PI * 2);
      ctx.fill();

      // Soft luminous outer halo
      ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${curAlpha * 0.35})`;
      ctx.beginPath();
      ctx.arc(pulsedX, pulsedY, drawSize + p.glowRadius * 0.5, 0, Math.PI * 2);
      ctx.fill();

      p.renderedX = pulsedX;
      p.renderedY = pulsedY;

      if (p.burstProgress >= 0.95) {
        settledParticles.push(p);

        // Emit falling wispy comet-like trails from lower edges of heart
        if (p.isTrailEmitter && Math.random() < 0.04) {
          finaleTrails.push({
            x: pulsedX + (Math.random() - 0.5) * 4,
            y: pulsedY + Math.random() * 2,
            vx: (Math.random() - 0.5) * 0.8 + (finaleTiltX * 0.6),
            vy: Math.random() * 1.6 + 0.8,
            length: Math.random() * 14 + 8,
            alpha: Math.random() * 0.55 + 0.35,
            decay: Math.random() * 0.018 + 0.008,
            r: p.r,
            g: p.g,
            b: p.b,
            depthLayer: p.depthLayer
          });
        }
      }
    }

    // 2.5 DRAW EXPANDING BLOOM SHOCKWAVES
    for (let i = finaleBloomWaves.length - 1; i >= 0; i--) {
      const wave = finaleBloomWaves[i];
      wave.radius += wave.speed;
      wave.alpha *= 0.935;
      wave.lineWidth = Math.max(1, wave.lineWidth * 0.97);

      if (wave.alpha <= 0.015 || wave.radius >= wave.maxRadius) {
        finaleBloomWaves.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `rgba(${wave.r}, ${wave.g}, ${wave.b}, ${wave.alpha})`;
      ctx.lineWidth = wave.lineWidth;
      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // 3. DRAW FAINT CONSTELLATION WEB THREADS
    ctx.lineWidth = 0.75;
    for (let line of finaleConstellationLines) {
      if (line.pA.renderedX && line.pB.renderedX && line.pA.burstProgress > 0.8 && line.pB.burstProgress > 0.8) {
        const dx = line.pA.renderedX - line.pB.renderedX;
        const dy = line.pA.renderedY - line.pB.renderedY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < line.maxDist * 1.25) {
          const lineAlpha = (1 - dist / (line.maxDist * 1.25)) * 0.22;
          ctx.strokeStyle = `rgba(0, 240, 255, ${lineAlpha})`;
          ctx.beginPath();
          ctx.moveTo(line.pA.renderedX, line.pA.renderedY);
          ctx.lineTo(line.pB.renderedX, line.pB.renderedY);
          ctx.stroke();
        }
      }
    }

    // 4. UPDATE & DRAW WISPY COMET-LIKE FALLING TRAILS
    for (let i = finaleTrails.length - 1; i >= 0; i--) {
      const trail = finaleTrails[i];
      trail.x += trail.vx;
      trail.y += trail.vy;
      trail.vy += 0.04; // subtle gravity acceleration
      trail.alpha -= trail.decay;

      if (trail.alpha <= 0.01 || trail.y > h + 30) {
        finaleTrails.splice(i, 1);
        continue;
      }

      // Draw wispy streak
      const grad = ctx.createLinearGradient(trail.x, trail.y, trail.x - trail.vx * 3, trail.y - trail.length);
      grad.addColorStop(0, `rgba(${trail.r}, ${trail.g}, ${trail.b}, ${trail.alpha})`);
      grad.addColorStop(1, `rgba(${trail.r}, ${trail.g}, ${trail.b}, 0)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(trail.x, trail.y);
      ctx.lineTo(trail.x - trail.vx * 2, trail.y - trail.length);
      ctx.stroke();

      // Spark tip dot
      ctx.fillStyle = `rgba(255, 255, 255, ${trail.alpha * 0.8})`;
      ctx.beginPath();
      ctx.arc(trail.x, trail.y, 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Kick off animation loop
  finaleAnimId = requestAnimationFrame(render2DFinale);
}

// Expose Supabase helpers and Chapter 4 Finale methods to window
if (typeof window !== "undefined") {
  window.loadBirthdayContentFromSupabase = loadBirthdayContentFromSupabase;
  window.saveBirthdayContentToSupabase = saveBirthdayContentToSupabase;
  window.saveAllBirthdayContentToSupabase = saveAllBirthdayContentToSupabase;
  window.initFinaleScene = initFinaleScene;
  window.disposeFinaleThreeScene = disposeFinaleThreeScene;
}

