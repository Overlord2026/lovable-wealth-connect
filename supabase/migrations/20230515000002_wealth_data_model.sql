
-- Create account types enum
DO $$ BEGIN
    CREATE TYPE account_type AS ENUM (
      'checking',
      'savings', 
      'investment', 
      'retirement', 
      'credit_card',
      'loan',
      'mortgage',
      'crypto',
      'other'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create financial accounts table
CREATE TABLE IF NOT EXISTS public.financial_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  account_type account_type NOT NULL,
  institution TEXT NOT NULL,
  balance DECIMAL(19,4) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_manually_added BOOLEAN DEFAULT true,
  account_number TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  CONSTRAINT positive_balance CHECK (
    (account_type IN ('checking', 'savings', 'investment', 'retirement', 'crypto') AND balance >= 0) OR
    (account_type IN ('credit_card', 'loan', 'mortgage') AND balance <= 0) OR
    (account_type = 'other')
  )
);

-- Create assets table
CREATE TABLE IF NOT EXISTS public.assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.financial_accounts(id) ON DELETE SET NULL,
  asset_class_id UUID REFERENCES public.asset_classes(id),
  name TEXT NOT NULL,
  quantity DECIMAL(19,8) DEFAULT 1,
  purchase_price DECIMAL(19,4),
  current_value DECIMAL(19,4) NOT NULL,
  purchase_date DATE,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create transactions table for tracking income and expenses
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.financial_accounts(id) ON DELETE SET NULL,
  amount DECIMAL(19,4) NOT NULL,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  category TEXT,
  subcategory TEXT,
  description TEXT,
  is_recurring BOOLEAN DEFAULT false,
  recurring_frequency TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Set up RLS policies for financial accounts
ALTER TABLE public.financial_accounts ENABLE ROW LEVEL SECURITY;

-- Users can view their own accounts
CREATE POLICY "Users can view own financial accounts" ON public.financial_accounts
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own accounts
CREATE POLICY "Users can insert own financial accounts" ON public.financial_accounts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own accounts
CREATE POLICY "Users can update own financial accounts" ON public.financial_accounts
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own accounts
CREATE POLICY "Users can delete own financial accounts" ON public.financial_accounts
  FOR DELETE USING (auth.uid() = user_id);

-- Set up RLS policies for assets
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

-- Users can view their own assets
CREATE POLICY "Users can view own assets" ON public.assets
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own assets
CREATE POLICY "Users can insert own assets" ON public.assets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own assets
CREATE POLICY "Users can update own assets" ON public.assets
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own assets
CREATE POLICY "Users can delete own assets" ON public.assets
  FOR DELETE USING (auth.uid() = user_id);

-- Set up RLS policies for transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions" ON public.transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own transactions
CREATE POLICY "Users can insert own transactions" ON public.transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own transactions
CREATE POLICY "Users can update own transactions" ON public.transactions
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own transactions
CREATE POLICY "Users can delete own transactions" ON public.transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Add updated_at triggers for all tables
DROP TRIGGER IF EXISTS financial_accounts_updated_at ON public.financial_accounts;
CREATE TRIGGER financial_accounts_updated_at
  BEFORE UPDATE ON public.financial_accounts
  FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

DROP TRIGGER IF EXISTS assets_updated_at ON public.assets;
CREATE TRIGGER assets_updated_at
  BEFORE UPDATE ON public.assets
  FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();

DROP TRIGGER IF EXISTS transactions_updated_at ON public.transactions;
CREATE TRIGGER transactions_updated_at
  BEFORE UPDATE ON public.transactions
  FOR EACH ROW EXECUTE PROCEDURE public.update_timestamp();
