-- Migration: Add profileImage to User table
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/okvybczkwkviwbmocbhz/sql

-- Add profileImage column to User table
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "profileImage" TEXT;

-- Verify the change
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'User';
