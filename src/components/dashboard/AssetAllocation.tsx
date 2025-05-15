
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export function AssetAllocation({ isLoading }: { isLoading: boolean }) {
  // This would typically come from your API or Supabase
  const [data, setData] = useState([
    { name: "Stocks", value: 45, color: "#0088FE" },
    { name: "Bonds", value: 20, color: "#00C49F" },
    { name: "Cash", value: 15, color: "#FFBB28" },
    { name: "Real Estate", value: 12, color: "#FF8042" },
    { name: "Crypto", value: 8, color: "#8884d8" }
  ]);
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px]">
        <Skeleton className="h-[200px] w-[200px] rounded-full" />
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-4 w-16" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value}%`} 
          />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
