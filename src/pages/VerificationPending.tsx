
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, ClipboardList, UserCheck, Shield } from "lucide-react";

export default function VerificationPending() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-wealth-600 shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-wealth-800 to-wealth-700 text-white rounded-t-lg py-8">
              <CheckCircle className="h-16 w-16 mx-auto mb-4 text-wealth-200" />
              <CardTitle className="text-3xl">Registration Complete</CardTitle>
              <CardDescription className="text-wealth-200 text-lg">
                Your account is pending verification
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-wealth-900 mb-4">Thank You for Joining WealthConnect</h2>
                <p className="text-gray-600 mb-6">
                  Your professional account has been created and is now awaiting verification. 
                  This process helps ensure the integrity and trustworthiness of our platform.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-wealth-50 rounded-lg border border-wealth-100">
                  <ClipboardList className="h-10 w-10 mx-auto mb-3 text-wealth-700" />
                  <h3 className="font-medium text-wealth-900 mb-2">Document Review</h3>
                  <p className="text-sm text-gray-600">
                    Our team is reviewing your professional credentials
                  </p>
                </div>
                
                <div className="text-center p-6 bg-wealth-50 rounded-lg border border-wealth-100">
                  <UserCheck className="h-10 w-10 mx-auto mb-3 text-wealth-700" />
                  <h3 className="font-medium text-wealth-900 mb-2">Identity Verification</h3>
                  <p className="text-sm text-gray-600">
                    Confirming your professional identity and credentials
                  </p>
                </div>
                
                <div className="text-center p-6 bg-wealth-50 rounded-lg border border-wealth-100">
                  <Shield className="h-10 w-10 mx-auto mb-3 text-wealth-700" />
                  <h3 className="font-medium text-wealth-900 mb-2">Account Security</h3>
                  <p className="text-sm text-gray-600">
                    Setting up enhanced security for your professional account
                  </p>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                <h3 className="font-medium text-amber-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-amber-700 space-y-2">
                  <li>• You'll receive email confirmation once verification is complete (typically 1-2 business days)</li>
                  <li>• You can login anytime to check your verification status</li>
                  <li>• Our team may contact you if additional information is needed</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button 
                  onClick={() => navigate("/login")}
                  className="bg-wealth-800 hover:bg-wealth-900"
                >
                  Login to Your Account
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")}
                >
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
