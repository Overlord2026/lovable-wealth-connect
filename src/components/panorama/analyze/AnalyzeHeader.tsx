
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface AnalyzeHeaderProps {
  isLoading: boolean;
  viewId: string;
}

export function AnalyzeHeader({ isLoading, viewId }: AnalyzeHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        {isLoading ? (
          <Skeleton className="h-10 w-64" />
        ) : (
          <h1 className="text-3xl font-bold">Portfolio Analysis</h1>
        )}
        <p className="text-gray-500 mt-1">
          {isLoading ? (
            <Skeleton className="h-5 w-96" />
          ) : (
            "Advanced insights and analytics for your financial portfolio"
          )}
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        {isLoading ? (
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
