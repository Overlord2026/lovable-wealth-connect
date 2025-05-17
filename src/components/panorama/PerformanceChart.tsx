
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

interface PerformanceChartProps {
  isLoading: boolean;
}

export function PerformanceChart({ isLoading }: PerformanceChartProps) {
  const [timeRange, setTimeRange] = useState<'1m' | '3m' | '6m' | '1y' | 'all'>('1y');
  
  // Mock data for demonstration purposes
  const generateMockData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = [];
    
    // Generate last 12 months of data
    const now = new Date();
    const currentMonth = now.getMonth();
    
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const netWorth = 500000 + Math.random() * 150000 * (1 + (11 - i) / 20);
      const benchmark = 500000 + Math.random() * 120000 * (1 + (11 - i) / 25);
      
      data.push({
        name: months[monthIndex],
        "Your Portfolio": Math.round(netWorth),
        Benchmark: Math.round(benchmark),
      });
    }
    
    return data;
  };
  
  const mockData = generateMockData();
  
  // Chart config
  const chartConfig = {
    "Your Portfolio": { label: "Your Portfolio", color: "#7c3aed" },
    "Benchmark": { label: "Benchmark", color: "#94a3b8" }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Performance</h2>
        
        <div className="flex space-x-1">
          <Button 
            variant={timeRange === '1m' ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange('1m')}
          >
            1M
          </Button>
          <Button 
            variant={timeRange === '3m' ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange('3m')}
          >
            3M
          </Button>
          <Button 
            variant={timeRange === '6m' ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange('6m')}
          >
            6M
          </Button>
          <Button 
            variant={timeRange === '1y' ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange('1y')}
          >
            1Y
          </Button>
          <Button 
            variant={timeRange === 'all' ? "default" : "outline"} 
            size="sm"
            onClick={() => setTimeRange('all')}
          >
            All
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <div className="h-64">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000)}k`} 
                  tick={{ fontSize: 12 }}
                  width={60}
                />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Your Portfolio"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="Benchmark"
                  stroke="#94a3b8"
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}
    </div>
  );
}
