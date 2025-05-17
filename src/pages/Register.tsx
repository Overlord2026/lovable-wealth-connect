
import { useState } from "react";
import { RegisterForm } from "@/components/RegisterForm";
import { ProfessionalRegisterForm } from "@/components/ProfessionalRegisterForm";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { UserCheck, Briefcase } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";
import { LoginPageNav } from "@/components/navigation/LoginPageNav";
import { Link } from "react-router-dom";

export default function Register() {
  const [activeTab, setActiveTab] = useState("client");

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      {/* Custom header for register page */}
      <header className="fixed w-full z-50 bg-[#1B1E2E] shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/">
              <div className="flex items-center">
                <span className="text-xl font-serif font-bold text-white">Family Office <span className="text-gold">Marketplace</span></span>
              </div>
            </Link>
          </div>
          <LoginPageNav />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 py-12 px-4">
        <AuthCard activeTab="register">
          <Tabs 
            defaultValue="client" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6 w-full">
              <TabsTrigger value="client" className="flex items-center justify-center gap-2">
                <UserCheck className="h-4 w-4" />
                <span>Client</span>
              </TabsTrigger>
              <TabsTrigger value="professional" className="flex items-center justify-center gap-2">
                <Briefcase className="h-4 w-4" /> 
                <span>Professional</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="client" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="text-center mb-4">
                <h1 className="text-2xl font-bold text-white">Create a Client Account</h1>
                <p className="text-sm text-muted-foreground mt-1">Join WealthConnect to find your perfect financial advisor</p>
              </div>
              <RegisterForm />
            </TabsContent>
            
            <TabsContent value="professional" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <ProfessionalRegisterForm />
            </TabsContent>
          </Tabs>
        </AuthCard>
      </main>
      <Footer />
    </div>
  );
}
