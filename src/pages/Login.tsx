
import { LoginForm } from "@/components/LoginForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthCard } from "@/components/AuthCard";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <AuthCard activeTab="login">
          <LoginForm />
        </AuthCard>
      </main>
      <Footer />
    </div>
  );
}
