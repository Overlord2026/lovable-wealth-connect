
import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { TravelHero } from '@/components/luxury/TravelHero';
import { TravelOptions } from '@/components/luxury/TravelOptions';
import { BookingForm } from '@/components/luxury/BookingForm';
import { BookingConfirmation } from '@/components/luxury/BookingConfirmation';
import { ConciergeContact } from '@/components/luxury/ConciergeContact';
import { TravelOption, getTravelOptions } from '@/services/luxuryTravelService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plane } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function LuxuryTravel() {
  const [travelOptions, setTravelOptions] = useState<TravelOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<TravelOption | null>(null);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<{
    id: string;
    passengers: number;
    date: string;
    totalPrice: number;
  } | null>(null);
  
  useEffect(() => {
    const fetchTravelOptions = async () => {
      try {
        const options = await getTravelOptions();
        setTravelOptions(options);
      } catch (error) {
        console.error("Error fetching travel options:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTravelOptions();
  }, []);
  
  const handleSelectOption = (option: TravelOption) => {
    setSelectedOption(option);
  };
  
  const handleBookingSuccess = (bookingId: string) => {
    if (!selectedOption) return;
    
    const formData = new FormData(document.querySelector('form') as HTMLFormElement);
    const passengers = Number(formData.get('passengers')) || 1;
    const bookingDate = formData.get('booking_date') as string;
    
    setBookingDetails({
      id: bookingId,
      passengers,
      date: bookingDate,
      totalPrice: selectedOption.price * passengers
    });
    
    setBookingComplete(true);
  };
  
  const handleCloseDialog = () => {
    setSelectedOption(null);
    setBookingComplete(false);
    setBookingDetails(null);
  };
  
  return (
    <DashboardLayout>
      <div className="container mx-auto py-6 space-y-8">
        <PageHeader 
          heading="Luxury Travel" 
          subheading="Experience the extraordinary with exclusive travel offerings"
          icon={<Plane className="h-6 w-6" />}
        />
        
        <TravelHero />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Exclusive Offerings</h2>
            <Separator />
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <p>Loading luxury travel options...</p>
              </div>
            ) : (
              <TravelOptions 
                options={travelOptions} 
                onSelectOption={handleSelectOption}
              />
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Concierge Services</h2>
            <ConciergeContact />
          </div>
        </div>
      </div>
      
      <Dialog open={!!selectedOption} onOpenChange={() => !bookingComplete && handleCloseDialog()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {bookingComplete ? 'Booking Confirmation' : `Book ${selectedOption?.name}`}
            </DialogTitle>
          </DialogHeader>
          
          {selectedOption && !bookingComplete && (
            <BookingForm
              option={selectedOption}
              onSuccess={handleBookingSuccess}
              onCancel={handleCloseDialog}
            />
          )}
          
          {selectedOption && bookingComplete && bookingDetails && (
            <BookingConfirmation
              bookingId={bookingDetails.id}
              optionName={selectedOption.name}
              optionType={selectedOption.type}
              location={selectedOption.location}
              date={bookingDetails.date}
              passengers={bookingDetails.passengers}
              totalPrice={bookingDetails.totalPrice}
              onDone={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
