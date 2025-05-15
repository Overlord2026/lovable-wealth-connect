
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Button } from "@/components/ui/button";

export function NetWorthChart() {
  const [range, setRange] = useState("1Y");
  
  // Mock data - in a real app, this would come from your API or Supabase
  const data = [
    { month: "Jan", assets: 80000, liabilities: 30000, netWorth: 50000 },
    { month: "Feb", assets: 82000, liabilities: 29500, netWorth: 52500 },
    { month: "Mar", assets: 81000, liabilities: 29000, netWorth: 52000 },
    { month: "Apr", assets: 84000, liabilities: 28500, netWorth: 55500 },
    { month: "May", assets: 86000, liabilities: 28000, netWorth: 58000 },
    { month: "Jun", assets: 88000, liabilities: 27500, netWorth: 60500 },
    { month: "Jul", assets: 90000, liabilities: 27000, netWorth: 63000 },
    { month: "Aug", assets: 92000, liabilities: 26500, netWorth: 65500 },
    { month: "Sep", assets: 94000, liabilities: 26000, netWorth: 68000 },
    { month: "Oct", assets: 96000, liabilities: 25500, netWorth: 70500 },
    { month: "Nov", assets: 98000, liabilities: 25000, netWorth: 73000 },
    { month: "Dec", assets: 100000, liabilities: 24500, netWorth: 75500 }
  ];
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="flex flex-col h-80">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {["3M", "6M", "1Y", "All"].map((option) => (
            <Button
              key={option}
              variant={range === option ? "default" : "outline"}
              size="sm"
              onClick={() => setRange(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={value => `$${value / 1000}k`} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="netWorth"
            stroke="#3b82f6"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            name="Net Worth"
          />
          <Line
            type="monotone"
            dataKey="assets"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Assets"
          />
          <Line
            type="monotone"
            dataKey="liabilities"
            stroke="#ef4444"
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Liabilities"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
