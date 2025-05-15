
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneCall, Mail, Clock } from 'lucide-react';

export function ConciergeContact() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Personal Concierge Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Our dedicated concierge team is available 24/7 to assist with all your luxury travel needs.
          Whether you need to customize your booking or require assistance during your journey.
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <PhoneCall className="h-4 w-4 text-primary" />
            <span>+1 (888) 555-LUXURY</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <span>concierge@wealthconnect.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>24/7 Availability</span>
          </div>
        </div>
        
        <div className="pt-2 border-t text-sm">
          <p className="font-medium">For Custom Travel Arrangements:</p>
          <p className="text-muted-foreground">
            Our VIP clients enjoy priority access to exclusive destinations and events.
            Contact your dedicated advisor to discuss bespoke travel experiences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
