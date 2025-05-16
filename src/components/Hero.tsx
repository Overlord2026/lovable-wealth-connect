
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { useState } from "react";
import { DataPrivacyControl, PrivacyPreferences } from "@/components/DataPrivacyControl";

export function Hero() {
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);

  const handleSavePreferences = (preferences: PrivacyPreferences) => {
    console.log("Privacy preferences saved:", preferences);
    // Here you would typically save these preferences to localStorage or a database
  };

  return (
    <div className="hero-gradient min-h-screen flex items-center text-foreground pt-16 relative">
      <div className="hero-overlay"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight hero-title">
            Secure your financial future with <span className="text-accent text-glow">expert guidance</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-muted-foreground/90 max-w-2xl leading-relaxed hero-text">
            Connect with top financial advisors tailored to your needs. Build wealth, plan your retirement, and achieve your financial goals with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/advisors">
              <Button className="bg-[#00B8BF] hover:bg-[#00B8BF]/90 text-white text-lg px-8 py-6 rounded-md flex items-center gap-2 group hover-glow">
                Find an Advisor
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="#solutions">
              <Button variant="outline" className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6 rounded-md bg-secondary/20 backdrop-blur-sm">
                Learn More
              </Button>
            </Link>
            <Button 
              variant="outline" 
              onClick={() => setPrivacyDialogOpen(true)}
              className="border-border text-foreground hover:bg-secondary text-lg px-6 py-6 rounded-md bg-secondary/20 backdrop-blur-sm flex items-center gap-2"
            >
              <Shield className="h-5 w-5 text-accent" />
              Privacy Settings
            </Button>
          </div>
          
          <div className="mt-16 pt-8 border-t border-border/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center premium-card p-4 rounded-lg hover-glow shadow-lg">
                <p className="text-3xl font-bold text-accent">500+</p>
                <p className="text-sm text-muted-foreground">Financial Advisors</p>
              </div>
              <div className="text-center premium-card p-4 rounded-lg hover-glow shadow-lg">
                <p className="text-3xl font-bold text-accent">15k+</p>
                <p className="text-sm text-muted-foreground">Clients Served</p>
              </div>
              <div className="text-center premium-card p-4 rounded-lg hover-glow shadow-lg">
                <p className="text-3xl font-bold text-accent">98%</p>
                <p className="text-sm text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="text-center premium-card p-4 rounded-lg hover-glow shadow-lg">
                <p className="text-3xl font-bold text-accent">$2B+</p>
                <p className="text-sm text-muted-foreground">Assets Managed</p>
              </div>
            </div>
          </div>
          
          {/* Data Privacy Control Dialog */}
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
