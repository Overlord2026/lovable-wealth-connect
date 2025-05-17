
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Mail, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NetworkTabsProps {
  activeTab: 'members' | 'pending' | 'invite';
  onTabChange: (tab: 'members' | 'pending' | 'invite') => void;
  pendingCount: number;
}

export const NetworkTabs: React.FC<NetworkTabsProps> = ({ 
  activeTab, 
  onTabChange,
  pendingCount
}) => {
  return (
    <Tabs value={activeTab} className="w-full mb-8">
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger 
          value="members" 
          onClick={() => onTabChange('members')}
          className="flex items-center gap-2"
        >
          <Users className="h-4 w-4" /> Members
        </TabsTrigger>
        <TabsTrigger 
          value="pending" 
          onClick={() => onTabChange('pending')}
          className="flex items-center gap-2"
        >
          <Mail className="h-4 w-4" /> Pending
          {pendingCount > 0 && (
            <Badge variant="destructive" className="ml-1 text-xs px-1.5">
              {pendingCount}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger 
          value="invite" 
          onClick={() => onTabChange('invite')}
          className="flex items-center gap-2"
        >
          <UserPlus className="h-4 w-4" /> Invite
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
