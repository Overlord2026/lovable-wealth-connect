
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/sonner";

interface Account {
  id: string;
  name: string;
  institution: string;
  account_type: string;
  balance: number;
}

export function AccountsSummary({ isLoading: parentLoading }: { isLoading: boolean }) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchAccounts() {
      try {
        setIsLoading(true);
        
        // Use the custom type assertion to handle TypeScript errors
        const { data, error } = await supabase
          .from('financial_accounts')
          .select('*')
          .order('account_type', { ascending: true }) as { data: Account[] | null; error: Error | null };
          
        if (error) throw error;
        
        setAccounts(data || []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
        toast.error("Failed to load accounts");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (!parentLoading) {
      fetchAccounts();
    }
  }, [parentLoading]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD'
    }).format(value);
  };
  
  const getAccountTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'checking': 'Checking',
      'savings': 'Savings',
      'investment': 'Investment',
      'retirement': 'Retirement',
      'credit_card': 'Credit Card',
      'loan': 'Loan',
      'mortgage': 'Mortgage',
      'crypto': 'Crypto',
      'other': 'Other'
    };
    
    return labels[type] || type;
  };
  
  // Show a message if no accounts are available
  if (!isLoading && accounts.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <h3 className="text-lg font-medium text-gray-700">No accounts found</h3>
        <p className="text-gray-500 mt-2">Add your financial accounts to track your wealth</p>
        <button 
          className="mt-4 px-4 py-2 bg-wealth-700 text-white rounded-md hover:bg-wealth-800"
        >
          Add Account
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {isLoading ? (
        // Skeleton loading state
        Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex justify-between items-center p-3 border rounded-md">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-24" />
          </div>
        ))
      ) : (
        accounts.map(account => (
          <div 
            key={account.id}
            className={`flex justify-between items-center p-3 border rounded-md ${
              ['credit_card', 'loan', 'mortgage'].includes(account.account_type)
                ? 'border-red-200 bg-red-50'
                : 'border-green-200 bg-green-50'
            }`}
          >
            <div>
              <p className="font-medium">{account.name}</p>
              <p className="text-xs text-gray-500">
                {account.institution} • {getAccountTypeLabel(account.account_type)}
              </p>
            </div>
            <span 
              className={`font-semibold ${
                ['credit_card', 'loan', 'mortgage'].includes(account.account_type)
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {formatCurrency(account.balance)}
            </span>
          </div>
        ))
      )}
      
      <button 
        className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
      >
        <span className="mr-2">+</span> Add Account
      </button>
    </div>
  );
}
