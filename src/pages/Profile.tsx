
import { ProfileForm } from "@/components/ProfileForm";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Profile() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 py-12 px-4">
          <div className="container mx-auto">
            <ProfileForm />
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
