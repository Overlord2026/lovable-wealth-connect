
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Eye, ArrowUpRight, Users } from "lucide-react";

interface PanoramaHeaderProps {
  netWorth: number;
  assets: number;
  liabilities: number;
  isLoading: boolean;
}

export function PanoramaHeader({ netWorth, assets, liabilities, isLoading }: PanoramaHeaderProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="h-6 w-6 text-wealth-700" />
        <h1 className="text-3xl font-serif font-bold text-gray-900">Panorama</h1>
      </div>
      
      <p className="text-lg text-gray-600 mb-8 max-w-3xl">
        Your complete 360° view of wealth across all assets, providing clarity, control, and strategic insight.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-wealth-700 to-wealth-800 rounded-lg p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-white/80">Net Worth</h3>
            <ArrowUpRight className="h-5 w-5 text-wealth-200" />
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-32 bg-wealth-600/50" />
          ) : (
            <p className="text-3xl font-bold">{formatCurrency(netWorth)}</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-600">Total Assets</h3>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(assets)}</p>
          )}
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow border border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-medium text-gray-600">Total Liabilities</h3>
          </div>
          {isLoading ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <p className="text-3xl font-bold text-gray-800">{formatCurrency(liabilities)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
