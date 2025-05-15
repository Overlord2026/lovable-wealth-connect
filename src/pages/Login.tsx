
import { LoginForm } from "@/components/LoginForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthCard } from "@/components/AuthCard";
import { Lock } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <AuthCard activeTab="login">
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm font-semibold text-amber-400">Boutique Family Office</span>
            <Lock className="w-5 h-5 text-amber-400"/>
            <span className="text-sm text-neutral-400">Secure login</span>
          </div>
          <LoginForm />
        </AuthCard>
      </main>
      <Footer />
    </div>
  );
}
