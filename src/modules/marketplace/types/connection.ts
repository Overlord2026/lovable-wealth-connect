// Connection type definitions
export interface Connection {
  id: string;
  clientId: string;
  advisorId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'active';
  requestedAt: Date;
  acceptedAt?: Date;
  lastContact?: Date;
}