export type LeadStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'VISIT SCHEDULED' | 'VISIT COMPLETED' | 'NEGOTIATION' | 'BOOKING' | 'WON' | 'LOST';

export type ActivityType = 'Call' | 'Email' | 'WhatsApp' | 'Meeting' | 'Task' | 'Note' | 'Follow-Up' | 'System';

export interface Activity {
  id: string;
  leadId?: string;
  customerId?: string;
  type: ActivityType;
  title: string;
  description: string;
  assignedTo: string;
  createdAt: string;
  completedAt?: string;
  dueDate?: string;
  status: 'PENDING' | 'COMPLETED' | 'OVERDUE' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface EmailMessage {
  id: string;
  leadId?: string;
  subject: string;
  body: string;
  from: string;
  to: string;
  status: 'INBOX' | 'SENT' | 'DRAFT';
  createdAt: string;
  read: boolean;
}

export interface WhatsAppMessage {
  id: string;
  leadId?: string;
  content: string;
  sender: 'AGENT' | 'LEAD';
  status: 'SENT' | 'DELIVERED' | 'READ' | 'RECEIVED';
  createdAt: string;
  attachmentUrl?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  campaignId?: string;
  sourceChannel?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
  brokerId?: string;
  agencyId?: string;
  budget: number;
  score: number;
  stage: LeadStage;
  assignedExecutive: string;
  createdAt: string;
  lastContactAt: string;
  interestedProjectId?: string;
  interestedUnitType?: string;
  winProbability: number;
  isHot: boolean;
  notes: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  kycStatus: string;
  totalInvestment: number;
  joinedAt: string;
  leadId: string;
}

export interface Broker {
  id: string;
  name: string;
  company: string;
  agencyId?: string;
  kycStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  reraRegistration?: string;
  citiesCovered: string[];
  projectsAssigned: string[];
  commissionRate: number;
  dealsClosed: number;
  revenueGenerated: number;
  commissionEarned: number;
  commissionPaid: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Agency {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  cities: string[];
  totalBrokers: number;
  dealsClosed: number;
  revenueGenerated: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Commission {
  id: string;
  bookingId: string;
  leadId: string;
  brokerId?: string;
  agencyId?: string;
  amount: number;
  commissionType: 'PERCENTAGE' | 'FLAT' | 'SLAB';
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'RELEASED' | 'PAID' | 'DISPUTED';
  createdAt: string;
}

export interface BrokerPayment {
  id: string;
  brokerId: string;
  amount: number;
  tdsDeducted: number;
  gstAmount: number;
  netPayable: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  paidAt?: string;
  createdAt: string;
}

export interface ProjectAllocation {
  id: string;
  brokerId?: string;
  agencyId?: string;
  projectId: string;
  towers: string[];
  commissionOverride?: number;
}

export interface CorporateSales {
  id: string;
  companyName: string;
  hrContact: string;
  email: string;
  employeeCount: number;
  agreedDiscount: number;
  activeBookings: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface BrokerCompliance {
  id: string;
  brokerId: string;
  documentType: 'PAN' | 'GST' | 'RERA' | 'AADHAAR' | 'NDA' | 'BANK';
  documentUrl: string;
  expiryDate?: string;
  status: 'VALID' | 'EXPIRED' | 'MISSING' | 'PENDING_VERIFICATION';
}

export interface Campaign {
  id: string;
  name: string;
  platform: 'Google Ads' | 'Meta Ads' | 'WhatsApp' | 'Referral' | 'Broker' | 'Email';
  spend: number;
  leadsGenerated: number;
  qualifiedLeads: number;
  bookings: number;
  revenue: number;
  roi: number;
  costPerLead: number;
  costPerBooking: number;
  targetAudience?: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
}

export interface SiteVisit {
  id: string;
  leadId: string;
  projectId: string;
  tower?: string;
  unit?: string;
  date: string;
  time: string;
  executive: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';
  notes: string;
}

export interface Negotiation {
  id: string;
  leadId: string;
  unitId: string;
  quotedPrice: number;
  offerPrice: number;
  discount: number;
  discountPercentage: number;
  marginImpact: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COUNTERED';
  notes: string;
}

export interface Reservation {
  id: string;
  leadId: string;
  unitId: string;
  reservedAt: string;
  expiresAt: string;
  status: 'ACTIVE' | 'CONVERTED' | 'EXPIRED';
}

export interface Booking {
  id: string;
  leadId: string;
  customerId?: string;
  unitId: string;
  projectId: string;
  bookingAmount: number;
  totalValue: number;
  status: 'RESERVED' | 'DOCUMENTATION' | 'PAYMENT' | 'AGREEMENT' | 'COMPLETED';
  date: string;
}

export interface Automation {
  id: string;
  name: string;
  triggerEvent: string;
  status: 'ACTIVE' | 'DRAFT' | 'PAUSED';
  leadsEnrolled: number;
  leadsCompleted: number;
  createdAt: string;
}

export interface LandingPage {
  id: string;
  name: string;
  url: string;
  visitors: number;
  leadsGenerated: number;
  conversionRate: number;
  status: 'PUBLISHED' | 'DRAFT';
}

export interface Asset {
  id: string;
  name: string;
  type: 'Brochure' | 'Image' | 'Video' | 'Floor Plan' | 'Price Sheet';
  projectId?: string;
  url: string;
  downloads: number;
  uploadedAt: string;
}

export interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  leadCount: number;
  filters: any;
  createdAt: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referrerType: 'CUSTOMER' | 'BROKER' | 'PARTNER';
  referredLeadId: string;
  status: 'PENDING' | 'QUALIFIED' | 'CONVERTED';
  commissionAmount?: number;
  createdAt: string;
}

export interface SmsCampaign {
  id: string;
  name: string;
  audienceId: string;
  sent: number;
  delivered: number;
  clicked: number;
  status: 'SCHEDULED' | 'SENDING' | 'COMPLETED';
  scheduledAt: string;
}

// Generate Data
const generateLeads = (count: number): Lead[] => {
  const sources = ['Google Ads', 'Meta Ads', 'WhatsApp', 'Referral', 'Website', 'Walk-in', 'Broker'];
  const stages: LeadStage[] = ['NEW', 'CONTACTED', 'QUALIFIED', 'VISIT SCHEDULED', 'VISIT COMPLETED', 'NEGOTIATION', 'BOOKING', 'WON', 'LOST'];
  const executives = ['Alex Rivera', 'Sarah Chen', 'James Wilson', 'Priya Patel', 'Rahul Sharma'];
  
  return Array.from({ length: count }).map((_, i) => {
    const stage = stages[Math.floor(Math.random() * stages.length)];
    const score = Math.floor(Math.random() * 60) + 40; // 40-100
    const budget = Math.floor(Math.random() * 50000000) + 5000000;
    
    return {
      id: `lead-${1000 + i}`,
      name: `Lead Name ${i}`,
      phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
      email: `lead${i}@example.com`,
      source: sources[Math.floor(Math.random() * sources.length)],
      budget,
      score,
      stage,
      assignedExecutive: executives[Math.floor(Math.random() * executives.length)],
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      lastContactAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
      winProbability: stage === 'WON' ? 100 : stage === 'LOST' ? 0 : Math.floor(Math.random() * 80) + 10,
      isHot: score > 80,
      notes: 'Initial contact made. Looking for a 3BHK.'
    };
  });
};

const generateCustomers = (leads: Lead[], count: number): Customer[] => {
  const wonLeads = leads.filter(l => l.stage === 'WON');
  return Array.from({ length: Math.min(count, wonLeads.length) }).map((_, i) => ({
    id: `cust-${1000 + i}`,
    name: wonLeads[i].name,
    phone: wonLeads[i].phone,
    email: wonLeads[i].email,
    kycStatus: Math.random() > 0.2 ? 'VERIFIED' : 'PENDING',
    totalInvestment: wonLeads[i].budget * (0.9 + Math.random() * 0.2),
    joinedAt: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
    leadId: wonLeads[i].id
  }));
};

const generateAgencies = (count: number): Agency[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `agency-${1000 + i}`,
    name: `Enterprise Realty Partners ${i}`,
    contactPerson: `Director ${i}`,
    phone: `+91 98${Math.floor(10000000 + Math.random() * 90000000)}`,
    email: `contact@agency${i}.com`,
    cities: ['Mumbai', 'Pune', 'Bangalore'].slice(0, Math.floor(Math.random() * 3) + 1),
    totalBrokers: Math.floor(Math.random() * 50) + 5,
    dealsClosed: Math.floor(Math.random() * 200),
    revenueGenerated: Math.floor(Math.random() * 5000000000),
    status: 'ACTIVE'
  }));
};

