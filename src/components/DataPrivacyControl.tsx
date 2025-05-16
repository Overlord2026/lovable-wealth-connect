
import React, { useState } from "react";
import { Shield, Info, Lock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface DataPrivacyControlProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (preferences: PrivacyPreferences) => void;
}

export interface PrivacyPreferences {
  necessary: boolean; // Always true
  functional: boolean;
  statistical: boolean;
  marketing: boolean;
}

export function DataPrivacyControl({ open, onOpenChange, onSave }: DataPrivacyControlProps) {
  const [preferences, setPreferences] = useState<PrivacyPreferences>({
    necessary: true, // Always enabled
    functional: true,
    statistical: false,
    marketing: false,
  });

  const handleToggle = (key: keyof PrivacyPreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAcceptAll = () => {
    setPreferences({
      necessary: true,
      functional: true,
      statistical: true,
      marketing: true,
    });
  };

  const handleDeclineAll = () => {
    setPreferences({
      necessary: true, // Always keep necessary
      functional: false,
      statistical: false,
      marketing: false,
    });
  };

  const handleSave = () => {
    onSave(preferences);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 text-white max-w-2xl p-0 overflow-hidden">
        <Card className="border-0 bg-neutral-900 text-white">
          <DialogHeader className="mb-4 p-6 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-5 w-5 text-accent" />
              <DialogTitle className="text-2xl font-serif text-white">Your data is protected</DialogTitle>
            </div>
            <p className="text-muted-foreground/90 mt-2">
              The Boutique Family Office uses military-grade security measures and is fully SOC-2 and HIPAA compliant. 
              Choose which cookies you want to allow on our website.
              You can change these settings anytime.
            </p>
          </DialogHeader>

          <div className="space-y-5 px-6">
            {/* Necessary Cookies */}
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <h3 className="font-medium text-white mb-1">Necessary</h3>
                <p className="text-sm text-muted-foreground/90">
                  These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and account access.
                </p>
              </div>
              <Switch 
                checked={preferences.necessary} 
                disabled={true}
                className="data-[state=checked]:bg-accent/60 data-[state=checked]:opacity-80"
              />
            </div>

            {/* Functional Cookies */}
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <h3 className="font-medium text-white mb-1">Functional</h3>
                <p className="text-sm text-muted-foreground/90">
                  These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                </p>
              </div>
              <Switch 
                checked={preferences.functional} 
                onCheckedChange={() => handleToggle('functional')}
                className="data-[state=checked]:bg-accent"
              />
            </div>

            {/* Statistical Cookies */}
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <h3 className="font-medium text-white mb-1">Statistical</h3>
                <p className="text-sm text-muted-foreground/90">
                  These cookies collect information about how visitors use a website, for instance which pages visitors go to most often. We use this information to improve our website and services.
                </p>
              </div>
              <Switch 
                checked={preferences.statistical} 
                onCheckedChange={() => handleToggle('statistical')}
                className="data-[state=checked]:bg-accent"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div>
                <h3 className="font-medium text-white mb-1">Marketing</h3>
                <p className="text-sm text-muted-foreground/90">
                  These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.
                </p>
              </div>
              <Switch 
                checked={preferences.marketing} 
                onCheckedChange={() => handleToggle('marketing')}
                className="data-[state=checked]:bg-accent"
              />
            </div>
          </div>

          <div className="flex items-center mt-2 px-6 pb-3 text-sm text-muted-foreground/80">
            <Lock className="h-4 w-4 mr-2" />
            <p>
              Protected by military-grade encryption. View our{" "}
              <a href="/privacy-policy" className="underline hover:text-accent">
                Privacy Policy
              </a>
            </p>
          </div>

          <DialogFooter className="p-6 pt-4 bg-neutral-900 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-white/10">
            <div className="flex gap-2 self-start sm:self-auto">
              <Button 
                variant="outline" 
                onClick={handleDeclineAll}
                className="border-white/20 hover:bg-white/5 hover:border-white/30 text-white"
              >
                Decline All
              </Button>
              <Button 
                variant="secondary" 
                onClick={handleAcceptAll}
                className="bg-secondary/60 hover:bg-secondary/80"
              >
                Accept All
              </Button>
            </div>
            <Button 
              className="bg-accent hover:bg-accent/90 self-end sm:self-auto"
              onClick={handleSave}
            >
              Save Preferences
            </Button>
          </DialogFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
