
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, CheckCircle, Users } from 'lucide-react';
import { format } from 'date-fns';

interface BookingConfirmationProps {
  bookingId: string;
  optionName: string;
  optionType: string;
  location: string;
  date: string;
  passengers: number;
  totalPrice: number;
  onDone: () => void;
}

export function BookingConfirmation({
  bookingId,
  optionName,
  optionType,
  location,
  date,
  passengers,
  totalPrice,
  onDone
}: BookingConfirmationProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formattedDate = format(new Date(date), 'MMMM dd, yyyy');
  
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold">Booking Confirmed</h2>
        <p className="text-muted-foreground">
          Your luxury {optionType} booking has been confirmed
        </p>
      </div>
      
      <div className="border rounded-lg p-6 space-y-4 bg-muted/50">
        <div>
          <h3 className="font-bold text-lg">{optionName}</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="text-left">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Date</span>
            </div>
            <p className="font-medium">{formattedDate}</p>
          </div>
          
          <div className="text-left">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Guests</span>
            </div>
            <p className="font-medium">{passengers}</p>
          </div>
        </div>
        
        <div className="pt-2">
          <p className="text-sm text-muted-foreground">Booking Reference</p>
          <p className="font-mono">{bookingId.substring(0, 8).toUpperCase()}</p>
        </div>
        
        <div className="pt-4 border-t">
          <div className="flex justify-between">
            <span className="font-medium">Total Cost</span>
            <span className="font-bold">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
      
      <div className="max-w-md mx-auto border rounded-lg p-4 bg-amber-50 text-amber-900">
        <p className="text-sm">
          Your personal concierge will contact you within 24 hours to finalize all details and answer any questions regarding your booking.
        </p>
      </div>
      
      <Button onClick={onDone}>Return to Luxury Travel</Button>
    </div>
  );
}
