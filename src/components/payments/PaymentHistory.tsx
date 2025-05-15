
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export function PaymentHistory() {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!user) return;
    
    async function fetchPayments() {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .eq("category", "advisor_fee")
          .order("transaction_date", { ascending: false });
          
        if (error) throw error;
        
        setPayments(data || []);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchPayments();
  }, [user]);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>Your recent advisor fee payments</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            No payment history found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{formatDate(payment.transaction_date)}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell className="text-right">{formatCurrency(payment.amount)}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Paid
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
