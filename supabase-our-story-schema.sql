-- ==============================================================================
-- SUPABASE SCHEMA FOR "OUR STORY" EXPERIENCE & ADMIN PORTAL
-- ==============================================================================
-- Run this in the Supabase Dashboard -> SQL Editor (https://supabase.com/dashboard)
--
-- Features:
-- 1. our_story_settings: Letter heading, message, CTA button, and overall copy
-- 2. our_story_quiz_questions: 8-10 configurable questions across 4 formats
-- 3. our_story_memory_rounds: 5 rounds of photo comparisons
-- 4. our_story_stats: Wrapped statistics cards
-- 5. our_story_timeline: Interactive timeline eras with media & captions
-- 6. our_story_final_responses: Private responses submitted by visitor (admin read-only)
-- ==============================================================================

-- 1. Table: our_story_settings
CREATE TABLE IF NOT EXISTS public.our_story_settings (
  id INT PRIMARY KEY DEFAULT 1,
  letter_heading TEXT NOT NULL DEFAULT 'Before you go...',
  letter_message TEXT NOT NULL DEFAULT 'I left one more little thing for you. Let''s see what you remember.',
  letter_button_text TEXT NOT NULL DEFAULT 'OPEN OUR STORY',
  quiz_title TEXT NOT NULL DEFAULT 'HOW WELL DO YOU REMEMBER US?',
  quiz_subtitle TEXT NOT NULL DEFAULT 'Let''s see what survived in that memory of yours 👀',
  final_question_prompt TEXT NOT NULL DEFAULT 'If you could relive one moment from our story, which one would it be?',
  wrapped_title TEXT NOT NULL DEFAULT 'OUR STORY',
  wrapped_subtitle TEXT NOT NULL DEFAULT 'A little collection of everything we were.',
  final_quote TEXT NOT NULL DEFAULT 'Some chapters end. That doesn''t mean they weren''t beautiful.',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed default settings row id = 1
INSERT INTO public.our_story_settings (id, letter_heading, letter_message, letter_button_text)
VALUES (1, 'Before you go...', 'I left one more little thing for you. Let''s see what you remember.', 'OPEN OUR STORY')
ON CONFLICT (id) DO NOTHING;

-- 2. Table: our_story_quiz_questions
CREATE TABLE IF NOT EXISTS public.our_story_quiz_questions (
  id TEXT PRIMARY KEY,
  sort_order INT DEFAULT 0,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice', -- 'multiple_choice' | 'photo_order' | 'who_likely' | 'memorable_choice'
  prompt TEXT NOT NULL,
  options JSONB DEFAULT '[]'::jsonb,
  photo_a TEXT,
  label_a TEXT,
  photo_b TEXT,
  label_b TEXT,
  correct_answer TEXT,
  reaction_text TEXT NOT NULL DEFAULT 'Okay, you actually remember this one.',
  reaction_wrong_text TEXT DEFAULT 'Nahhh, you forgot that? 😭',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed exactly 7 active quiz questions (Original Q2, Q3, Q4, Q5, Q6, Q7, Q9)
INSERT INTO public.our_story_quiz_questions (id, sort_order, question_type, prompt, options, photo_a, label_a, photo_b, label_b, correct_answer, reaction_text, reaction_wrong_text)
VALUES
  ('q1', 0, 'photo_order', 'WHICH HAPPENED FIRST?', '[]'::jsonb, 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&auto=format&fit=crop&q=80', 'That sunny afternoon stroll...', 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop&q=80', 'That cozy late night ramen date...', 'A', 'Look at your memory working overtime! ✨', 'You got the timeline mixed up! 😭'),
  ('q2', 1, 'who_likely', 'Who was more likely to forget what they were saying halfway through a story?', '["YOU", "ME"]'::jsonb, null, null, null, null, null, 'Accurate as always. 😂', 'Accurate as always. 😂'),
  ('q3', 2, 'multiple_choice', 'What was the very first song we both claimed as ''our song''?', '["Golden Hour", "Until I Found You", "Die For You", "Perfect"]'::jsonb, null, null, null, null, '0', 'A classic that will never get old. 🎵', 'How could you forget our melody? 😭'),
  ('q4', 3, 'memorable_choice', 'Which of these moments lives rent-free in your mind?', '["That road trip where we sang at the top of our lungs", "That quiet night we sat talking about our future for hours"]'::jsonb, null, null, null, null, null, 'That really was an unforgettable moment. ❤️', 'That really was an unforgettable moment. ❤️'),
  ('q5', 4, 'who_likely', 'Who was more likely to suggest getting food at 1:00 AM on a random Tuesday?', '["YOU", "ME"]'::jsonb, null, null, null, null, null, 'Guilty as charged! 🍟', 'Guilty as charged! 🍟'),
  ('q6', 5, 'photo_order', 'WHICH HAPPENED FIRST?', '[]'::jsonb, 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80', 'The rooftop sunset smiles...', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80', 'The spontaneous weekend getaway drive...', 'A', 'Spot on! That memory is golden.', 'Almost, but the rooftop came first! 🌅'),
  ('q7', 6, 'multiple_choice', 'What is my absolute favorite thing about you?', '["The way your eyes crinkle when you really laugh", "Your kindness and gentle heart", "How you make any bad day feel safe", "Every single thing about you"]'::jsonb, null, null, null, null, '3', 'Always and forever. ❤️', 'It''s all of it, every single thing. ❤️')
ON CONFLICT (id) DO UPDATE SET
  sort_order = EXCLUDED.sort_order,
  question_type = EXCLUDED.question_type,
  prompt = EXCLUDED.prompt,
  options = EXCLUDED.options,
  photo_a = EXCLUDED.photo_a,
  label_a = EXCLUDED.label_a,
  photo_b = EXCLUDED.photo_b,
  label_b = EXCLUDED.label_b,
  correct_answer = EXCLUDED.correct_answer,
  reaction_text = EXCLUDED.reaction_text,
  reaction_wrong_text = EXCLUDED.reaction_wrong_text;

-- 3. Table: our_story_memory_rounds
CREATE TABLE IF NOT EXISTS public.our_story_memory_rounds (
  round_number INT PRIMARY KEY,
  title_a TEXT NOT NULL,
  photo_a TEXT NOT NULL,
  caption_a TEXT NOT NULL,
  title_b TEXT NOT NULL,
  photo_b TEXT NOT NULL,
  caption_b TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Table: our_story_stats
CREATE TABLE IF NOT EXISTS public.our_story_stats (
  id TEXT PRIMARY KEY,
  sort_order INT DEFAULT 0,
  icon TEXT NOT NULL DEFAULT '❤️',
  label TEXT NOT NULL,
  stat_value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Table: our_story_timeline
CREATE TABLE IF NOT EXISTS public.our_story_timeline (
  id TEXT PRIMARY KEY,
  sort_order INT DEFAULT 0,
  era_title TEXT NOT NULL,
  tagline TEXT,
  era_date TEXT,
  description TEXT,
  photos JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Table: our_story_final_responses (Submissions from visitors - private to admin)
CREATE TABLE IF NOT EXISTS public.our_story_final_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  response_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS
ALTER TABLE public.our_story_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.our_story_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.our_story_memory_rounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.our_story_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.our_story_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.our_story_final_responses ENABLE ROW LEVEL SECURITY;

-- Clean existing policies
DROP POLICY IF EXISTS "Public read our_story_settings" ON public.our_story_settings;
DROP POLICY IF EXISTS "Admin write our_story_settings" ON public.our_story_settings;
DROP POLICY IF EXISTS "Public read our_story_quiz_questions" ON public.our_story_quiz_questions;
DROP POLICY IF EXISTS "Admin write our_story_quiz_questions" ON public.our_story_quiz_questions;
DROP POLICY IF EXISTS "Public read our_story_memory_rounds" ON public.our_story_memory_rounds;
DROP POLICY IF EXISTS "Admin write our_story_memory_rounds" ON public.our_story_memory_rounds;
DROP POLICY IF EXISTS "Public read our_story_stats" ON public.our_story_stats;
DROP POLICY IF EXISTS "Admin write our_story_stats" ON public.our_story_stats;
DROP POLICY IF EXISTS "Public read our_story_timeline" ON public.our_story_timeline;
DROP POLICY IF EXISTS "Admin write our_story_timeline" ON public.our_story_timeline;
DROP POLICY IF EXISTS "Public insert our_story_final_responses" ON public.our_story_final_responses;
DROP POLICY IF EXISTS "Admin select our_story_final_responses" ON public.our_story_final_responses;
DROP POLICY IF EXISTS "Admin delete our_story_final_responses" ON public.our_story_final_responses;

-- Settings: Public can read, only authenticated admin can update
CREATE POLICY "Public read our_story_settings" ON public.our_story_settings FOR SELECT TO public USING (true);
CREATE POLICY "Admin write our_story_settings" ON public.our_story_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Quiz Questions: Public can read, admin can write
CREATE POLICY "Public read our_story_quiz_questions" ON public.our_story_quiz_questions FOR SELECT TO public USING (true);
CREATE POLICY "Admin write our_story_quiz_questions" ON public.our_story_quiz_questions FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Memory Rounds: Public can read, admin can write
CREATE POLICY "Public read our_story_memory_rounds" ON public.our_story_memory_rounds FOR SELECT TO public USING (true);
CREATE POLICY "Admin write our_story_memory_rounds" ON public.our_story_memory_rounds FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Stats: Public can read, admin can write
CREATE POLICY "Public read our_story_stats" ON public.our_story_stats FOR SELECT TO public USING (true);
CREATE POLICY "Admin write our_story_stats" ON public.our_story_stats FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Timeline: Public can read, admin can write
CREATE POLICY "Public read our_story_timeline" ON public.our_story_timeline FOR SELECT TO public USING (true);
CREATE POLICY "Admin write our_story_timeline" ON public.our_story_timeline FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Final Responses: Public can INSERT (submit response), but ONLY authenticated admin can SELECT or DELETE
CREATE POLICY "Public insert our_story_final_responses" ON public.our_story_final_responses FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin select our_story_final_responses" ON public.our_story_final_responses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin delete our_story_final_responses" ON public.our_story_final_responses FOR DELETE TO authenticated USING (true);
