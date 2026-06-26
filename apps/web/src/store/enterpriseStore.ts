import { create } from 'zustand';

export interface OrgNode {
  id: string;
  name: string;
  type: 'Group' | 'Company' | 'Region' | 'Branch' | 'Team';
  parentId?: string;
  code: string;
  head: string;
  userCount: number;
}

export interface SystemRole {
  id: string;
  name: string;
  description: string;
  userCount: number;
  isSystem: boolean;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    approve: boolean;
    reject: boolean;
    assign: boolean;
    export: boolean;
    import: boolean;
    manage: boolean;
    audit: boolean;
    configure: boolean;
  };
  granular: {
    property: boolean;
    project: boolean;
    tower: boolean;
    unit: boolean;
    lead: boolean;
    customer: boolean;
    booking: boolean;
    document: boolean;
    report: boolean;
  };
}

export interface EnterpriseUser {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  region: string;
  status: 'Active' | 'Suspended' | 'Deactivated';
  avatar: string;
  lastLogin: string;
  performanceScore: number;
  phone: string;
}

export interface WorkflowFlow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  status: 'Active' | 'Draft' | 'Paused';
  runs: number;
  lastTriggered: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  type: 'Discount Approval' | 'Booking Approval' | 'Broker Approval' | 'Commission Approval' | 'Refund Approval';
  requestedBy: string;
  amount: number;
  currentLevel: 'Manager' | 'Director' | 'Finance' | 'Approved' | 'Rejected';
  createdAt: string;
  entityRef: string;
}

export interface EnterpriseNotification {
  id: string;
  title: string;
  message: string;
  channel: 'In App' | 'Email' | 'WhatsApp' | 'SMS' | 'Push' | 'Webhook';
  type: 'Lead Assignment' | 'Task Reminder' | 'Approval Request' | 'SLA Breach' | 'System Alert';
  time: string;
  isRead: boolean;
}

export interface AuditEvent {
  id: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  ip: string;
  location: string;
  device: string;
  beforeJson?: string;
  afterJson?: string;
  reason: string;
}

export interface IntegrationConnector {
  id: string;
  name: string;
  category: 'Communication' | 'Advertising' | 'Calendar' | 'ERP & Finance';
  status: 'Connected' | 'Disconnected' | 'Error';
  apiKey: string;
  lastSync: string;
  eventsProcessed: number;
}

export interface SLATracker {
  id: string;
  metric: string;
  targetMinutes: number;
  actualAvgMinutes: number;
  breachCount: number;
  status: 'Healthy' | 'Warning' | 'Breached';
}

export interface GovernanceRule {
  id: string;
  name: string;
  entity: string;
  retentionMonths: number;
  isRecordLockingEnabled: boolean;
  isGdprMaskingEnabled: boolean;
  recordsArchived: number;
}

interface EnterpriseState {
  currentCompanyId: string;
  companies: { id: string; name: string; currency: string; timezone: string; language: string; fiscalStart: string }[];
  orgNodes: OrgNode[];
  roles: SystemRole[];
  users: EnterpriseUser[];
  workflows: WorkflowFlow[];
  approvals: ApprovalRequest[];
  notifications: EnterpriseNotification[];
  auditLogs: AuditEvent[];
  integrations: IntegrationConnector[];
  slaTrackers: SLATracker[];
  governanceRules: GovernanceRule[];
  isMobileOfflineMode: boolean;

  // Actions
  setCompany: (companyId: string) => void;
  toggleOfflineMode: () => void;
  updateRolePermissions: (roleId: string, type: 'permissions' | 'granular', key: string, val: boolean) => void;
  addUser: (user: EnterpriseUser) => void;
  updateUserStatus: (userId: string, status: EnterpriseUser['status']) => void;
  addWorkflow: (wf: WorkflowFlow) => void;
  toggleWorkflowStatus: (wfId: string) => void;
  processApproval: (approvalId: string, action: 'approve' | 'reject') => void;
  markNotificationRead: (notifId: string) => void;
  addAuditEvent: (evt: AuditEvent) => void;
  simulateDataImport: (type: string, count: number) => void;
}

