
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface TravelOption {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'jet' | 'hotel' | 'yacht' | 'experience';
  location: string;
  image_url: string | null;
  available_from: string;
  available_to: string;
  duration: string;
  created_at: string;
  updated_at: string;
}

export interface TravelBooking {
  id?: string;
  user_id?: string;
  travel_option_id: string;
  booking_date: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  passengers: number;
  special_requests?: string | null;
  total_price: number;
  created_at?: string;
  updated_at?: string;
}

export const getTravelOptions = async (): Promise<TravelOption[]> => {
  const { data, error } = await supabase
    .from('luxury_travel_options')
    .select('*');

  if (error) {
    console.error("Error fetching travel options:", error);
    toast({
      title: "Error",
      description: "Failed to load travel options. Please try again.",
      variant: "destructive",
    });
    return [];
  }

  return data as TravelOption[];
};

export const getTravelOptionsByType = async (type: string): Promise<TravelOption[]> => {
  const { data, error } = await supabase
    .from('luxury_travel_options')
    .select('*')
    .eq('type', type);

  if (error) {
    console.error(`Error fetching ${type} options:`, error);
    toast({
      title: "Error",
      description: `Failed to load ${type} options. Please try again.`,
      variant: "destructive",
    });
    return [];
  }

  return data as TravelOption[];
};

export const getTravelOptionById = async (id: string): Promise<TravelOption | null> => {
  const { data, error } = await supabase
    .from('luxury_travel_options')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error("Error fetching travel option:", error);
    toast({
      title: "Error",
      description: "Failed to load travel option details. Please try again.",
      variant: "destructive",
    });
    return null;
  }

  return data as TravelOption;
};

export const createBooking = async (booking: TravelBooking): Promise<TravelBooking | null> => {
  const { data, error } = await supabase
    .from('luxury_travel_bookings')
    .insert(booking)
    .select()
    .single();

  if (error) {
    console.error("Error creating booking:", error);
    toast({
      title: "Error",
      description: "Failed to create booking. Please try again.",
      variant: "destructive",
    });
    return null;
  }

  toast({
    title: "Booking Confirmed",
    description: "Your luxury travel booking has been confirmed.",
  });

  return data as TravelBooking;
};

export const getUserBookings = async (): Promise<TravelBooking[]> => {
  const { data, error } = await supabase
    .from('luxury_travel_bookings')
    .select(`
      *,
      luxury_travel_options (*)
    `);

  if (error) {
    console.error("Error fetching user bookings:", error);
    toast({
      title: "Error",
      description: "Failed to load your bookings. Please try again.",
      variant: "destructive",
    });
    return [];
  }

  return data as unknown as TravelBooking[];
};
