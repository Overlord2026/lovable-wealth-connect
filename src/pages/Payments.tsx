
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { PaymentHistory } from "@/components/payments/PaymentHistory";
import { PaymentForm } from "@/components/payments/PaymentForm";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

export default function Payments() {
  const { user } = useAuth();
  const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [latestPayment, setLatestPayment] = useState(null);
  
  const handleQuickPay = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const response = await supabase.functions.invoke("mock-stripe", {
        body: { userId: user.id, amount: 100 }
      });
      
      if (response.error) {
        throw new Error(response.error.message || "Payment failed");
      }
      
      setLatestPayment(response.data.transaction);
      toast.success("Payment successful! $100 advisor fee paid.");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
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
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Payments</h1>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setIsPaymentFormOpen(true)}
                    >
                      Custom Payment
                    </Button>
                    <Button 
                      onClick={handleQuickPay}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Quick Pay $100"}
                    </Button>
                  </div>
                </div>
                
                {latestPayment && (
                  <Card className="mb-6 bg-green-50 border-green-200">
                    <CardHeader>
                      <CardTitle>Payment Successful</CardTitle>
                      <CardDescription>Your payment has been processed successfully</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Amount:</div>
                        <div>${Math.abs(latestPayment.amount)}</div>
                        
                        <div className="font-medium">Date:</div>
                        <div>{new Date(latestPayment.transaction_date).toLocaleDateString()}</div>
                        
                        <div className="font-medium">Description:</div>
                        <div>{latestPayment.description}</div>
                        
                        <div className="font-medium">Transaction ID:</div>
                        <div>{latestPayment.id.slice(0, 8)}</div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                    <CardDescription>Overview of your advisor fees and payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Current Balance</CardDescription>
                          <CardTitle className="text-2xl">$0.00</CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Next Payment</CardDescription>
                          <CardTitle className="text-2xl">$100.00</CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardDescription>Due Date</CardDescription>
                          <CardTitle className="text-2xl">
                            {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                
                <PaymentHistory />
                
                {isPaymentFormOpen && (
                  <PaymentForm 
                    onClose={() => setIsPaymentFormOpen(false)}
                    onSuccess={(payment) => {
                      setLatestPayment(payment);
                      setIsPaymentFormOpen(false);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
