
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer } from "@/components/ui/chart"; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface RiskExposureProps {
  isLoading: boolean;
}

export function RiskExposure({ isLoading }: RiskExposureProps) {
  // Mock data for demonstration purposes
  const mockData = [
    {
      name: "North America",
      percentage: 45,
    },
    {
      name: "Europe",
      percentage: 25,
    },
    {
      name: "Asia Pacific",
      percentage: 15,
    },
    {
      name: "Emerging Markets",
      percentage: 10,
    },
    {
      name: "Other",
      percentage: 5,
    },
  ];
  
  // Chart config
  const chartConfig = {
    "percentage": { label: "Allocation", color: "#7c3aed" },
  };
  
  const formatPercentage = (value: number) => `${value}%`;
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Geographic Exposure</h2>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <div className="h-64">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={formatPercentage} />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Bar dataKey="percentage" fill="#7c3aed" barSize={30} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
    </div>
  );
}
