
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export interface Budget {
  id: string;
  user_id: string;
  name: string;
  period: string;
  total_income: number;
  total_expenses: number;
  savings_goal: number;
  created_at: string;
  updated_at: string;
}

export interface BudgetCategory {
  id: string;
  budget_id: string;
  name: string;
  type: 'income' | 'expense';
  amount: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export async function fetchUserBudget(userId: string): Promise<Budget | null> {
  try {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
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
      .select('*')
      .eq('budget_id', budgetId)
      .order('amount', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching budget categories:", error);
    return [];
  }
}

export async function createSampleBudget(userId: string): Promise<Budget | null> {
  try {
    // Insert budget
    const { data: budget, error: budgetError } = await supabase
      .from('budgets')
      .insert({
        user_id: userId,
        name: 'Monthly Budget',
        period: 'monthly',
        total_income: 5000,
        total_expenses: 3000,
        savings_goal: 2000
      })
      .select()
      .single();
      
    if (budgetError) throw budgetError;
    
    if (budget) {
      // Insert income categories
      const incomeCategories = [
        { budget_id: budget.id, name: 'Salary', type: 'income', amount: 4500, color: '#10b981' },
        { budget_id: budget.id, name: 'Freelance', type: 'income', amount: 500, color: '#3b82f6' }
      ];
      
      const { error: incomeError } = await supabase
        .from('budget_categories')
        .insert(incomeCategories);
        
      if (incomeError) throw incomeError;
      
      // Insert expense categories
      const expenseCategories = [
        { budget_id: budget.id, name: 'Housing', type: 'expense', amount: 1200, color: '#ef4444' },
        { budget_id: budget.id, name: 'Food', type: 'expense', amount: 600, color: '#f97316' },
        { budget_id: budget.id, name: 'Transportation', type: 'expense', amount: 400, color: '#eab308' },
        { budget_id: budget.id, name: 'Utilities', type: 'expense', amount: 300, color: '#8b5cf6' },
        { budget_id: budget.id, name: 'Entertainment', type: 'expense', amount: 300, color: '#ec4899' },
        { budget_id: budget.id, name: 'Miscellaneous', type: 'expense', amount: 200, color: '#6366f1' }
      ];
      
      const { error: expenseError } = await supabase
        .from('budget_categories')
        .insert(expenseCategories);
        
      if (expenseError) throw expenseError;
    }
    
    toast.success("Sample budget created successfully!");
    return budget;
  } catch (error) {
    console.error("Error creating sample budget:", error);
    toast.error("Failed to create sample budget");
    return null;
  }
}
