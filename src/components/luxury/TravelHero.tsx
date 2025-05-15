
import React from 'react';
import { Plane } from 'lucide-react';

export function TravelHero() {
  return (
    <div className="relative w-full bg-black text-white overflow-hidden rounded-xl">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80')` 
        }}
      />
      <div className="relative z-10 px-8 py-16 md:py-24 lg:py-32 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Plane className="h-10 w-10 mr-2" />
          <h1 className="text-4xl font-bold">Luxury Travel</h1>
        </div>
        <p className="text-xl md:text-2xl mb-6">
          Experience the extraordinary with our exclusive luxury travel offerings.
          From private jets to luxury yachts, we provide unparalleled access to the world's most coveted destinations.
        </p>
        <p className="text-base md:text-lg opacity-80">
          Our dedicated concierge team is available 24/7 to curate bespoke experiences tailored to your preferences.
        </p>
      </div>
    </div>
  );
}
