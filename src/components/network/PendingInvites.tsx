
import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Trash2, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
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

interface PendingInvitesProps {
  invitations: any[];
  onCancelInvite: (inviteId: string) => void;
}

export const PendingInvites: React.FC<PendingInvitesProps> = ({ 
  invitations, 
  onCancelInvite 
}) => {
  if (invitations.length === 0) {
    return (
      <Card className="w-full mb-6 border border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Mail className="h-12 w-12 text-neutral-400 mb-4" />
            <h3 className="text-lg font-medium text-neutral-800 mb-2">No Pending Invitations</h3>
            <p className="text-neutral-600 max-w-sm">
              You don't have any pending invitations. Use the Invite tab to add new people to your network.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const formatAccessLevel = (level: string) => {
    return level.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-4">
      {invitations.map((invite) => (
        <Card key={invite.id} className="w-full border border-gray-200">
          <CardContent className="p-6">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <Mail className="h-5 w-5 text-neutral-500" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{invite.email}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-neutral-600 capitalize">{invite.relationship_type || "Member"}</p>
                    <Badge variant="outline" className="text-xs">
                      {formatAccessLevel(invite.access_level)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-neutral-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Expires: {format(new Date(invite.expires_at), "MMM d, yyyy")}</span>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel invitation?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will cancel the invitation sent to {invite.email}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => onCancelInvite(invite.id)}
                        className="bg-destructive text-destructive-foreground"
                      >
                        Cancel Invite
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
