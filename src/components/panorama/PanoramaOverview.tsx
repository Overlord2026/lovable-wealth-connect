
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface PanoramaOverviewProps {
  assets: number;
  liabilities: number;
  isLoading: boolean;
}

export function PanoramaOverview({ assets, liabilities, isLoading }: PanoramaOverviewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const netWorth = assets - liabilities;
  const assetsPercentage = assets / (assets + liabilities);
  const liabilitiesPercentage = liabilities / (assets + liabilities);

  const data = [
    { name: 'Assets', value: assets, color: '#16a34a' },
    { name: 'Liabilities', value: liabilities, color: '#dc2626' },
  ];

  const chartConfig = {
    assets: { label: 'Assets', color: '#16a34a' },
    liabilities: { label: 'Liabilities', color: '#dc2626' },
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Wealth Overview</h2>
      
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Net Worth</h3>
                <p className="text-2xl font-bold">{formatCurrency(netWorth)}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Assets</span>
                  <span className="text-sm font-medium">{formatCurrency(assets)} ({formatPercentage(assetsPercentage)})</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${assetsPercentage * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Liabilities</span>
                  <span className="text-sm font-medium">{formatCurrency(liabilities)} ({formatPercentage(liabilitiesPercentage)})</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${liabilitiesPercentage * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 h-64">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <ChartLegend verticalAlign="bottom">
              <ChartLegendContent payload={data.map(item => ({ value: item.name, dataKey: item.name, color: item.color }))} />
            </ChartLegend>
          </div>
        </div>
      )}
    </div>
  );
}
