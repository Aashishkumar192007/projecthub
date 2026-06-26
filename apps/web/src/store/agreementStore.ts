import { create } from 'zustand';

export interface Agreement {
  id: string;
  type: 'Booking Agreement' | 'Sale Agreement' | 'Lease Agreement' | 'Rental Agreement' | 'Maintenance Agreement' | 'Vendor Agreement' | 'Broker Agreement' | 'Corporate Agreement';
  title: string;
  bookingId?: string;
  customerId?: string;
  status: 'Draft' | 'Pending Review' | 'Approved' | 'Sent for Signature' | 'Partially Signed' | 'Completed' | 'Rejected' | 'Archived';
  version: number;
  createdAt: string;
  updatedAt: string;
  parties: AgreementParty[];
  clauses: string[]; // IDs of clauses
  documentUrl?: string;
}

export interface AgreementParty {
  id: string;
  type: 'Customer' | 'Co-Applicant' | 'Broker' | 'Manager' | 'Legal Team' | 'Director' | 'Vendor';
  name: string;
  email: string;
  role: string;
  signatureStatus: 'Pending' | 'Viewed' | 'Signed' | 'Rejected';
  signedAt?: string;
}

export interface ESignatureRequest {
  id: string;
  agreementId: string;
  documentName: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Partially Signed' | 'Completed' | 'Rejected' | 'Expired';
  sentAt: string;
  expiresAt: string;
  completedAt?: string;
}

interface AgreementState {
  agreements: Agreement[];
  signatureRequests: ESignatureRequest[];

  addAgreement: (agreement: Agreement) => void;
  updateAgreement: (id: string, updates: Partial<Agreement>) => void;
  addSignatureRequest: (req: ESignatureRequest) => void;
  updateSignatureRequest: (id: string, updates: Partial<ESignatureRequest>) => void;
}

export const useAgreementStore = create<AgreementState>((set) => ({
  agreements: [
    {
      id: 'agr-1',
      type: 'Booking Agreement',
      title: 'Booking Agreement - Unit 104',
      bookingId: 'bkg-1',
      status: 'Sent for Signature',
      version: 1,
      createdAt: '2026-06-20T10:00:00Z',
      updatedAt: '2026-06-21T10:00:00Z',
      parties: [
        { id: 'p-1', type: 'Customer', name: 'Rahul Verma', email: 'rahul@example.com', role: 'Primary Buyer', signatureStatus: 'Viewed' },
        { id: 'p-2', type: 'Manager', name: 'Sales Head', email: 'sales@propertyhub.com', role: 'Authorized Signatory', signatureStatus: 'Pending' }
      ],
      clauses: ['cl-1', 'cl-2']
    }
  ],
  signatureRequests: [
    {
      id: 'sig-1',
      agreementId: 'agr-1',
      documentName: 'Booking_Agreement_Unit_104_v1.pdf',
      status: 'Sent',
      sentAt: '2026-06-21T10:30:00Z',
      expiresAt: '2026-06-28T10:30:00Z'
    }
  ],

  addAgreement: (agr) => set((state) => ({ agreements: [...state.agreements, agr] })),
  updateAgreement: (id, updates) => set((state) => ({
    agreements: state.agreements.map(a => a.id === id ? { ...a, ...updates } : a)
  })),
  addSignatureRequest: (req) => set((state) => ({ signatureRequests: [...state.signatureRequests, req] })),
  updateSignatureRequest: (id, updates) => set((state) => ({
    signatureRequests: state.signatureRequests.map(r => r.id === id ? { ...r, ...updates } : r)
  }))
}));
