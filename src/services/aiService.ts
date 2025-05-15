
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/hooks/useConversation";
import { toast } from "@/components/ui/sonner";

export async function getAIResponse(
  userMessage: string,
  conversationHistory: Message[]
): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-financial-advisor', {
      body: {
        message: userMessage,
        conversationHistory,
      },
    });
    
    if (error) throw error;
    
    if (data && data.response) {
      return data.response;
    } else {
      throw new Error("Invalid response from AI service");
    }
  } catch (error) {
    console.error("Error getting AI response:", error);
    toast.error("Failed to get a response from the AI advisor");
    return null;
  }
}
