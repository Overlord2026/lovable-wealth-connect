
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { BudgetCategory } from "@/services/budgetService";

interface IncomeSourcesProps {
  categories: BudgetCategory[];
  isLoading: boolean;
}

export function IncomeSources({ categories, isLoading }: IncomeSourcesProps) {
  const incomeCategories = categories.filter(cat => cat.type === 'income');
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border rounded-md shadow-md">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p>{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Income Sources</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col space-y-2 h-64 justify-center">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        ) : incomeCategories.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-muted-foreground">
            No income data available
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={incomeCategories}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
