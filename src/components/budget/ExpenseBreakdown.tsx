
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatCurrency } from "@/lib/formatters";
import { BudgetCategory } from "@/services/budgetService";

interface ExpenseBreakdownProps {
  categories: BudgetCategory[];
  isLoading: boolean;
}

export function ExpenseBreakdown({ categories, isLoading }: ExpenseBreakdownProps) {
  const expenseCategories = categories.filter(cat => cat.type === 'expense');
  
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent 
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border rounded-md shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p>{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Skeleton className="h-52 w-52 rounded-full" />
          </div>
        ) : expenseCategories.length === 0 ? (
          <div className="flex justify-center items-center h-64 text-muted-foreground">
            No expense data available
          </div>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  nameKey="name"
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
