
import { LoginForm } from "@/components/LoginForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-navy-800">Welcome Back</h1>
            <p className="mt-2 text-navy-600">Sign in to access your account</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
