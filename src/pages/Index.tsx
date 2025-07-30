
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { AdvisorSection } from "@/modules/marketplace/components/advisors/AdvisorSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { MobileNav } from "@/components/MobileNav";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Update the page title to reflect the new brand
  useEffect(() => {
    document.title = "Family Office Marketplace | Elite Wealth Solutions";
  }, []);

  // If user is authenticated, redirect to dashboard or the stored returnTo URL
  useEffect(() => {
    if (user) {
      const returnTo = sessionStorage.getItem("returnTo");
      if (returnTo) {
        sessionStorage.removeItem("returnTo");
        navigate(returnTo);
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        <AdvisorSection />
        <TestimonialSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Index;
