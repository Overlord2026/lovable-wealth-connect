
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Mail } from "lucide-react";

export default function VerificationPending() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="max-w-md w-full p-8 bg-white/5 backdrop-blur-md rounded-lg shadow-xl border border-wealth-800/20 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-wealth-800/10 p-3">
              <Mail className="h-12 w-12 text-wealth-300" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-wealth-100 mb-2">Verification Pending</h1>
          <p className="text-wealth-300 mb-6">
            Thank you for registering as a professional on WealthConnect. We've sent a verification email to your registered address.
          </p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-2 text-wealth-400">
              <CheckCircle className="h-5 w-5 text-wealth-600" />
              <span>Check your email for verification instructions</span>
            </div>
            <div className="flex items-center space-x-2 text-wealth-400">
              <CheckCircle className="h-5 w-5 text-wealth-600" />
              <span>Our team will review your credentials</span>
            </div>
            <div className="flex items-center space-x-2 text-wealth-400">
              <CheckCircle className="h-5 w-5 text-wealth-600" />
              <span>You'll receive access once verified</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/")} 
              variant="outline" 
              className="w-full border-wealth-700 text-wealth-200 hover:bg-wealth-800/20"
            >
              Return to Home
            </Button>
            <p className="text-sm text-wealth-500">
              Questions? Contact <a href="mailto:support@wealthconnect.com" className="text-wealth-400 underline">support@wealthconnect.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
