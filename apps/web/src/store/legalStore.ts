import { create } from 'zustand';

export interface LegalCase {
  id: string;
  title: string;
  type: 'Agreement Review' | 'Dispute' | 'Exception Approval' | 'Compliance Alert';
  status: 'Open' | 'Under Review' | 'Approved' | 'Rejected' | 'Closed';
  assignedLawyer?: string;
  relatedEntityId?: string; // Agreement ID, Booking ID, or Customer ID
  relatedEntityType: 'Agreement' | 'Booking' | 'Customer';
  createdAt: string;
  dueDate: string;
  notes: string[];
}

export interface ComplianceWorkflow {
  id: string;
  name: string;
  description: string;
  triggerEvent: string; // e.g., 'Booking Created', 'KYC Approved'
  isActive: boolean;
  steps: WorkflowStep[];
}

export interface WorkflowStep {
  id: string;
  order: number;
  action: 'Request KYC' | 'Verify Documents' | 'Generate Agreement' | 'Collect Signatures' | 'Legal Approval' | 'Booking Completion';
  assignedRole: string;
  autoApproveIfLowRisk: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string; // e.g., 'Document Upload', 'Agreement Edit'
  entityType: string; // 'Document', 'Agreement', 'Booking', 'KYC'
  entityId: string;
  beforeState?: string;
  afterState?: string;
  reason?: string;
  timestamp: string;
  ipAddress: string;
}

interface LegalState {
  legalCases: LegalCase[];
  complianceWorkflows: ComplianceWorkflow[];
  auditLogs: AuditLog[];

  addLegalCase: (c: LegalCase) => void;
  updateLegalCase: (id: string, updates: Partial<LegalCase>) => void;
  addWorkflow: (wf: ComplianceWorkflow) => void;
  updateWorkflow: (id: string, updates: Partial<ComplianceWorkflow>) => void;
  addAuditLog: (log: AuditLog) => void;
}

export const useLegalStore = create<LegalState>((set) => ({
  legalCases: [
    {
      id: 'lc-1',
      title: 'Review Booking Agreement Terms',
      type: 'Agreement Review',
      status: 'Under Review',
      assignedLawyer: 'Sneha Rao',
      relatedEntityId: 'agr-1',
      relatedEntityType: 'Agreement',
      createdAt: '2026-06-21T11:00:00Z',
      dueDate: '2026-06-23T11:00:00Z',
      notes: ['Check penalty clauses for late payment.']
    }
  ],
  complianceWorkflows: [
    {
      id: 'wf-1',
      name: 'Standard Booking Workflow',
      description: 'Default compliance steps for a new booking.',
      triggerEvent: 'Booking Created',
      isActive: true,
      steps: [
        { id: 'step-1', order: 1, action: 'Request KYC', assignedRole: 'Sales', autoApproveIfLowRisk: true },
        { id: 'step-2', order: 2, action: 'Verify Documents', assignedRole: 'Compliance Team', autoApproveIfLowRisk: false },
        { id: 'step-3', order: 3, action: 'Generate Agreement', assignedRole: 'System', autoApproveIfLowRisk: true }
      ]
    }
  ],
  auditLogs: [
    {
      id: 'log-1',
      userId: 'u-101',
      userName: 'Admin User',
      action: 'Document Upload',
      entityType: 'Document',
      entityId: 'doc-1',
      timestamp: '2026-06-10T10:05:00Z',
      ipAddress: '192.168.1.5'
    }
  ],

  addLegalCase: (c) => set((state) => ({ legalCases: [...state.legalCases, c] })),
  updateLegalCase: (id, updates) => set((state) => ({
    legalCases: state.legalCases.map(lc => lc.id === id ? { ...lc, ...updates } : lc)
  })),
  addWorkflow: (wf) => set((state) => ({ complianceWorkflows: [...state.complianceWorkflows, wf] })),
  updateWorkflow: (id, updates) => set((state) => ({
    complianceWorkflows: state.complianceWorkflows.map(w => w.id === id ? { ...w, ...updates } : w)
  })),
  addAuditLog: (log) => set((state) => ({ auditLogs: [log, ...state.auditLogs] })) // Add to beginning for newest first
}));
