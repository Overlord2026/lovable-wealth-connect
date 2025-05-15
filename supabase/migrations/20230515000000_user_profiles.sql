
-- Create user types enum if it doesn't exist
DO $$ BEGIN
    CREATE TYPE user_type AS ENUM ('client', 'professional');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Extend existing profiles table with additional fields
ALTER TABLE IF EXISTS public.profiles
ADD COLUMN IF NOT EXISTS user_type user_type DEFAULT 'client',
ADD COLUMN IF NOT EXISTS financial_goals text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create professional_profiles table for advisor-specific data
CREATE TABLE IF NOT EXISTS public.professional_profiles (
  id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  professional_type TEXT NOT NULL,
  license_number TEXT NOT NULL,
  expertise TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  region TEXT,
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3,2) DEFAULT NULL,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create an update_timestamp function if it doesn't exist
CREATE OR REPLACE FUNCTION public.update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger to profiles
DROP TRIGGER IF EXISTS profiles_updated_at ON public.profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

-- Add updated_at trigger to professional_profiles
DROP TRIGGER IF EXISTS professional_profiles_updated_at ON public.professional_profiles;
CREATE TRIGGER professional_profiles_updated_at
  BEFORE UPDATE ON public.professional_profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

-- Set up RLS policies
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can view their own profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profiles
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Professional profiles RLS
ALTER TABLE public.professional_profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can view professional profiles (they're public)
CREATE POLICY "Anyone can view professional profiles" ON public.professional_profiles
  FOR SELECT USING (true);

-- Professionals can update their own profiles
CREATE POLICY "Professionals can update own profile" ON public.professional_profiles
  FOR UPDATE USING (auth.uid() = id);
