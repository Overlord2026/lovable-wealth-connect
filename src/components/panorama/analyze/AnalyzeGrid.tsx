
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PerformanceReport } from "./reports/PerformanceReport";
import { AllocationReport } from "./reports/AllocationReport";
import { CashFlowReport } from "./reports/CashFlowReport";
import { RiskReport } from "./reports/RiskReport";
import { GeographicReport } from "./reports/GeographicReport";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyzeGridProps {
  isLoading: boolean;
}

export function AnalyzeGrid({ isLoading }: AnalyzeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Performance Report Card */}
      <Card>
        <CardHeader>
          <CardTitle>Performance</CardTitle>
          <CardDescription>Historical returns and benchmarks</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-64 w-full" /> : <PerformanceReport />}
        </CardContent>
      </Card>
      
      {/* Asset Allocation Report Card */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Breakdown by asset class</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-64 w-full" /> : <AllocationReport />}
        </CardContent>
      </Card>
      
      {/* Geographic Exposure Report Card */}
      <Card>
        <CardHeader>
          <CardTitle>Geographic Exposure</CardTitle>
          <CardDescription>Asset distribution by region</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-64 w-full" /> : <GeographicReport />}
        </CardContent>
      </Card>
      
      {/* Cash Flow Report Card */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow</CardTitle>
          <CardDescription>Projected income and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-64 w-full" /> : <CashFlowReport />}
        </CardContent>
      </Card>
      
      {/* Risk Assessment Report Card */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
          <CardDescription>Volatility and risk metrics</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? <Skeleton className="h-64 w-full" /> : <RiskReport />}
        </CardContent>
      </Card>
    </div>
  );
}
