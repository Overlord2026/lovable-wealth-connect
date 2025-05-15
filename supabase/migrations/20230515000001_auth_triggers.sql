
-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    display_name,
    user_type,
    financial_goals
  ) VALUES (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'userType')::user_type, 'client'::user_type),
    coalesce((new.raw_user_meta_data->>'financialGoals')::text[], '{}')
  );
  
  -- If user is a professional, also create professional profile
  IF (new.raw_user_meta_data->>'userType') = 'professional' THEN
    INSERT INTO public.professional_profiles (
      id,
      professional_type,
      license_number,
      expertise,
      certifications,
      region,
      bio,
      is_verified
    ) VALUES (
      new.id,
      new.raw_user_meta_data->'professionalData'->>'professionalType',
      new.raw_user_meta_data->'professionalData'->>'licenseNumber',
      coalesce((new.raw_user_meta_data->'professionalData'->>'expertise')::text[], '{}'),
      coalesce((new.raw_user_meta_data->'professionalData'->>'certifications')::text[], '{}'),
      new.raw_user_meta_data->'professionalData'->>'region',
      new.raw_user_meta_data->'professionalData'->>'bio',
      false
    );
  END IF;
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
