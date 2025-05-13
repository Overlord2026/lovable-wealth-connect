
import { LoginForm } from "@/components/LoginForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="font-serif text-3xl font-bold text-glow">Welcome Back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to access your account</p>
          </div>
          <div className="premium-card rounded-xl shadow-xl border border-border/50 overflow-hidden bg-card/80 backdrop-blur-sm">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
