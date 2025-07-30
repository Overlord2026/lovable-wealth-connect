
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { MemberList } from "./MemberList";
import { MemberInvite } from "./MemberInvite";
import { NetworkTabs } from "./NetworkTabs";
import { PendingInvites } from "./PendingInvites";
import { Users, UserPlus, Mail } from "lucide-react";
import { AccessLevel } from "../../types/network";

interface NetworkManagerProps {
  user: { id: string } | null;
}

export const NetworkManager: React.FC<NetworkManagerProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'members' | 'pending' | 'invite'>('members');
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [pendingInvites, setPendingInvites] = useState<any[]>([]);

  // Fetch network members
  const fetchMembers = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('family_network')
        .select(`
          id,
          relationship_type,
          member_id,
          access_permissions (
            id,
            access_level,
            can_export,
            permissions_config
          ),
          profiles:member_id (
            first_name,
            last_name,
            display_name,
            avatar_url
          )
        `)
        .eq('owner_id', user.id);
        
      if (error) throw error;
      
      setMembers(data || []);
    } catch (error) {
      console.error("Error fetching network members:", error);
      toast.error("Failed to load network members");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch pending invitations
  const fetchPendingInvites = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('network_invitations')
        .select('*')
        .eq('inviter_id', user.id)
        .eq('status', 'pending');
        
      if (error) throw error;
      
      setPendingInvites(data || []);
    } catch (error) {
      console.error("Error fetching invitations:", error);
      toast.error("Failed to load pending invitations");
    }
  };

  // Update access level for a member
  const updateAccessLevel = async (networkId: string, accessPermissionId: string, accessLevel: AccessLevel) => {
    try {
      const { error } = await supabase
        .from('access_permissions')
        .update({ access_level: accessLevel })
        .eq('id', accessPermissionId);
        
      if (error) throw error;
      
      toast.success("Access level updated successfully");
      fetchMembers(); // Refresh members list
    } catch (error) {
      console.error("Error updating access level:", error);
      toast.error("Failed to update access level");
    }
  };

  // Toggle export permission for a member
  const toggleExportPermission = async (accessPermissionId: string, canExport: boolean) => {
    try {
      const { error } = await supabase
        .from('access_permissions')
        .update({ can_export: canExport })
        .eq('id', accessPermissionId);
        
      if (error) throw error;
      
      toast.success("Export permission updated");
      fetchMembers(); // Refresh members list
    } catch (error) {
      console.error("Error updating export permission:", error);
      toast.error("Failed to update export permission");
    }
  };

  // Remove a member from network
  const removeMember = async (networkId: string) => {
    try {
      const { error } = await supabase
        .from('family_network')
        .delete()
        .eq('id', networkId);
        
      if (error) throw error;
      
      toast.success("Member removed from your network");
      fetchMembers(); // Refresh members list
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove member");
    }
  };

  // Cancel a pending invitation
  const cancelInvite = async (inviteId: string) => {
    try {
      const { error } = await supabase
        .from('network_invitations')
        .delete()
        .eq('id', inviteId);
        
      if (error) throw error;
      
      toast.success("Invitation cancelled");
      fetchPendingInvites(); // Refresh invitations list
    } catch (error) {
      console.error("Error cancelling invitation:", error);
      toast.error("Failed to cancel invitation");
    }
  };

  useEffect(() => {
    if (user) {
      fetchMembers();
      fetchPendingInvites();
    }
  }, [user]);

  // Handle successful invitation
  const handleInviteSuccess = () => {
    toast.success("Invitation sent successfully");
    setActiveTab('pending');
    fetchPendingInvites();
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8">
          <p className="text-lg">Please sign in to manage your network.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-neutral-800">Trusted Network</h1>
        <p className="text-neutral-600 mt-2">
          Manage your trusted circle and control what they can access in your financial portfolio.
        </p>
      </div>

      <NetworkTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingCount={pendingInvites.length}
      />

      {activeTab === 'members' && (
        <MemberList 
          members={members} 
          isLoading={isLoading}
          onUpdateAccessLevel={updateAccessLevel}
          onToggleExport={toggleExportPermission}
          onRemoveMember={removeMember}
        />
      )}
      
      {activeTab === 'pending' && (
        <PendingInvites 
          invitations={pendingInvites}
          onCancelInvite={cancelInvite}
        />
      )}
      
      {activeTab === 'invite' && (
        <MemberInvite 
          userId={user.id}
          onSuccess={handleInviteSuccess}
        />
      )}
    </div>
  );
};
