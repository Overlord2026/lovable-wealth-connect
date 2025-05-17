
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { DataPrivacyControl, PrivacyPreferences } from "@/components/DataPrivacyControl";

export function Hero() {
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);

  // Check local storage on component mount to determine if we should show the privacy dialog
  useEffect(() => {
    const hasConsented = localStorage.getItem('privacyConsentGiven');
    
    // If no consent record exists, open the dialog automatically
    if (!hasConsented) {
      // Add a small delay so the user can see the page first
      const timer = setTimeout(() => {
        setPrivacyDialogOpen(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSavePreferences = (preferences: PrivacyPreferences) => {
    console.log("Privacy preferences saved:", preferences);
    // Privacy preferences are now saved in local storage in the DataPrivacyControl component
  };

  return (
    <div className="hero-gradient min-h-screen flex items-center text-foreground pt-16 relative">
      <div className="hero-overlay"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight hero-title">
            Elite wealth solutions with <span className="text-gold text-glow">Family Office Marketplace</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-muted-foreground/90 max-w-2xl leading-relaxed hero-text">
            Connect with premier financial advisors tailored to your family's unique needs. Build wealth, protect assets, and secure your family's legacy with military-grade security.
          </p>
          
          <div className="flex flex-wrap gap-3 mb-10">
            <span className="bg-secondary/30 text-white text-xs px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm flex items-center">
              <Shield className="h-3 w-3 mr-1 text-gold" />
              Military-Grade Security
            </span>
            <span className="bg-secondary/30 text-white text-xs px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm flex items-center">
              <Lock className="h-3 w-3 mr-1 text-gold" />
              SOC-2 Compliant
            </span>
            <span className="bg-secondary/30 text-white text-xs px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm flex items-center">
              <Shield className="h-3 w-3 mr-1 text-gold" />
              HIPAA Compliant
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/advisors">
              <Button variant="premium" className="text-lg px-8 py-6 rounded-md flex items-center gap-2 group hover-glow">
                Find an Advisor
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="#solutions">
              <Button variant="outline" className="border-gold text-gold hover:bg-gold/10 text-lg px-8 py-6 rounded-md bg-secondary/20 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => setPrivacyDialogOpen(true)}
              className="border-gold text-gold hover:bg-gold/10 text-lg px-6 py-6 rounded-md bg-secondary/20 backdrop-blur-sm flex items-center gap-2"
            >
              <Shield className="h-5 w-5 text-gold" />
              Privacy Settings
            </Button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center premium-card p-4 rounded-lg hover-glow shadow-lg">
                <p className="text-3xl font-bold text-gold">500+</p>
                <p className="text-sm text-white">Family Advisors</p>
              </div>
              <div className="text-center premium-card p-4 rounded-lg hover-glow shadow-lg">
                <p className="text-3xl font-bold text-gold">$4B+</p>
                <p className="text-sm text-white">Assets Protected</p>
              </div>
              <div className="text-center premium-card p-4 rounded-lg hover-glow shadow-lg">
                <p className="text-3xl font-bold text-gold">100%</p>
                <p className="text-sm text-white">U.S. Based</p>
              </div>
              <div className="text-center premium-card p-4 rounded-lg hover-glow shadow-lg">
                <p className="text-3xl font-bold text-gold">40+</p>
                <p className="text-sm text-white">Years Experience</p>
              </div>
            </div>
          </div>
          
          {/* Data Privacy Control Sheet */}
          <DataPrivacyControl
            open={privacyDialogOpen}
            onOpenChange={setPrivacyDialogOpen}
            onSave={handleSavePreferences}
          />
        </div>
      </div>
    </div>
  );
}
