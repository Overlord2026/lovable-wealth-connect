
import React from "react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

export function RiskReport() {
  // Mock data for risk assessment
  const riskData = [
    { subject: 'Volatility', portfolio: 3.5, benchmark: 4.2 },
    { subject: 'Sharpe Ratio', portfolio: 1.8, benchmark: 1.5 },
    { subject: 'Max Drawdown', portfolio: 15, benchmark: 18 },
    { subject: 'Beta', portfolio: 0.85, benchmark: 1.0 },
    { subject: 'Correlation', portfolio: 0.7, benchmark: 1.0 },
  ];

  const chartConfig = {
    portfolio: { label: "Your Portfolio", color: "#7c3aed" },
    benchmark: { label: "S&P 500", color: "#9ca3af" },
  };

  return (
    <div className="h-64">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius={90} data={riskData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar name="Portfolio" dataKey="portfolio" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.6} />
            <Radar name="Benchmark" dataKey="benchmark" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
