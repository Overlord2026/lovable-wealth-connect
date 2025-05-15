
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AccountsSummary } from "@/components/dashboard/AccountsSummary";
import { AssetAllocation } from "@/components/dashboard/AssetAllocation";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { NetWorthChart } from "@/components/dashboard/NetWorthChart";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface FinancialAccount {
  id: string;
  balance: number;
  account_type: string;
}

export default function Dashboard() {
  const [accountsTotal, setAccountsTotal] = useState(0);
  const [assetsTotal, setAssetsTotal] = useState(0);
  const [liabilitiesTotal, setLiabilitiesTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadFinancialData() {
      try {
        setIsLoading(true);
        
        // Load accounts data with type assertion for TypeScript
        const { data: accounts, error: accountsError } = await supabase
          .from('financial_accounts')
          .select('*') as { data: FinancialAccount[] | null; error: Error | null };
          
        if (accountsError) throw accountsError;
        
        // Calculate totals
        let assets = 0;
        let liabilities = 0;
        
        accounts?.forEach(account => {
          if (['checking', 'savings', 'investment', 'retirement', 'crypto'].includes(account.account_type)) {
            assets += Number(account.balance);
          } else if (['credit_card', 'loan', 'mortgage'].includes(account.account_type)) {
            liabilities += Math.abs(Number(account.balance));
          }
        });
        
        setAccountsTotal(accounts?.length || 0);
        setAssetsTotal(assets);
        setLiabilitiesTotal(liabilities);
      } catch (error) {
        console.error("Error loading financial data:", error);
        toast.error("Failed to load financial data");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadFinancialData();
  }, []);
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <DashboardSidebar />
              
              <div className="flex-1">
                <DashboardHeader 
                  netWorth={assetsTotal - liabilitiesTotal}
                  assets={assetsTotal}
                  liabilities={liabilitiesTotal}
                  isLoading={isLoading}
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-lg shadow p-6 col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Net Worth Trend</h2>
                    <NetWorthChart />
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
                    <AccountsSummary isLoading={isLoading} />
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Asset Allocation</h2>
                    <AssetAllocation isLoading={isLoading} />
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-6 col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
                    <RecentTransactions isLoading={isLoading} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
