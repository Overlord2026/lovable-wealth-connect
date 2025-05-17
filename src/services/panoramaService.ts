
import { supabase } from "@/integrations/supabase/client";

export interface PanoramaView {
  id: string;
  name: string;
  is_default: boolean;
  filters: Record<string, any>; 
  layout_config: {
    showPerformance?: boolean;
    showRisk?: boolean;
    showBreakdown?: boolean;
    showAnalyze?: boolean;
  };
  user_id?: string;
}

export const panoramaService = {
  /**
   * Get all panorama views for the current user
   */
  getUserViews: async (): Promise<PanoramaView[]> => {
    const { data, error } = await supabase
      .from('panorama_views')
      .select('*')
      .order('is_default', { ascending: false });
      
    if (error) {
      throw new Error(error.message);
    }
    
    return data as unknown as PanoramaView[] || [];
  },
  
  /**
   * Create a new panorama view
   */
  createView: async (view: Omit<PanoramaView, 'id'>): Promise<PanoramaView> => {
    // Ensure user_id is set
    const viewWithUserId = {
      ...view,
      user_id: (await supabase.auth.getUser()).data.user?.id
    };
    
    const { data, error } = await supabase
      .from('panorama_views')
      .insert(viewWithUserId)
      .select()
      .single();
      
    if (error) {
      throw new Error(error.message);
    }
    
    return data as unknown as PanoramaView;
  },
  
  /**
   * Update an existing panorama view
   */
  updateView: async (id: string, updates: Partial<PanoramaView>): Promise<PanoramaView> => {
    const { data, error } = await supabase
      .from('panorama_views')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      throw new Error(error.message);
    }
    
    return data as unknown as PanoramaView;
  },
  
  /**
   * Delete a panorama view
   */
  deleteView: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('panorama_views')
      .delete()
      .eq('id', id);
      
    if (error) {
      throw new Error(error.message);
    }
  },
  
  /**
   * Set a panorama view as default
   * This will unset any other default view
   */
  setDefaultView: async (id: string): Promise<void> => {
    // First, unset all default views
    const { error: updateError } = await supabase
      .from('panorama_views')
      .update({ is_default: false })
      .eq('is_default', true);
      
    if (updateError) {
      throw new Error(updateError.message);
    }
    
    // Now set the specified view as default
    const { error } = await supabase
      .from('panorama_views')
      .update({ is_default: true })
      .eq('id', id);
      
    if (error) {
      throw new Error(error.message);
    }
  }
};