const generateBrokers = (count: number, agencies: Agency[]): Broker[] => {
  return Array.from({ length: count }).map((_, i) => {
    const hasAgency = Math.random() > 0.5;
    const agency = hasAgency ? agencies[Math.floor(Math.random() * agencies.length)] : undefined;
    return {
      id: `broker-${1000 + i}`,
      name: `Broker Name ${i}`,
      company: agency ? agency.name : `Independent Co ${i}`,
      agencyId: agency ? agency.id : undefined,
      kycStatus: Math.random() > 0.2 ? 'VERIFIED' : 'PENDING',
      reraRegistration: `RERA-MH-${100000 + i}`,
      citiesCovered: ['Mumbai', 'Thane'],
      projectsAssigned: ['proj-1', 'proj-2'],
      commissionRate: 2 + Math.random() * 2, // 2-4%
      dealsClosed: Math.floor(Math.random() * 50),
      revenueGenerated: Math.floor(Math.random() * 500000000),
      commissionEarned: Math.floor(Math.random() * 5000000),
      commissionPaid: Math.floor(Math.random() * 4000000),
      status: Math.random() > 0.1 ? 'ACTIVE' : 'INACTIVE'
    };
  });
};

const generateProjectAllocations = (brokers: Broker[]): ProjectAllocation[] => {
  return brokers.map(b => ({
    id: `alloc-${b.id}`,
    brokerId: b.id,
    projectId: 'proj-1',
    towers: ['Tower A', 'Tower B'],
    commissionOverride: b.commissionRate + 0.5
  }));
};

