
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function usePanoramaDefaultView() {
  const { user } = useAuth();
  const [defaultViewId, setDefaultViewId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDefaultViewId = async () => {
      const { data, error } = await supabase
        .from('panorama_views')
        .select('id')
        .eq('is_default', true)
        .single();

      if (data && !error) {
        setDefaultViewId(data.id);
      } else {
        // Fallback - get first view if no default is set
        const { data: firstView } = await supabase
          .from('panorama_views')
          .select('id')
          .limit(1)
          .single();
          
        if (firstView) {
          setDefaultViewId(firstView.id);
        }
      }
    };

    // Only fetch when user is authenticated
    if (user) {
      fetchDefaultViewId();
    }
  }, [user]);

  return defaultViewId;
}
