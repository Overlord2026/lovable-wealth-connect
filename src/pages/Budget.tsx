
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { BudgetSummary } from "@/components/budget/BudgetSummary";
import { ExpenseBreakdown } from "@/components/budget/ExpenseBreakdown";
import { IncomeSources } from "@/components/budget/IncomeSources";
import { SavingsProgress } from "@/components/budget/SavingsProgress";
import { Budget, BudgetCategory, createSampleBudget, fetchBudgetCategories, fetchUserBudget } from "@/services/budgetService";

export default function BudgetPage() {
  const { user } = useAuth();
  const [budget, setBudget] = useState<Budget | null>(null);
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBudgetData() {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Try to fetch existing budget
        const userBudget = await fetchUserBudget(user.id);
        
        if (userBudget) {
          setBudget(userBudget);
          
          // Fetch categories for the budget
          const budgetCategories = await fetchBudgetCategories(userBudget.id);
          setCategories(budgetCategories);
          
          toast.success("Budget loaded successfully!");
        } else {
          // Create a sample budget if none exists
          const newBudget = await createSampleBudget(user.id);
          
          if (newBudget) {
            setBudget(newBudget);
            
            // Fetch categories for the new budget
            const budgetCategories = await fetchBudgetCategories(newBudget.id);
            setCategories(budgetCategories);
          }
        }
      } catch (error) {
        console.error("Error loading budget data:", error);
        toast.error("Failed to load budget data");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadBudgetData();
  }, [user]);
  
  const handleRefreshBudget = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const newBudget = await createSampleBudget(user.id);
      
      if (newBudget) {
        setBudget(newBudget);
        
        // Fetch categories for the new budget
        const budgetCategories = await fetchBudgetCategories(newBudget.id);
        setCategories(budgetCategories);
        
        toast.success("Budget refreshed successfully!");
      }
    } catch (error) {
      console.error("Error refreshing budget:", error);
      toast.error("Failed to refresh budget");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <DashboardSidebar />
              
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">{budget?.name || "Monthly Budget"}</h1>
                  <Button onClick={handleRefreshBudget} disabled={isLoading}>
                    Refresh Sample Budget
                  </Button>
                </div>
                
                <BudgetSummary budget={budget} isLoading={isLoading} />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ExpenseBreakdown categories={categories} isLoading={isLoading} />
                  <IncomeSources categories={categories} isLoading={isLoading} />
                </div>
                
                <SavingsProgress budget={budget} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