const generateCorporateSales = (): CorporateSales[] => [
  { id: 'corp-1', companyName: 'TechCorp India', hrContact: 'Priya S.', email: 'hr@techcorp.com', employeeCount: 5000, agreedDiscount: 2.5, activeBookings: 12, status: 'ACTIVE' },
  { id: 'corp-2', companyName: 'Global Finance Ltd', hrContact: 'Rahul M.', email: 'benefits@globalfin.com', employeeCount: 2000, agreedDiscount: 3.0, activeBookings: 5, status: 'ACTIVE' }
];

const generateBrokerCompliance = (brokers: Broker[]): BrokerCompliance[] => {
  return brokers.map(b => ({
    id: `comp-${b.id}`,
    brokerId: b.id,
    documentType: 'RERA',
    documentUrl: '#',
    expiryDate: new Date(Date.now() + 86400000 * 180).toISOString(),
    status: 'VALID'
  }));
};

const generateCommissions = (bookings: Booking[], brokers: Broker[]): Commission[] => {
  return bookings.filter((_, i) => i % 2 === 0).map((b, i) => {
    const broker = brokers[i % brokers.length];
    return {
      id: `comm-${1000 + i}`,
      bookingId: b.id,
      leadId: b.leadId,
      brokerId: broker.id,
      amount: b.bookingAmount * (broker.commissionRate / 100),
      commissionType: 'PERCENTAGE',
      status: Math.random() > 0.5 ? 'APPROVED' : 'PENDING',
      createdAt: b.date
    };
  });
};

const generateBrokerPayments = (commissions: Commission[]): BrokerPayment[] => {
  const approvedComms = commissions.filter(c => c.status === 'APPROVED');
  return approvedComms.map((c, i) => {
    const tds = c.amount * 0.10; // 10% TDS
    const net = c.amount - tds;
    return {
      id: `pay-${1000 + i}`,
      brokerId: c.brokerId!,
      amount: c.amount,
      tdsDeducted: tds,
      gstAmount: 0,
      netPayable: net,
      status: Math.random() > 0.3 ? 'COMPLETED' : 'PROCESSING',
      paidAt: new Date().toISOString(),
      createdAt: c.createdAt
    };
  });
};

const generateCampaigns = (count: number): Campaign[] => {
  const platforms: ('Google Ads' | 'Meta Ads' | 'WhatsApp' | 'Referral' | 'Broker' | 'Email')[] = ['Google Ads', 'Meta Ads', 'WhatsApp', 'Referral', 'Broker', 'Email'];
  return Array.from({ length: count }).map((_, i) => {
    const spend = Math.floor(Math.random() * 500000) + 50000;
    const revenue = spend * (2 + Math.random() * 10);
    return {
      id: `camp-${1000 + i}`,
      name: `Q${(i%4)+1} Marketing Campaign ${i}`,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      spend,
      leadsGenerated: Math.floor(Math.random() * 500) + 50,
      qualifiedLeads: Math.floor(Math.random() * 100) + 10,
      bookings: Math.floor(Math.random() * 20),
      revenue,
      roi: ((revenue - spend) / spend) * 100,
      status: Math.random() > 0.3 ? 'ACTIVE' : 'COMPLETED'
    };
  });
};

