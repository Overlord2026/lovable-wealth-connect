
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, DollarSign, User } from "lucide-react";

interface PaymentFormProps {
  onClose: () => void;
  onSuccess: (payment: any) => void;
}

export function PaymentForm({ onClose, onSuccess }: PaymentFormProps) {
  const { user } = useAuth();
  const [amount, setAmount] = useState(100);
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiryDate, setExpiryDate] = useState("12/25");
  const [cvv, setCvv] = useState("123");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Simple validation
    if (amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (!cardNumber || !expiryDate || !cvv || !name) {
      toast.error("Please fill in all payment details");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await supabase.functions.invoke("mock-stripe", {
        body: { userId: user.id, amount }
      });
      
      if (response.error) {
        throw new Error(response.error.message || "Payment failed");
      }
      
      toast.success(`Payment successful! $${amount} advisor fee paid.`);
      onSuccess(response.data.transaction);
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || "";
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };
  
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Pay Advisor Fee</DialogTitle>
          <DialogDescription>
            Enter your payment details to complete the transaction
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Payment Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-9"
                placeholder="Amount"
                min="1"
                step="1"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name on Card
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-9"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="cardNumber" className="text-sm font-medium">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="pl-9"
                placeholder="4242 4242 4242 4242"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="expiryDate" className="text-sm font-medium">
                Expiry Date
              </label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="cvv" className="text-sm font-medium">
                CVV
              </label>
              <Input
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>
          
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
