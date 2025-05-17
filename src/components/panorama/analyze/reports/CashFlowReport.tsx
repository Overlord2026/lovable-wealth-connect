
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export function CashFlowReport() {
  // Mock data for cash flow forecast
  const cashFlowData = [
    { month: 'Jul', income: 8500, expenses: 6200 },
    { month: 'Aug', income: 8700, expenses: 6300 },
    { month: 'Sep', income: 8500, expenses: 7100 },
    { month: 'Oct', income: 9200, expenses: 6500 },
    { month: 'Nov', income: 8800, expenses: 6700 },
    { month: 'Dec', income: 10500, expenses: 7800 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0 
    }).format(value);
  };

  const chartConfig = {
    income: { label: "Income", color: "#16a34a" },
    expenses: { label: "Expenses", color: "#dc2626" },
  };

  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cashFlowData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value/1000}k`} />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Legend />
            <Bar dataKey="income" fill="#16a34a" stackId="a" />
            <Bar dataKey="expenses" fill="#dc2626" stackId="b" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
