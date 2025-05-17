
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AnalyzeHeader } from "@/components/panorama/analyze/AnalyzeHeader";
import { AnalyzeGrid } from "@/components/panorama/analyze/AnalyzeGrid";
import { toast } from "@/components/ui/use-toast";

export default function PanoramaAnalyze() {
  const [isLoading, setIsLoading] = useState(true);
  const { viewId } = useParams<{ viewId: string }>();
  
  useEffect(() => {
    const loadAnalysisData = async () => {
      try {
        // Here we would load data specific to the analysis view
        // For now, we'll just simulate loading
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading analysis data:", error);
        toast({
          title: "Error",
          description: "Failed to load analysis data",
          variant: "destructive"
        });
      }
    };

    loadAnalysisData();
  }, [viewId]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
              <Link to="/panorama">
                <Button variant="outline" size="sm" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Panorama
                </Button>
              </Link>
              
              <AnalyzeHeader isLoading={isLoading} viewId={viewId || ""} />
            </div>
            
            <AnalyzeGrid isLoading={isLoading} />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