const generateSiteVisits = (leads: Lead[], count: number): SiteVisit[] => {
  const interestedLeads = leads.filter(l => ['VISIT SCHEDULED', 'VISIT COMPLETED', 'NEGOTIATION', 'BOOKING', 'WON'].includes(l.stage));
  return Array.from({ length: Math.min(count, interestedLeads.length) }).map((_, i) => {
    const lead = interestedLeads[i];
    const isCompleted = ['VISIT COMPLETED', 'NEGOTIATION', 'BOOKING', 'WON'].includes(lead.stage);
    return {
      id: `visit-${1000 + i}`,
      leadId: lead.id,
      projectId: 'proj-1', // Mock project
      date: new Date(Date.now() - (isCompleted ? Math.random() * 1000000000 : -Math.random() * 1000000000)).toISOString(),
      time: '14:00',
      executive: lead.assignedExecutive,
      status: isCompleted ? 'COMPLETED' : 'SCHEDULED',
      notes: 'Customer looking for park facing unit.'
    };
  });
};

const generateBookings = (customers: Customer[], count: number): Booking[] => {
  return Array.from({ length: Math.min(count, customers.length) }).map((_, i) => {
    const customer = customers[i];
    return {
      id: `booking-${1000 + i}`,
      leadId: customer.leadId,
      customerId: customer.id,
      unitId: `unit-${1000 + i}`,
      projectId: 'proj-1',
      bookingAmount: 500000,
      totalValue: customer.totalInvestment,
      status: 'COMPLETED',
      date: customer.joinedAt
    };
  });
};

const generateEmails = (leads: Lead[], count: number): EmailMessage[] => {
  return Array.from({ length: count }).map((_, i) => {
    const lead = leads[i % leads.length];
    return {
      id: `email-${1000 + i}`,
      leadId: lead.id,
      subject: `Project Details: ${lead.interestedProjectId || 'Premium Properties'}`,
      body: 'Hi, please find the brochure attached. Let me know when we can schedule a visit.',
      from: 'agent@propertyhub360.com',
      to: lead.email,
      status: Math.random() > 0.5 ? 'SENT' : 'INBOX',
      createdAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
      read: Math.random() > 0.5
    };
  });
};

const generateWhatsApp = (leads: Lead[], count: number): WhatsAppMessage[] => {
  return Array.from({ length: count }).map((_, i) => {
    const lead = leads[i % leads.length];
    const isAgent = Math.random() > 0.5;
    return {
      id: `wa-${1000 + i}`,
      leadId: lead.id,
      content: isAgent ? 'Are you available for a site visit this weekend?' : 'Yes, Saturday morning works for me.',
      sender: isAgent ? 'AGENT' : 'LEAD',
      status: isAgent ? (Math.random() > 0.5 ? 'READ' : 'DELIVERED') : 'RECEIVED',
      createdAt: new Date(Date.now() - Math.random() * 500000000).toISOString()
    };
  });
};

const generateAutomations = (): Automation[] => [
  { id: 'auto-1', name: 'New Lead Welcome Series', triggerEvent: 'Lead Created', status: 'ACTIVE', leadsEnrolled: 1420, leadsCompleted: 1100, createdAt: new Date().toISOString() },
  { id: 'auto-2', name: 'Post-Visit Follow Up', triggerEvent: 'Visit Completed', status: 'ACTIVE', leadsEnrolled: 430, leadsCompleted: 390, createdAt: new Date().toISOString() },
  { id: 'auto-3', name: 'Cold Lead Re-engagement', triggerEvent: 'Lead Inactive 30 Days', status: 'DRAFT', leadsEnrolled: 0, leadsCompleted: 0, createdAt: new Date().toISOString() }
];