export const useEnterpriseStore = create<EnterpriseState>((set, get) => ({
  currentCompanyId: 'comp-1',
  isMobileOfflineMode: false,
  companies: [
    { id: 'comp-1', name: 'Global Properties REIT Group', currency: 'USD ($)', timezone: 'UTC-05:00 (EST)', language: 'English (US)', fiscalStart: 'April 1' },
    { id: 'comp-2', name: 'EuroEstates Institutional Dev', currency: 'EUR (€)', timezone: 'UTC+01:00 (CET)', language: 'German / French', fiscalStart: 'January 1' },
    { id: 'comp-3', name: 'Asha Pacific Holdings', currency: 'INR (₹)', timezone: 'UTC+05:30 (IST)', language: 'English / Hindi', fiscalStart: 'April 1' }
  ],
  orgNodes: [
    { id: 'org-1', name: 'PropertyHub Global Group', type: 'Group', code: 'GRP-001', head: 'Aashish Kumar (CEO)', userCount: 10450 },
    { id: 'org-2', name: 'North America Commercial REIT', type: 'Company', parentId: 'org-1', code: 'CMP-NA', head: 'Sarah Jenkins (COO)', userCount: 4200 },
    { id: 'org-3', name: 'EMEA Residential Developers', type: 'Company', parentId: 'org-1', code: 'CMP-EU', head: 'Marcus Vance', userCount: 3800 },
    { id: 'org-4', name: 'APAC Luxury Townships', type: 'Company', parentId: 'org-1', code: 'CMP-AP', head: 'Rajesh Mehta', userCount: 2450 },
    { id: 'org-5', name: 'Manhattan Metro Region', type: 'Region', parentId: 'org-2', code: 'REG-NYC', head: 'Elena Rostova', userCount: 1800 },
    { id: 'org-6', name: 'Financial District Branch', type: 'Branch', parentId: 'org-5', code: 'BRN-FIDI', head: 'David Ross', userCount: 650 },
    { id: 'org-7', name: 'Alpha Sales Syndicate', type: 'Team', parentId: 'org-6', code: 'TM-ALPHA', head: 'Jessica Alba', userCount: 42 }
  ],
  roles: [
    {
      id: 'role-1', name: 'Super Admin', description: 'Unrestricted global control over all business units, cloud configs, and security policies.', userCount: 5, isSystem: true,
      permissions: { view: true, create: true, edit: true, delete: true, approve: true, reject: true, assign: true, export: true, import: true, manage: true, audit: true, configure: true },
      granular: { property: true, project: true, tower: true, unit: true, lead: true, customer: true, booking: true, document: true, report: true }
    },
    {
      id: 'role-2', name: 'CRM Director', description: 'Full oversight over sales pipeline, broker payouts, workflows, and approval overrides.', userCount: 18, isSystem: true,
      permissions: { view: true, create: true, edit: true, delete: false, approve: true, reject: true, assign: true, export: true, import: true, manage: true, audit: true, configure: false },
      granular: { property: true, project: true, tower: true, unit: true, lead: true, customer: true, booking: true, document: true, report: true }
    },
    {
      id: 'role-3', name: 'Sales Manager', description: 'Manages team lead allocations, site visits, reservation requests, and discount escalations.', userCount: 142, isSystem: true,
      permissions: { view: true, create: true, edit: true, delete: false, approve: false, reject: false, assign: true, export: true, import: false, manage: false, audit: false, configure: false },
      granular: { property: true, project: true, tower: true, unit: true, lead: true, customer: true, booking: true, document: true, report: true }
    },
    {
      id: 'role-4', name: 'Sales Executive', description: 'Day-to-day lead follow-ups, site visit scheduling, and booking draft generation.', userCount: 4250, isSystem: true,
      permissions: { view: true, create: true, edit: true, delete: false, approve: false, reject: false, assign: false, export: false, import: false, manage: false, audit: false, configure: false },
      granular: { property: true, project: true, tower: true, unit: true, lead: true, customer: false, booking: true, document: true, report: false }
    },
    {
      id: 'role-5', name: 'Compliance Officer', description: 'Performs AML/KYC background checks, audits document vaults, and enforces data governance.', userCount: 64, isSystem: true,
      permissions: { view: true, create: false, edit: true, delete: false, approve: true, reject: true, assign: false, export: true, import: false, manage: false, audit: true, configure: false },
      granular: { property: false, project: false, tower: false, unit: false, lead: true, customer: true, booking: true, document: true, report: true }
    }
  ],
  users: [
    { id: 'usr-1', name: 'Aashish Kumar', email: 'aashish@propertyhub360.com', role: 'Super Admin', team: 'Global C-Suite', region: 'Global Headquarters', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=AK&background=2563EB&color=fff', lastLogin: 'Just now', performanceScore: 99, phone: '+1 (555) 019-2831' },
    { id: 'usr-2', name: 'Sarah Jenkins', email: 'sarah.j@reitcommercial.com', role: 'CRM Director', team: 'Executive Ops', region: 'North America', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=SJ&background=10B981&color=fff', lastLogin: '12 mins ago', performanceScore: 96, phone: '+1 (555) 438-9920' },
    { id: 'usr-3', name: 'Marcus Vance', email: 'm.vance@emeaestates.eu', role: 'Sales Manager', team: 'Syndicate Alpha', region: 'EMEA', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=MV&background=8B5CF6&color=fff', lastLogin: '1 hour ago', performanceScore: 91, phone: '+44 20 7946 0912' },
    { id: 'usr-4', name: 'Elena Rostova', email: 'elena@reitcommercial.com', role: 'Sales Executive', team: 'Metro Knights', region: 'Manhattan Metro', status: 'Suspended', avatar: 'https://ui-avatars.com/api/?name=ER&background=F59E0B&color=fff', lastLogin: '3 days ago', performanceScore: 74, phone: '+1 (555) 882-3310' },
    { id: 'usr-5', name: 'David Ross', email: 'david.r@apacluxury.in', role: 'Compliance Officer', team: 'Risk & Legal', region: 'APAC', status: 'Active', avatar: 'https://ui-avatars.com/api/?name=DR&background=EC4899&color=fff', lastLogin: '4 hours ago', performanceScore: 98, phone: '+91 98200 11293' }
  ],
  workflows: [
    { id: 'wf-1', name: 'VIP Lead Fast-Track Allocation', description: 'When a lead with budget > $2M is created, immediately assign to Syndicate Head and fire WhatsApp alert.', trigger: 'Lead Created (Budget > $2,000,000)', action: 'Assign User + Send WhatsApp Alert', status: 'Active', runs: 1420, lastTriggered: '4 mins ago' },
    { id: 'wf-2', name: 'Automated KYC Approval Engine', description: 'Upon Document Vault upload verification, update Customer KYC Status to Approved and generate E-Sign Draft.', trigger: 'Document Uploaded (Type = KYC)', action: 'Update Status + Generate Document', status: 'Active', runs: 8930, lastTriggered: '18 mins ago' },
    { id: 'wf-3', name: 'Overdue Reservation Release', description: 'If Unit Reservation deposit is not cleared within 48 hours, unlock unit back to inventory.', trigger: 'Reservation Created (+48 Hours)', action: 'Custom Logic (Release Unit)', status: 'Paused', runs: 312, lastTriggered: '2 days ago' }
  ],
  approvals: [
    { id: 'app-1', title: '12.5% VIP Investor Discount — Tower A Penthouse', type: 'Discount Approval', requestedBy: 'Elena Rostova', amount: 325000, currentLevel: 'Director', createdAt: '2026-06-25 14:20', entityRef: 'Unit PH-01' },
    { id: 'app-2', title: 'Special Broker Override Commission (3.5%)', type: 'Commission Approval', requestedBy: 'Marcus Vance', amount: 48500, currentLevel: 'Finance', createdAt: '2026-06-25 11:10', entityRef: 'Brokerage Knight Frank' },
    { id: 'app-3', title: 'Token Deposit Refund Request ($10,000)', type: 'Refund Approval', requestedBy: 'David Ross', amount: 10000, currentLevel: 'Manager', createdAt: '2026-06-24 16:45', entityRef: 'Booking BKG-1092' }
  ],
  notifications: [
    { id: 'notif-1', title: 'High-Value Booking Approval Escalation', message: 'Penthouse booking discount requires immediate C-Suite sign-off.', channel: 'In App', type: 'Approval Request', time: '10 mins ago', isRead: false },
    { id: 'notif-2', title: 'SLA Warning: Lead Response Delay', message: '42 retail leads in EMEA have exceeded 15-minute response target.', channel: 'WhatsApp', type: 'SLA Breach', time: '25 mins ago', isRead: false },
    { id: 'notif-3', title: 'Webhook Sync Success: SAP ERP', message: 'Successfully synced 1,420 fiscal entries across REIT entities.', channel: 'Webhook', type: 'System Alert', time: '1 hour ago', isRead: true }
  ],
  auditLogs: [
    {
      id: 'aud-1091', user: 'Sarah Jenkins (usr-2)', action: 'UPDATE_DISCOUNT_POLICY', entity: 'OrganizationSettings', entityId: 'comp-1', timestamp: '2026-06-25 16:40:12', ip: '192.168.1.104', location: 'New York, USA', device: 'Chrome / macOS',
      beforeJson: JSON.stringify({ maxExecutiveDiscount: '5%', requireDirectorAbove: '10%' }, null, 2),
      afterJson: JSON.stringify({ maxExecutiveDiscount: '7.5%', requireDirectorAbove: '12%' }, null, 2),
      reason: 'Q3 Aggressive Sales Thrust authorization'
    },
    {
      id: 'aud-1090', user: 'David Ross (usr-5)', action: 'APPROVE_KYC_RECORD', entity: 'CustomerKYC', entityId: 'kyc-8821', timestamp: '2026-06-25 15:12:09', ip: '103.21.44.12', location: 'Mumbai, India', device: 'Safari / iOS',
      beforeJson: JSON.stringify({ status: 'Pending Review', riskLevel: 'Medium' }, null, 2),
      afterJson: JSON.stringify({ status: 'Verified', riskLevel: 'Low' }, null, 2),
      reason: 'Passport and tax identification cross-checked via government DB'
    }
  ],
  integrations: [
    { id: 'int-1', name: 'Meta Business Cloud (WhatsApp API)', category: 'Communication', status: 'Connected', apiKey: 'wh_live_893218904812390a', lastSync: '1 min ago', eventsProcessed: 145890 },
    { id: 'int-2', name: 'SAP S/4HANA Real Estate ERP', category: 'ERP & Finance', status: 'Connected', apiKey: 'sap_prod_992301982309e', lastSync: '12 mins ago', eventsProcessed: 42910 },
    { id: 'int-3', name: 'Google Workspace Enterprise', category: 'Calendar', status: 'Connected', apiKey: 'gws_oauth_8832019a', lastSync: '4 mins ago', eventsProcessed: 89400 },
    { id: 'int-4', name: 'Stripe Institutional Gateway', category: 'ERP & Finance', status: 'Connected', apiKey: 'pk_live_5190283091283', lastSync: 'Just now', eventsProcessed: 12400 }
  ],
  slaTrackers: [
    { id: 'sla-1', metric: 'VIP Lead First Response Time', targetMinutes: 15, actualAvgMinutes: 8.4, breachCount: 3, status: 'Healthy' },
    { id: 'sla-2', metric: 'Standard Lead First Response Time', targetMinutes: 30, actualAvgMinutes: 28.1, breachCount: 42, status: 'Warning' },
    { id: 'sla-3', metric: 'Booking Agreement Generation & Dispatch', targetMinutes: 120, actualAvgMinutes: 45.0, breachCount: 0, status: 'Healthy' },
    { id: 'sla-4', metric: 'KYC Background Compliance Clearance', targetMinutes: 240, actualAvgMinutes: 290.5, breachCount: 18, status: 'Breached' }
  ],
  governanceRules: [
    { id: 'gov-1', name: 'Financial Bookings & Invoices Archive', entity: 'Bookings & Payments', retentionMonths: 84, isRecordLockingEnabled: true, isGdprMaskingEnabled: false, recordsArchived: 142090 },
    { id: 'gov-2', name: 'EU Customer Inactive Lead Purge (GDPR)', entity: 'Leads (EMEA)', retentionMonths: 24, isRecordLockingEnabled: false, isGdprMaskingEnabled: true, recordsArchived: 8400 },
    { id: 'gov-3', name: 'Digital E-Signature Hash Lock Vault', entity: 'Signed Agreements', retentionMonths: 120, isRecordLockingEnabled: true, isGdprMaskingEnabled: false, recordsArchived: 39100 }
  ],

  setCompany: (companyId) => set({ currentCompanyId: companyId }),
  toggleOfflineMode: () => set((state) => ({ isMobileOfflineMode: !state.isMobileOfflineMode })),
  
  updateRolePermissions: (roleId, type, key, val) => set((state) => ({
    roles: state.roles.map(r => {
      if (r.id !== roleId) return r;
      if (type === 'permissions') return { ...r, permissions: { ...r.permissions, [key]: val } };
      return { ...r, granular: { ...r.granular, [key]: val } };
    })
  })),

  addUser: (usr) => set((state) => ({ users: [usr, ...state.users] })),
  updateUserStatus: (userId, status) => set((state) => ({
    users: state.users.map(u => u.id === userId ? { ...u, status } : u)
  })),

  addWorkflow: (wf) => set((state) => ({ workflows: [wf, ...state.workflows] })),
  toggleWorkflowStatus: (wfId) => set((state) => ({
    workflows: state.workflows.map(w => w.id === wfId ? { ...w, status: w.status === 'Active' ? 'Paused' : 'Active' } : w)
  })),

  processApproval: (appId, action) => set((state) => ({
    approvals: state.approvals.map(a => a.id === appId ? { ...a, currentLevel: action === 'approve' ? 'Approved' : 'Rejected' } : a)
  })),

  markNotificationRead: (notifId) => set((state) => ({
    notifications: state.notifications.map(n => n.id === notifId ? { ...n, isRead: true } : n)
  })),

  addAuditEvent: (evt) => set((state) => ({ auditLogs: [evt, ...state.auditLogs] })),
  
  simulateDataImport: (type, count) => {
    const newAudit: AuditEvent = {
      id: `aud-imp-${Date.now()}`,
      user: 'Aashish Kumar (usr-1)',
      action: `BULK_IMPORT_${type.toUpperCase()}`,
      entity: type,
      entityId: `batch-${count}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      ip: '127.0.0.1',
      location: 'Local Command Console',
      device: 'Enterprise Data Engine',
      reason: `Bulk onboarding of ${count} ${type} records via CSV Engine.`
    };
    set((state) => ({ auditLogs: [newAudit, ...state.auditLogs] }));
  }
}));
