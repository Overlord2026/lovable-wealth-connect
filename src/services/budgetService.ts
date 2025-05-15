
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
  try {
    const { data, error } = await supabase
      .from('budgets')
      .select(`
        id,
        user_id,
        name,
        total_income as total_amount,
        created_at,
        updated_at
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching budget:", error);
    return null;
  }
}

export async function fetchBudgetCategories(budgetId: string): Promise<BudgetCategory[]> {
  try {
    const { data, error } = await supabase
      .from('budget_categories')
      .select(`
        id,
        budget_id,
        name,
        amount as allocated_amount,
        created_at,
        updated_at
      `)
      .eq('budget_id', budgetId)
      .order('allocated_amount', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching budget categories:", error);
    return [];
  }
}

export async function createSampleBudget(userId: string): Promise<Budget | null> {
  try {
    // Insert budget with total_income instead of total_amount
    const { data: budget, error: budgetError } = await supabase
      .from('budgets')
      .insert({
        user_id: userId,
        name: 'Monthly Budget',
        total_income: 5000
      })
      .select(`
        id,
        user_id,
        name,
        total_income as total_amount,
        created_at,
        updated_at
      `)
      .single();
      
    if (budgetError) throw budgetError;
    
    if (budget) {
      // Insert categories with amount instead of allocated_amount
      const categories = [
        { budget_id: budget.id, name: 'Housing', amount: 1500, type: 'expense', color: '#1e40af' },
        { budget_id: budget.id, name: 'Food', amount: 800, type: 'expense', color: '#15803d' },
        { budget_id: budget.id, name: 'Transportation', amount: 400, type: 'expense', color: '#b45309' },
        { budget_id: budget.id, name: 'Entertainment', amount: 300, type: 'expense', color: '#be185d' },
        { budget_id: budget.id, name: 'Utilities', amount: 500, type: 'expense', color: '#4f46e5' },
        { budget_id: budget.id, name: 'Savings', amount: 1000, type: 'savings', color: '#047857' },
        { budget_id: budget.id, name: 'Miscellaneous', amount: 500, type: 'expense', color: '#7c3aed' }
      ];
      
      const { error: categoriesError } = await supabase
        .from('budget_categories')
        .insert(categories);
        
      if (categoriesError) throw categoriesError;
    }
    
    toast.success("Sample budget created successfully!");
    return budget;
  } catch (error) {
    console.error("Error creating sample budget:", error);
    toast.error("Failed to create sample budget");
    return null;
  }
}
