
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
    // Insert budget with total_amount
    const { data: budget, error: budgetError } = await supabase
      .from('budgets')
      .insert({
        user_id: userId,
        name: 'Monthly Budget',
        total_amount: 5000
      })
      .select()
      .single();
      
    if (budgetError) throw budgetError;
    
    if (budget) {
      // Insert categories with allocated_amount
      const categories = [
        { budget_id: budget.id, name: 'Housing', allocated_amount: 1500 },
        { budget_id: budget.id, name: 'Food', allocated_amount: 800 },
        { budget_id: budget.id, name: 'Transportation', allocated_amount: 400 },
        { budget_id: budget.id, name: 'Entertainment', allocated_amount: 300 },
        { budget_id: budget.id, name: 'Utilities', allocated_amount: 500 },
        { budget_id: budget.id, name: 'Savings', allocated_amount: 1000 },
        { budget_id: budget.id, name: 'Miscellaneous', allocated_amount: 500 }
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
