
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PanoramaHeader } from "@/components/panorama/PanoramaHeader";
import { PanoramaControlPanel } from "@/components/panorama/PanoramaControlPanel";
import { PanoramaOverview } from "@/components/panorama/PanoramaOverview";
import { AssetBreakdown } from "@/components/panorama/AssetBreakdown";
import { PerformanceChart } from "@/components/panorama/PerformanceChart";
import { RiskExposure } from "@/components/panorama/RiskExposure";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export default function Panorama() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalLiabilities, setTotalLiabilities] = useState(0);
  const [assetBreakdown, setAssetBreakdown] = useState<Record<string, number>>({});
  const [currentView, setCurrentView] = useState<string>("default");
  const [availableViews, setAvailableViews] = useState<{id: string, name: string, is_default: boolean}[]>([]);
  
  useEffect(() => {
    async function loadPanoramaData() {
      try {
        setIsLoading(true);
        
        // Load financial accounts data
        const { data: accounts, error: accountsError } = await supabase
          .from('financial_accounts')
          .select('*');
          
        if (accountsError) throw accountsError;
        
        // Calculate totals
        let assets = 0;
        let liabilities = 0;
        const breakdown: Record<string, number> = {};
        
        accounts?.forEach(account => {
          if (['checking', 'savings', 'investment', 'retirement', 'crypto'].includes(account.account_type)) {
            assets += Number(account.balance);
            
            // Create asset breakdown by type
            const type = account.account_type;
            breakdown[type] = (breakdown[type] || 0) + Number(account.balance);
          } else if (['credit_card', 'loan', 'mortgage'].includes(account.account_type)) {
            liabilities += Math.abs(Number(account.balance));
          }
        });
        
        // Load user's panorama views
        const { data: views, error: viewsError } = await supabase
          .from('panorama_views')
          .select('id, name, is_default');
          
        if (viewsError) throw viewsError;
        
        // If no views exist, create a default one
        if (!views || views.length === 0) {
          const user = await supabase.auth.getUser();
          const userId = user.data.user?.id;
          
          if (!userId) throw new Error("User not authenticated");
          
          const { data: newView, error: newViewError } = await supabase
            .from('panorama_views')
            .insert([{
              name: 'Default View',
              is_default: true,
              filters: {},
              layout_config: {
                showPerformance: true,
                showRisk: true,
                showBreakdown: true
              },
              user_id: userId
            }])
            .select('id, name, is_default')
            .single();
            
          if (newViewError) throw newViewError;
          
          setAvailableViews(newView ? [newView] : []);
          setCurrentView(newView?.id || 'default');
        } else {
          setAvailableViews(views);
          const defaultView = views.find(view => view.is_default);
          setCurrentView(defaultView?.id || views[0]?.id || 'default');
        }
        
        setTotalAssets(assets);
        setTotalLiabilities(liabilities);
        setAssetBreakdown(breakdown);
      } catch (error) {
        console.error("Error loading panorama data:", error);
        toast({
          title: "Error",
          description: "Failed to load financial data for Panorama view",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPanoramaData();
  }, []);

  const handleViewChange = (viewId: string) => {
    setCurrentView(viewId);
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <div className="container mx-auto px-4 py-8">
            <PanoramaHeader 
              netWorth={totalAssets - totalLiabilities}
              assets={totalAssets}
              liabilities={totalLiabilities}
              isLoading={isLoading}
            />
            
            <PanoramaControlPanel 
              views={availableViews}
              currentView={currentView}
              onViewChange={handleViewChange}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              <div className="lg:col-span-12 bg-white rounded-lg shadow p-6">
                <PanoramaOverview 
                  assets={totalAssets}
                  liabilities={totalLiabilities}
                  isLoading={isLoading}
                />
              </div>
              
              <div className="lg:col-span-6 bg-white rounded-lg shadow p-6">
                <AssetBreakdown 
                  breakdown={assetBreakdown}
                  isLoading={isLoading}
                />
              </div>
              
              <div className="lg:col-span-6 bg-white rounded-lg shadow p-6">
                <PerformanceChart isLoading={isLoading} />
              </div>
              
              <div className="lg:col-span-12 bg-white rounded-lg shadow p-6">
                <RiskExposure isLoading={isLoading} />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
