
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuidv4 } from "uuid";
import { UserPlus } from "lucide-react";

interface MemberInviteProps {
  userId: string;
  onSuccess: () => void;
}

export const MemberInvite: React.FC<MemberInviteProps> = ({ userId, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [relationship, setRelationship] = useState("");
  const [accessLevel, setAccessLevel] = useState<string>("read_only");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create a unique invite code
      const inviteCode = uuidv4();
      
      // Store the invitation in the database
      const { error } = await supabase
        .from('network_invitations')
        .insert({
          inviter_id: userId,
          email: email.toLowerCase(),
          invite_code: inviteCode,
          relationship_type: relationship || "other",
          access_level: accessLevel,
          status: 'pending'
        });
        
      if (error) {
        if (error.code === '23505') {
          toast.error("An invitation has already been sent to this email address");
        } else {
          throw error;
        }
      } else {
        // TODO: In a real implementation, we would send an email with the invitation link
        // For now, we'll just show a success message
        
        // Reset form
        setEmail("");
        setRelationship("");
        setAccessLevel("read_only");
        setMessage("");
        
        // Notify parent component
        onSuccess();
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
      toast.error("Failed to send invitation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full mb-6 border border-gray-200">
      <form onSubmit={handleSendInvitation}>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship Type</Label>
              <Select
                value={relationship}
                onValueChange={setRelationship}
              >
                <SelectTrigger id="relationship">
                  <SelectValue placeholder="Select relationship type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="family">Family Member</SelectItem>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="accountant">Accountant</SelectItem>
                  <SelectItem value="financial_advisor">Financial Advisor</SelectItem>
                  <SelectItem value="lawyer">Lawyer</SelectItem>
                  <SelectItem value="business_partner">Business Partner</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accessLevel">Access Level</Label>
              <Select
                value={accessLevel}
                onValueChange={setAccessLevel}
              >
                <SelectTrigger id="accessLevel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_access">Full Access</SelectItem>
                  <SelectItem value="partial_access">Partial Access</SelectItem>
                  <SelectItem value="read_only">Read Only</SelectItem>
                  <SelectItem value="no_access">No Access</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-neutral-500 mt-1">
                {accessLevel === "full_access" && "Can view and modify all financial information."}
                {accessLevel === "partial_access" && "Can view all information but can only modify select items."}
                {accessLevel === "read_only" && "Can only view financial information but not make changes."}
                {accessLevel === "no_access" && "No access to any information until you update permissions."}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal note to your invitation"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <Button 
            type="submit" 
            className="ml-auto bg-gold hover:bg-gold/90 text-white" 
            disabled={isSubmitting}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isSubmitting ? "Sending..." : "Send Invitation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
