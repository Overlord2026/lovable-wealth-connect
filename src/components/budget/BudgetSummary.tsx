
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, PiggyBank, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { Budget, BudgetCategory } from "@/services/budgetService";

interface BudgetSummaryProps {
  budget: Budget | null;
  categories: BudgetCategory[];
  isLoading: boolean;
}

export function BudgetSummary({ budget, categories, isLoading }: BudgetSummaryProps) {
  // Calculate income and expense totals from categories
  const expenseCategories = categories.reduce((total, cat) => total + cat.allocated_amount, 0);
  const savingsAmount = budget ? budget.total_amount - expenseCategories : 0;
  const savingsPercentage = budget && budget.total_amount > 0 
    ? Math.round((savingsAmount / budget.total_amount) * 100) 
    : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-card">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-primary/20 p-3 mr-4">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total Budget</p>
            {isLoading ? (
              <Skeleton className="h-7 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-bold">{formatCurrency(budget?.total_amount || 0)}</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-destructive/20 p-3 mr-4">
            <ShoppingCart className="h-6 w-6 text-destructive" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Total Expenses</p>
            {isLoading ? (
              <Skeleton className="h-7 w-24 mt-1" />
            ) : (
              <p className="text-2xl font-bold">{formatCurrency(expenseCategories)}</p>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-card">
        <CardContent className="flex items-center p-6">
          <div className="rounded-full bg-accent/20 p-3 mr-4">
            <PiggyBank className="h-6 w-6 text-accent" />
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Savings</p>
            {isLoading ? (
              <Skeleton className="h-7 w-24 mt-1" />
            ) : (
              <div>
                <p className="text-2xl font-bold">{formatCurrency(savingsAmount)}</p>
                <p className="text-xs text-muted-foreground">{savingsPercentage}% of budget</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
