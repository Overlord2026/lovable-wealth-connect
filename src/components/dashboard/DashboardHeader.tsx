
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp, ArrowDown, DollarSign } from "lucide-react";

interface DashboardHeaderProps {
  netWorth: number;
  assets: number;
  liabilities: number;
  isLoading: boolean;
}

export function DashboardHeader({ netWorth, assets, liabilities, isLoading }: DashboardHeaderProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800">Financial Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your financial accounts and assets
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 p-6 gap-6">
        {/* Net Worth */}
        <div className="flex items-center p-4 bg-blue-50 rounded-lg">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Net Worth</p>
            {isLoading ? (
              <Skeleton className="h-7 w-28 mt-1" />
            ) : (
              <p className="text-xl font-bold text-gray-800">{formatCurrency(netWorth)}</p>
            )}
          </div>
        </div>
        
        {/* Assets */}
        <div className="flex items-center p-4 bg-green-50 rounded-lg">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <ArrowUp className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Assets</p>
            {isLoading ? (
              <Skeleton className="h-7 w-28 mt-1" />
            ) : (
              <p className="text-xl font-bold text-gray-800">{formatCurrency(assets)}</p>
            )}
          </div>
        </div>
        
        {/* Liabilities */}
        <div className="flex items-center p-4 bg-red-50 rounded-lg">
          <div className="rounded-full bg-red-100 p-3 mr-4">
            <ArrowDown className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Liabilities</p>
            {isLoading ? (
              <Skeleton className="h-7 w-28 mt-1" />
            ) : (
              <p className="text-xl font-bold text-gray-800">{formatCurrency(liabilities)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
