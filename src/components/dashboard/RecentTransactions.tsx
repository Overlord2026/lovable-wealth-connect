
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface Transaction {
  id: string;
  account_id: string;
  amount: number;
  transaction_date: string;
  category: string;
  description: string;
  account_name?: string;
}

export function RecentTransactions({ isLoading: parentLoading }: { isLoading: boolean }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchTransactions() {
      try {
        setIsLoading(true);
        
        // First get transactions
        const { data: transactionData, error: transactionError } = await supabase
          .from('transactions')
          .select('*')
          .order('transaction_date', { ascending: false })
          .limit(5) as { data: Transaction[] | null; error: Error | null };
          
        if (transactionError) throw transactionError;
        
        // If we have transactions, fetch account names
        if (transactionData && transactionData.length > 0) {
          const accountIds = transactionData.map(t => t.account_id).filter(id => id);
          
          if (accountIds.length > 0) {
            const { data: accountsData, error: accountsError } = await supabase
              .from('financial_accounts')
              .select('id, name')
              .in('id', accountIds) as { data: { id: string; name: string }[] | null; error: Error | null };
              
            if (accountsError) throw accountsError;
            
            // Map account names to transactions
            const accountMap: Record<string, string> = {};
            if (accountsData) {
              accountsData.forEach(account => {
                accountMap[account.id] = account.name;
              });
            }
            
            // Add account names to transactions
            const enrichedTransactions = transactionData.map(transaction => ({
              ...transaction,
              account_name: transaction.account_id ? accountMap[transaction.account_id] : 'Unlinked'
            }));
            
            setTransactions(enrichedTransactions);
          } else {
            setTransactions(transactionData);
          }
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast.error("Failed to load recent transactions");
      } finally {
        setIsLoading(false);
      }
    }
    
    if (!parentLoading) {
      fetchTransactions();
    }
  }, [parentLoading]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD'
    }).format(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Show a message if no transactions are available
  if (!isLoading && transactions.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <h3 className="text-lg font-medium text-gray-700">No transactions found</h3>
        <p className="text-gray-500 mt-2">Add transactions to track your spending</p>
        <Button className="mt-4 bg-wealth-700 hover:bg-wealth-800">
          Add Transaction
        </Button>
      </div>
    );
  }
  
  return (
    <div className="overflow-hidden rounded-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Account
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            // Skeleton loading state
            Array(5).fill(0).map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </td>
              </tr>
            ))
          ) : (
            transactions.map(transaction => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {transaction.category}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {transaction.account_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(transaction.transaction_date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span 
                    className={`text-sm font-medium ${
                      transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {formatCurrency(transaction.amount)}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-center">
        <Button variant="outline">View All Transactions</Button>
      </div>
    </div>
  );
}
