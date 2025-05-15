
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/hooks/useConversation";
import { toast } from "@/components/ui/sonner";
import { FinancialTopic } from "@/components/chat/TopicSelector";

export async function getAIResponse(
  userMessage: string,
  conversationHistory: Message[],
  topic: FinancialTopic = "General Advice"
): Promise<string | null> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-financial-advisor', {
      body: {
        message: userMessage,
        conversationHistory,
        topic,
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
