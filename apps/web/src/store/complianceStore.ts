import { create } from 'zustand';

export interface KYCRecord {
  id: string;
  customerId?: string;
  leadId?: string;
  projectId?: string;
  bookingId?: string;
  status: 'Pending' | 'Under Review' | 'Verified' | 'Rejected' | 'Expired' | 'Escalated';
  verificationPercentage: number;
  assignedOfficer: string;
  submittedDate: string;
  lastUpdated: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  complianceScore: number;
}

export interface DocumentRecord {
  id: string;
  kycId?: string;
  bookingId?: string;
  category: 'KYC' | 'Booking' | 'Legal' | 'Property' | 'Financial' | 'Customer' | 'Broker' | 'Corporate' | 'Custom';
  type: string;
  name: string;
  url: string;
  status: 'Pending' | 'Verified' | 'Rejected' | 'Expired';
  extractedData?: Record<string, any>; // OCR extracted data
  version: number;
  uploadedAt: string;
  expiryDate?: string;
  isLocked: boolean;
}

export interface ComplianceException {
  id: string;
  type: string; // e.g. Missing PAN, Expired Passport
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Escalated' | 'Resolved';
  raisedAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

interface ComplianceState {
  kycRecords: KYCRecord[];
  documents: DocumentRecord[];
  exceptions: ComplianceException[];
  
  // Actions
  addKYCRecord: (record: KYCRecord) => void;
  updateKYCRecord: (id: string, updates: Partial<KYCRecord>) => void;
  addDocument: (document: DocumentRecord) => void;
  updateDocument: (id: string, updates: Partial<DocumentRecord>) => void;
  addException: (exception: ComplianceException) => void;
  updateException: (id: string, updates: Partial<ComplianceException>) => void;
}

export const useComplianceStore = create<ComplianceState>((set) => ({
  kycRecords: [
    {
      id: 'kyc-1',
      customerId: 'cust-1',
      status: 'Verified',
      verificationPercentage: 100,
      assignedOfficer: 'Rahul Sharma',
      submittedDate: '2026-06-10T10:00:00Z',
      lastUpdated: '2026-06-12T14:30:00Z',
      riskLevel: 'Low',
      complianceScore: 98,
    },
    {
      id: 'kyc-2',
      leadId: 'lead-1',
      status: 'Pending',
      verificationPercentage: 40,
      assignedOfficer: 'Priya Singh',
      submittedDate: '2026-06-20T09:15:00Z',
      lastUpdated: '2026-06-20T09:15:00Z',
      riskLevel: 'Medium',
      complianceScore: 65,
    }
  ],
  documents: [
    {
      id: 'doc-1',
      kycId: 'kyc-1',
      category: 'KYC',
      type: 'Aadhaar',
      name: 'aadhaar_front.pdf',
      url: '/docs/mock-aadhaar.pdf',
      status: 'Verified',
      version: 1,
      uploadedAt: '2026-06-10T10:05:00Z',
      isLocked: true,
      extractedData: { name: 'Rahul Verma', dob: '1985-04-12' }
    }
  ],
  exceptions: [
    {
      id: 'exc-1',
      type: 'Missing PAN',
      description: 'Customer PAN card upload is pending for booking BKG-1002',
      status: 'Pending',
      raisedAt: '2026-06-22T11:00:00Z'
    }
  ],

  addKYCRecord: (record) => set((state) => ({ kycRecords: [...state.kycRecords, record] })),
  updateKYCRecord: (id, updates) => set((state) => ({
    kycRecords: state.kycRecords.map(r => r.id === id ? { ...r, ...updates } : r)
  })),
  addDocument: (doc) => set((state) => ({ documents: [...state.documents, doc] })),
  updateDocument: (id, updates) => set((state) => ({
    documents: state.documents.map(d => d.id === id ? { ...d, ...updates } : d)
  })),
  addException: (exc) => set((state) => ({ exceptions: [...state.exceptions, exc] })),
  updateException: (id, updates) => set((state) => ({
    exceptions: state.exceptions.map(e => e.id === id ? { ...e, ...updates } : e)
  }))
}));
