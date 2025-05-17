
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

export function AllocationReport() {
  // Mock data for asset allocation
  const allocationData = [
    { name: 'Stocks', value: 45 },
    { name: 'Bonds', value: 25 },
    { name: 'Real Estate', value: 15 },
    { name: 'Cash', value: 10 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#3b0764'];

  const chartConfig = {
    allocation: { label: "Allocation", color: "#7c3aed" },
  };

  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
      <ChartLegend verticalAlign="bottom">
        <ChartLegendContent payload={allocationData.map((item, index) => ({ value: item.name, dataKey: item.name, color: COLORS[index % COLORS.length] }))} />
      </ChartLegend>
    </div>
  );
}
