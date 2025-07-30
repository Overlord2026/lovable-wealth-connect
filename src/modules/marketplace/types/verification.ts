// Verification type definitions
export interface VerificationDocument {
  id: string;
  professionalId: string;
  documentType: 'license' | 'certification' | 'insurance' | 'identity';
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface VerificationRecord {
  id: string;
  professionalId: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewerNotes?: string;
  documents: VerificationDocument[];
}