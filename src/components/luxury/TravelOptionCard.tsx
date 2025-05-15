
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TravelOption } from '@/services/luxuryTravelService';

interface TravelOptionCardProps {
  option: TravelOption;
  onSelect: (option: TravelOption) => void;
}

export function TravelOptionCard({ option, onSelect }: TravelOptionCardProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={option.image_url || '/placeholder.svg'} 
          alt={option.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {option.type.charAt(0).toUpperCase() + option.type.slice(1)}
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{option.name}</CardTitle>
        <div className="text-sm text-muted-foreground flex items-center">
          <span className="mr-2">{option.location}</span>
          <span>•</span>
          <span className="ml-2">{option.duration}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm line-clamp-3">{option.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <p className="text-xl font-bold">{formatPrice(option.price)}</p>
        <Button onClick={() => onSelect(option)}>Book Now</Button>
      </CardFooter>
    </Card>
  );
}
