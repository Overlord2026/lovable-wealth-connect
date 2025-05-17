
import React from "react";
import { CookieToggle } from "./CookieToggle";
import { PrivacyPreferences } from "../DataPrivacyControl";

interface CookieDetailsProps {
  preferences: PrivacyPreferences;
  handleToggle: (key: keyof PrivacyPreferences) => void;
  showDetails: boolean;
}

export function CookieDetails({ preferences, handleToggle, showDetails }: CookieDetailsProps) {
  if (!showDetails) {
    return (
      <div className="mb-6 text-sm text-neutral-600">
        <p>
          Necessary cookies are always enabled as they're essential for the website to function. 
          Other cookie types help us improve your experience and our services.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mb-6">
      <CookieToggle
        title="Necessary"
        description="Essential for the website to function properly. They enable core functionality such as security and account access."
        checked={preferences.necessary}
        onChange={() => handleToggle('necessary')}
        disabled={true}
      />

      <CookieToggle
        title="Functional"
        description="Enable enhanced functionality and personalization of your experience on our website."
        checked={preferences.functional}
        onChange={() => handleToggle('functional')}
      />

      <CookieToggle
        title="Statistical"
        description="Help us understand how visitors interact with our website to improve our services."
        checked={preferences.statistical}
        onChange={() => handleToggle('statistical')}
      />

      <CookieToggle
        title="Marketing"
        description="Used to display personalized ads relevant to your interests across the web."
        checked={preferences.marketing}
        onChange={() => handleToggle('marketing')}
      />
    </div>
  );
}
