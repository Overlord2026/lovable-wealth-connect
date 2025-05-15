
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/formatters";
import { Budget } from "@/services/budgetService";

interface SavingsProgressProps {
  budget: Budget | null;
  isLoading: boolean;
}

export function SavingsProgress({ budget, isLoading }: SavingsProgressProps) {
  const currentSavings = budget ? budget.total_income - budget.total_expenses : 0;
  const savingsGoal = budget?.savings_goal || 0;
  const progressPercentage = savingsGoal > 0 ? Math.min(100, Math.round((currentSavings / savingsGoal) * 100)) : 0;
  
  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Savings Goal Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ) : (
          <>
            <div className="flex justify-between text-sm">
              <span>Current Savings</span>
              <span>Goal</span>
            </div>
            <Progress value={progressPercentage} className="h-4" />
            <div className="flex justify-between text-sm">
              <span>{formatCurrency(currentSavings)}</span>
              <span className="text-muted-foreground">{formatCurrency(savingsGoal)}</span>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              {progressPercentage}% of your savings goal
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
