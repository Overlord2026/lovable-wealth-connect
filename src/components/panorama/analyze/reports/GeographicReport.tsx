
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export function GeographicReport() {
  // Mock data for geographic distribution
  const geographicData = [
    { region: 'North America', percentage: 55 },
    { region: 'Europe', percentage: 20 },
    { region: 'Asia Pacific', percentage: 15 },
    { region: 'Emerging Markets', percentage: 10 },
  ];

  const chartConfig = {
    percentage: { label: "Allocation", color: "#7c3aed" },
  };

  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={geographicData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <YAxis dataKey="region" type="category" width={110} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="percentage" fill="#7c3aed" barSize={20} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