const generateLandingPages = (): LandingPage[] => [
  { id: 'lp-1', name: 'Skyline Plaza Launch', url: 'propertyhub360.com/skyline-launch', visitors: 15400, leadsGenerated: 840, conversionRate: 5.4, status: 'PUBLISHED' },
  { id: 'lp-2', name: 'Marina Heights 3BHK Promo', url: 'propertyhub360.com/marina-3bhk', visitors: 8200, leadsGenerated: 410, conversionRate: 5.0, status: 'PUBLISHED' },
  { id: 'lp-3', name: 'The Reserve Expo Landing', url: 'propertyhub360.com/reserve-expo', visitors: 0, leadsGenerated: 0, conversionRate: 0, status: 'DRAFT' }
];

const generateAssets = (): Asset[] => [
  { id: 'ast-1', name: 'Skyline Plaza Main Brochure', type: 'Brochure', url: '#', downloads: 1240, uploadedAt: new Date().toISOString() },
  { id: 'ast-2', name: 'Marina Heights Floor Plans', type: 'Floor Plan', url: '#', downloads: 850, uploadedAt: new Date().toISOString() },
  { id: 'ast-3', name: 'The Reserve Drone Walkthrough', type: 'Video', url: '#', downloads: 2100, uploadedAt: new Date().toISOString() }
];

const generateAudiences = (): AudienceSegment[] => [
  { id: 'aud-1', name: 'High Budget Luxury Buyers', description: 'Leads with budget > ₹2 Cr', leadCount: 450, filters: {}, createdAt: new Date().toISOString() },
  { id: 'aud-2', name: 'Ready To Book', description: 'Leads in Negotiation or Visit Completed', leadCount: 120, filters: {}, createdAt: new Date().toISOString() },
  { id: 'aud-3', name: 'Lost Opportunities 2025', description: 'Lost leads from last year', leadCount: 890, filters: {}, createdAt: new Date().toISOString() }
];

const generateReferrals = (): Referral[] => [
  { id: 'ref-1', referrerId: 'cust-1001', referrerType: 'CUSTOMER', referredLeadId: 'lead-1045', status: 'QUALIFIED', createdAt: new Date().toISOString() },
  { id: 'ref-2', referrerId: 'broker-1005', referrerType: 'BROKER', referredLeadId: 'lead-1088', status: 'CONVERTED', commissionAmount: 150000, createdAt: new Date().toISOString() }
];

const generateSmsCampaigns = (): SmsCampaign[] => [
  { id: 'sms-1', name: 'Weekend Site Visit Push', audienceId: 'aud-1', sent: 450, delivered: 442, clicked: 85, status: 'COMPLETED', scheduledAt: new Date().toISOString() },
  { id: 'sms-2', name: 'Flash Discount Offer', audienceId: 'aud-2', sent: 120, delivered: 0, clicked: 0, status: 'SCHEDULED', scheduledAt: new Date(Date.now() + 86400000).toISOString() }
];

export const initialAgencies = generateAgencies(5);
export const initialLeads = generateLeads(200);
export const initialCustomers = generateCustomers(initialLeads, 50);
export const initialBrokers = generateBrokers(20, initialAgencies);
export const initialCampaigns = generateCampaigns(15);
export const initialSiteVisits = generateSiteVisits(initialLeads, 40);
export const initialBookings = generateBookings(initialCustomers, 25);
export const initialCommissions = generateCommissions(initialBookings, initialBrokers);
export const initialBrokerPayments = generateBrokerPayments(initialCommissions);
export const initialProjectAllocations = generateProjectAllocations(initialBrokers);
export const initialCorporateSales = generateCorporateSales();
export const initialBrokerCompliance = generateBrokerCompliance(initialBrokers);
export const initialEmails = generateEmails(initialLeads, 100);
export const initialWhatsApp = generateWhatsApp(initialLeads, 150);
export const initialAutomations = generateAutomations();
export const initialLandingPages = generateLandingPages();
export const initialAssets = generateAssets();
export const initialAudiences = generateAudiences();
export const initialReferrals = generateReferrals();
export const initialSmsCampaigns = generateSmsCampaigns();
export const initialNegotiations: Negotiation[] = [];
export const initialReservations: Reservation[] = [];
export const initialActivities: Activity[] = initialLeads.map(lead => ({
  id: 'act-' + Math.random().toString(36).substr(2, 9),
  leadId: lead.id,
  type: 'System',
  title: 'Lead Created',
  description: `Lead imported from ${lead.source}`,
  assignedTo: lead.assignedExecutive,
  createdAt: lead.createdAt,
  status: 'COMPLETED',
  priority: 'LOW'
}));
