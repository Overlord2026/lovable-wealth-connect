
import { RegisterForm } from "@/components/RegisterForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <RegisterForm />
      </main>
      <Footer />
    </div>
  );
}
