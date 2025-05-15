
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export interface Budget {
  id: string;
  user_id: string;
  name: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface BudgetCategory {
  id: string;
  budget_id: string;
  name: string;
  allocated_amount: number;
  created_at: string;
  updated_at: string;
}

export async function fetchUserBudget(userId: string): Promise<Budget | null> {
  const { data, error } = await supabase
    .from('budgets')
    .select(`
      id,
      user_id,
      name,
      total_amount:total_income,
      created_at,
      updated_at
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error('Error fetching budget:', error);
    return null;
  }
  return data;
}

export async function fetchBudgetCategories(budgetId: string): Promise<BudgetCategory[]> {
  try {
    const { data, error } = await supabase
      .from('budget_categories')
      .select(`
        id,
        budget_id,
        name,
        allocated_amount:amount,
        created_at,
        updated_at
      `)
      .eq('budget_id', budgetId)
      .order('amount', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching budget categories:", error);
    return [];
  }
}

export async function createSampleBudget(userId: string): Promise<{ budget: Budget; categories: BudgetCategory[] }> {
  // 1) Insert the budget (write to total_income)
  const { data: [budget], error: budgetError } = await supabase
    .from('budgets')
    .insert({
      user_id: userId,
      name: 'Monthly Sample Budget',
      total_income: 5000         // write into total_income
    })
    .select(`
      id,
      user_id,
      name,
      total_amount:total_income, // alias back on return
      created_at,
      updated_at
    `);

  if (budgetError || !budget) throw budgetError;

  // 2) Insert categories (write to amount and include type/color)
  const sampleCategories = [
    { budget_id: budget.id, name: 'Housing',         amount: 1500, type: 'expense',  color: '#1e40af' },
    { budget_id: budget.id, name: 'Food',            amount:  600, type: 'expense',  color: '#15803d' },
    { budget_id: budget.id, name: 'Saving',          amount: 1000, type: 'savings',  color: '#047857' },
    { budget_id: budget.id, name: 'Entertainment',   amount:  300, type: 'expense',  color: '#be185d' },
    { budget_id: budget.id, name: 'Utilities',       amount:  500, type: 'expense',  color: '#4f46e5' },
    { budget_id: budget.id, name: 'Transportation',  amount:  400, type: 'expense',  color: '#b45309' },
    { budget_id: budget.id, name: 'Miscellaneous',   amount:  500, type: 'expense',  color: '#7c3aed' }
  ];

  const { error: catError } = await supabase
    .from('budget_categories')
    .insert(sampleCategories);

  if (catError) throw catError;

  // 3) Fetch and return with proper aliases
  const categories = await fetchBudgetCategories(budget.id);
  return { budget, categories };
}
