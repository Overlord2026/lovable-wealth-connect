
import React, { useState } from 'react';
import { TravelOption } from '@/services/luxuryTravelService';
import { TravelOptionCard } from './TravelOptionCard';
import { Button } from '@/components/ui/button';

interface TravelOptionsProps {
  options: TravelOption[];
  onSelectOption: (option: TravelOption) => void;
}

export function TravelOptions({ options, onSelectOption }: TravelOptionsProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filterTypes = ['jet', 'hotel', 'yacht', 'experience'];
  
  const filteredOptions = activeFilter 
    ? options.filter(option => option.type === activeFilter)
    : options;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeFilter === null ? "default" : "outline"}
          onClick={() => setActiveFilter(null)}
        >
          All Options
        </Button>
        {filterTypes.map(type => (
          <Button 
            key={type}
            variant={activeFilter === type ? "default" : "outline"}
            onClick={() => setActiveFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOptions.map(option => (
          <TravelOptionCard 
            key={option.id}
            option={option}
            onSelect={onSelectOption}
          />
        ))}
      </div>
      
      {filteredOptions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No travel options found with the selected filter.</p>
        </div>
      )}
    </div>
  );
}
