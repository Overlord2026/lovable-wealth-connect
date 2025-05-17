
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export function PerformanceReport() {
  // Mock data for the performance chart
  const performanceData = [
    { month: 'Jan', portfolio: 4.5, benchmark: 3.2 },
    { month: 'Feb', portfolio: 5.1, benchmark: 4.3 },
    { month: 'Mar', portfolio: 3.8, benchmark: 4.0 },
    { month: 'Apr', portfolio: 6.2, benchmark: 5.1 },
    { month: 'May', portfolio: 5.9, benchmark: 4.8 },
    { month: 'Jun', portfolio: 7.0, benchmark: 5.5 },
  ];

  const chartConfig = {
    portfolio: { label: "Your Portfolio", color: "#7c3aed" },
    benchmark: { label: "S&P 500", color: "#9ca3af" }
  };

  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="portfolio" 
              stroke="#7c3aed" 
              strokeWidth={2} 
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="benchmark" 
              stroke="#9ca3af" 
              strokeWidth={2}
              dot={{ r: 4 }}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
