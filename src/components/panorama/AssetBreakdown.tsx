
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface AssetBreakdownProps {
  breakdown: Record<string, number>;
  isLoading: boolean;
}

export function AssetBreakdown({ breakdown, isLoading }: AssetBreakdownProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const typeLabels: Record<string, string> = {
    checking: "Checking",
    savings: "Savings",
    investment: "Investment",
    retirement: "Retirement",
    crypto: "Cryptocurrency",
    real_estate: "Real Estate",
    other: "Other"
  };

  const COLORS = [
    '#0088FE', 
    '#00C49F', 
    '#FFBB28', 
    '#FF8042', 
    '#8884D8', 
    '#82CA9D',
    '#9CD1FE'
  ];

  const data = Object.entries(breakdown).map(([key, value], index) => ({
    name: typeLabels[key] || key,
    value,
    color: COLORS[index % COLORS.length]
  }));

  // Create config object for the chart
  const chartConfig = data.reduce((acc, item) => {
    acc[item.name] = { label: item.name, color: item.color };
    return acc;
  }, {} as Record<string, {label: string, color: string}>);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
        fontSize={12}
        fontWeight={500}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Asset Breakdown</h2>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <div className="h-64">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
    </div>
  );
}
