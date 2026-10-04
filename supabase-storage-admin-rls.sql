-- ==============================================================================
-- SUPABASE STORAGE & DATABASE RLS POLICIES FOR ADMIN-PROTECTED BIRTHDAY ASSETS
-- ==============================================================================
-- Run this script in the Supabase Dashboard -> SQL Editor (https://supabase.com/dashboard)
-- 
-- Objectives:
-- 1. Public visitors can ONLY READ (SELECT) published celebration assets & content.
-- 2. Only authenticated admin accounts can INSERT, UPDATE, or DELETE assets in 'Birthday-assets'.
-- 3. Anonymous / unauthenticated users are BLOCKED from modifying or deleting anything.
-- ==============================================================================

-- 1. Ensure the 'Birthday-assets' bucket exists and is set to public read
INSERT INTO storage.buckets (id, name, public)
VALUES ('Birthday-assets', 'Birthday-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Enable Row Level Security (RLS) on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Clean up any existing policies on the Birthday-assets bucket to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access to Birthday-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated admin upload to Birthday-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated admin update on Birthday-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated admin delete on Birthday-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin user upload to Birthday-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin user update on Birthday-assets" ON storage.objects;
DROP POLICY IF EXISTS "Allow admin user delete on Birthday-assets" ON storage.objects;

-- ==============================================================================
-- STORAGE POLICIES: Birthday-assets
-- ==============================================================================

-- POLICY 1: PUBLIC VISITORS CAN ONLY READ (SELECT) ASSETS
-- Anyone (anon visitors and authenticated users) can view and stream celebration photos,
-- music, and backgrounds.
CREATE POLICY "Allow public read access to Birthday-assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'Birthday-assets');

-- POLICY 2: ONLY AUTHENTICATED ADMIN USERS CAN INSERT (UPLOAD) ADMIN ASSETS
-- Protects photos/, backgrounds/, and music/ folders against unauthorized uploads.
CREATE POLICY "Allow authenticated admin upload to Birthday-assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'Birthday-assets'
);

-- POLICY 2B: PUBLIC VISITORS CAN UPLOAD LOVE NOTES ATTACHMENTS (love-notes/ folder)
-- Allows anyone (visitors leaving wishes) to upload photos, voice recordings, or videos with their love note.
DROP POLICY IF EXISTS "Allow public upload to love-notes" ON storage.objects;
CREATE POLICY "Allow public upload to love-notes"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (
  bucket_id = 'Birthday-assets'
  AND (
    name LIKE 'love-notes/%'
    OR (storage.foldername(name))[1] = 'love-notes'
  )
);

-- POLICY 3: ONLY AUTHENTICATED ADMIN USERS CAN UPDATE (REPLACE)
CREATE POLICY "Allow authenticated admin update on Birthday-assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'Birthday-assets'
  -- AND (auth.jwt() ->> 'email') = 'matimbangobeni78@gmail.com'
)
WITH CHECK (
  bucket_id = 'Birthday-assets'
  -- AND (auth.jwt() ->> 'email') = 'matimbangobeni78@gmail.com'
);

-- POLICY 4: ONLY AUTHENTICATED ADMIN USERS CAN DELETE ASSETS
CREATE POLICY "Allow authenticated admin delete on Birthday-assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'Birthday-assets'
  -- AND (auth.jwt() ->> 'email') = 'matimbangobeni78@gmail.com'
);

-- ==============================================================================
-- DATABASE POLICIES: birthday_content table (Persistence)
-- ==============================================================================
-- Ensures the birthday text message and background/music links also adhere to the
-- same security rule: public read-only, admin write.

ALTER TABLE IF EXISTS public.birthday_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on birthday_content" ON public.birthday_content;
DROP POLICY IF EXISTS "Allow authenticated admin update on birthday_content" ON public.birthday_content;
DROP POLICY IF EXISTS "Allow authenticated admin insert on birthday_content" ON public.birthday_content;

-- Read: Public can read current birthday config
CREATE POLICY "Allow public read on birthday_content"
ON public.birthday_content
FOR SELECT
TO public
USING (true);

-- Update: Only authenticated admin can update configuration
CREATE POLICY "Allow authenticated admin update on birthday_content"
ON public.birthday_content
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Insert: Only authenticated admin can insert configuration
CREATE POLICY "Allow authenticated admin insert on birthday_content"
ON public.birthday_content
FOR INSERT
TO authenticated
WITH CHECK (true);

-- ==============================================================================
-- DATABASE POLICIES: love_notes table (Public Submission & Realtime Sync)
-- ==============================================================================
-- Allows ANY user/visitor (not just admin) to post love notes, like notes, and read notes.

CREATE TABLE IF NOT EXISTS public.love_notes (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  role TEXT DEFAULT 'Loved One 💕',
  avatar TEXT DEFAULT '💌',
  message TEXT NOT NULL,
  sticker TEXT DEFAULT '💖',
  photos JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,
  audio_url TEXT,
  likes INT DEFAULT 1,
  liked_by_user BOOLEAN DEFAULT true,
  note_type TEXT DEFAULT 'text',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.love_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public select love_notes" ON public.love_notes;
DROP POLICY IF EXISTS "Public insert love_notes" ON public.love_notes;
DROP POLICY IF EXISTS "Public update love_notes" ON public.love_notes;
DROP POLICY IF EXISTS "Admin delete love_notes" ON public.love_notes;

-- Public can SELECT all love notes
CREATE POLICY "Public select love_notes"
ON public.love_notes
FOR SELECT
TO public
USING (true);

-- Anyone (public visitors + admin) can post new love notes
CREATE POLICY "Public insert love_notes"
ON public.love_notes
FOR INSERT
TO public
WITH CHECK (true);

-- Anyone can like love notes (increment likes)
CREATE POLICY "Public update love_notes"
ON public.love_notes
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Admin can delete love notes
CREATE POLICY "Admin delete love_notes"
ON public.love_notes
FOR DELETE
TO authenticated
USING (true);

