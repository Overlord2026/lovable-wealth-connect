
import { LoginForm } from "@/components/LoginForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthCard } from "@/components/AuthCard";
import { Lock, ShieldCheck } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <AuthCard activeTab="login">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-white mb-1">Log in securely</h1>
            <p className="text-sm text-neutral-400">Access your family office portal</p>
          </div>
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-sm font-semibold text-amber-400">Boutique Family Office</span>
            <Lock className="w-5 h-5 text-amber-400"/>
            <span className="text-sm text-neutral-400">Secure login</span>
          </div>
          <LoginForm />
          <div className="mt-4 text-center text-xs text-neutral-500">
            Protected by industry-leading security protocols
            <div className="flex items-center justify-center mt-1 text-green-400">
              <ShieldCheck className="w-4 h-4 mr-1"/> 256-bit encryption
            </div>
          </div>
        </AuthCard>
      </main>
      <Footer />
    </div>
  );
}
