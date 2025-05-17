import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2, Users, UserX } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AccessLevel } from "@/types/network";

interface MemberListProps {
  members: any[];
  isLoading: boolean;
  onUpdateAccessLevel: (networkId: string, accessPermissionId: string, accessLevel: AccessLevel) => void;
  onToggleExport: (accessPermissionId: string, canExport: boolean) => void;
  onRemoveMember: (networkId: string) => void;
}

export const MemberList: React.FC<MemberListProps> = ({ 
  members, 
  isLoading,
  onUpdateAccessLevel,
  onToggleExport,
  onRemoveMember
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-gold border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <Card className="w-full mb-6 border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users className="h-12 w-12 text-neutral-400 mb-4" />
            <h3 className="text-lg font-medium text-neutral-800 mb-2">No Members Yet</h3>
            <p className="text-neutral-600 max-w-sm">
              You haven't added anyone to your financial network. Add trusted family members or professionals to share access to your financial information.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <Card key={member.id} className="w-full border border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border border-gray-200">
                  <AvatarImage src={member.profiles?.avatar_url} />
                  <AvatarFallback className="bg-[#0A1F33] text-gold">
                    {getInitials(member.profiles?.display_name || member.profiles?.first_name || "User")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">
                    {member.profiles?.display_name || 
                     `${member.profiles?.first_name || ''} ${member.profiles?.last_name || ''}`.trim() || 
                     "User"}
                  </h3>
                  <p className="text-sm text-neutral-600 capitalize">{member.relationship_type || "Member"}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 items-center ml-auto">
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium min-w-24">Access Level:</span>
                  <Select
                    value={member.access_permissions?.[0]?.access_level || "no_access"}
                    onValueChange={(value: AccessLevel) => onUpdateAccessLevel(
                      member.id,
                      member.access_permissions?.[0]?.id,
                      value
                    )}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_access">Full Access</SelectItem>
                      <SelectItem value="partial_access">Partial Access</SelectItem>
                      <SelectItem value="read_only">Read Only</SelectItem>
                      <SelectItem value="no_access">No Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">Allow Export:</span>
                  <Switch
                    checked={member.access_permissions?.[0]?.can_export || false}
                    onCheckedChange={(checked) => onToggleExport(
                      member.access_permissions?.[0]?.id,
                      checked
                    )}
                  />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove member?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this member from your network and revoke all access permissions.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onRemoveMember(member.id)}
                        className="bg-destructive text-destructive-foreground"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Helper function to get initials from name
function getInitials(name: string): string {
  if (!name) return "U";
  
  const names = name.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}
