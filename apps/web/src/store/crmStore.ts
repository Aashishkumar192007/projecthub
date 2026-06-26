import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Lead, Customer, Broker, Campaign, SiteVisit, Negotiation, Reservation, Booking, LeadStage,
  Activity, EmailMessage, WhatsAppMessage, Automation, LandingPage, Asset, AudienceSegment, Referral, SmsCampaign,
  Agency, Commission, BrokerPayment, ProjectAllocation, CorporateSales, BrokerCompliance,
  initialLeads, initialCustomers, initialBrokers, initialCampaigns, initialSiteVisits, initialBookings, initialNegotiations, initialReservations, initialActivities, initialEmails, initialWhatsApp,
  initialAutomations, initialLandingPages, initialAssets, initialAudiences, initialReferrals, initialSmsCampaigns,
  initialAgencies, initialCommissions, initialBrokerPayments, initialProjectAllocations, initialCorporateSales, initialBrokerCompliance
} from '@/lib/crmMockData';

export type CrmFolder = 
  | "HOT_LEADS" 
  | "ALL_LEADS" 
  | "QUALIFIED_LEADS" 
  | "SITE_VISITS" 
  | "NEGOTIATIONS" 
  | "BOOKINGS" 
  | "CUSTOMERS" 
  | "BROKERS" 
  | "CAMPAIGNS"
  | "CALLS"
  | "TASKS"
  | "EMAILS"
  | "WHATSAPP"
  | "LEAD_CAPTURE"
  | "LANDING_PAGES"
  | "ASSETS"
  | "AUDIENCES"
  | "REFERRALS"
  | "SMS"
  | "AGENCIES"
  | "BROKER_WORKSPACE"
  | "AUTOMATIONS"
  | "EMAIL_MARKETING"
  | "SMS_CAMPAIGNS"
  | "MARKETING_ANALYTICS"
  | "COMMISSIONS"
  | "BROKER_PAYMENTS"
  | "PARTNER_PORTAL"
  | "PROJECT_ALLOCATIONS"
  | "BROKER_PERFORMANCE"
  | "PARTNER_MARKETING"
  | "CORPORATE_SALES"
  | "BROKER_COMPLIANCE";

export interface CrmSystemStats {
  pipelineValue: number;
  activeLeads: number;
  monthlyBookings: number;
  conversionRate: number; 
  revenueGenerated: number;
  
  totalLeads: number;
  totalLeadsChange: number;
  hotLeads: number;
  qualified: number;
  qualifiedPercentage: number;
  siteVisits: number;
  todaysLeads: number;
  followUps: number;
  
  // New Communication KPIs
  totalCalls: number;
  totalTasks: number;
  totalEmails: number;
  totalWhatsApp: number;
  avgResponseTime: string;
  followUpCompliance: number;
  
  lifecycleStages: { id: string; name: string; value: number; convToNext: number | null }[];
  topProjects: { id: string; name: string; leads: number; visits: number; revenue: number; conv: number }[];
  salesLeaders: { id: string; name: string; role: string; revenue: number; conv: number; status: string }[];
}

interface CrmState {
  leads: Lead[];
  customers: Customer[];
  brokers: Broker[];
  campaigns: Campaign[];
  siteVisits: SiteVisit[];
  negotiations: Negotiation[];
  reservations: Reservation[];
  bookings: Booking[];
  activities: Activity[];
  emails: EmailMessage[];
  whatsappChats: WhatsAppMessage[];
  
  // Marketing & Automation Models
  automations: Automation[];
  landingPages: LandingPage[];
  assets: Asset[];
  audiences: AudienceSegment[];
  referrals: Referral[];
  smsCampaigns: SmsCampaign[];
  
  // Partner Ecosystem Models
  agencies: Agency[];
  commissions: Commission[];
  brokerPayments: BrokerPayment[];
  projectAllocations: ProjectAllocation[];
  corporateSales: CorporateSales[];
  brokerCompliance: BrokerCompliance[];

  stats: CrmSystemStats;
  
  activeEntityId: string | null;
  activeTab: string;
  activeFolder: CrmFolder;
  
  // Global Modal State
  globalModalOpen: boolean;
  globalModalContext: string;
  openGlobalModal: (context: string) => void;
  closeGlobalModal: () => void;
  
  setActiveEntity: (id: string | null) => void;
  setActiveTab: (tabId: string) => void;
  setActiveFolder: (folderId: CrmFolder) => void;
  
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  createTask: (task: Omit<Activity, 'id' | 'type'>) => void;
  completeTask: (id: string) => void;
  logCall: (call: Omit<Activity, 'id' | 'type'>) => void;
  sendEmail: (email: Omit<EmailMessage, 'id'>) => void;
  sendWhatsApp: (msg: Omit<WhatsAppMessage, 'id'>) => void;
  createLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'lastContactAt' | 'stage' | 'winProbability'>) => void;
  
  moveLeadStage: (id: string, newStage: LeadStage) => void;
  createSiteVisit: (visit: Omit<SiteVisit, 'id'>) => void;
  updateSiteVisitStatus: (id: string, status: SiteVisit['status']) => void;
  startNegotiation: (neg: Omit<Negotiation, 'id'>) => void;
  updateNegotiationStatus: (id: string, status: Negotiation['status']) => void;
  createReservation: (res: Omit<Reservation, 'id'>) => void;
  createBooking: (booking: Omit<Booking, 'id'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  recalculateLeadScore: (id: string) => void;
  
  recalculateStats: () => void;
}

const computeStats = (leads: Lead[] = [], bookings: Booking[] = [], siteVisits: SiteVisit[] = [], activities: Activity[] = [], emails: EmailMessage[] = [], whatsappChats: WhatsAppMessage[] = []): CrmSystemStats => {
  const activeLeads = leads.filter(l => l.stage !== 'WON' && l.stage !== 'LOST');
  const wonLeads = leads.filter(l => l.stage === 'WON');
  
  const pipelineValue = activeLeads.reduce((sum, l) => sum + l.budget, 0);
  const revenueGenerated = bookings.reduce((sum, b) => sum + b.totalValue, 0);
  const conversionRate = leads.length > 0 ? (wonLeads.length / leads.length) * 100 : 0;
  
  const lifecycleStages = ['NEW', 'CONTACTED', 'QUALIFIED', 'VISIT SCHEDULED', 'VISIT COMPLETED', 'NEGOTIATION', 'BOOKING', 'WON', 'LOST'].map((stage, idx, arr) => {
    const value = leads.filter(l => l.stage === stage).length;
    const nextValue = arr[idx + 1] ? leads.filter(l => l.stage === arr[idx + 1]).length : 0;
    const convToNext = value > 0 ? Math.round((nextValue / value) * 100) : null;
    return {
      id: stage.toLowerCase().replace(' ', '_'),
      name: stage,
      value,
      convToNext: idx === arr.length - 1 ? null : convToNext
    };
  });

  return {
    pipelineValue,
    activeLeads: activeLeads.length,
    monthlyBookings: bookings.length,
    conversionRate: Math.round(conversionRate * 10) / 10,
    revenueGenerated,
    totalLeads: leads.length,
    totalLeadsChange: 4, 
    hotLeads: leads.filter(l => l.score > 80 && l.stage !== 'WON' && l.stage !== 'LOST').length,
    qualified: leads.filter(l => l.stage === 'QUALIFIED').length,
    qualifiedPercentage: leads.length > 0 ? Math.round((leads.filter(l => l.stage === 'QUALIFIED').length / leads.length) * 100) : 0,
    siteVisits: siteVisits.length,
    todaysLeads: leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length,
    followUps: leads.filter(l => l.stage !== 'WON' && l.stage !== 'LOST').length,
    
    totalCalls: (activities || []).filter(a => a.type === 'Call').length,
    totalTasks: (activities || []).filter(a => a.type === 'Task').length,
    totalEmails: (emails || []).length,
    totalWhatsApp: (whatsappChats || []).length,
    avgResponseTime: '18m',
    followUpCompliance: 92,

    lifecycleStages,
    topProjects: [
      { id: 'p1', name: 'Skyline Plaza', leads: 840, visits: 42, revenue: 18200000, conv: 5.2 },
      { id: 'p2', name: 'Marina Heights', leads: 610, visits: 28, revenue: 14500000, conv: 4.6 },
      { id: 'p3', name: 'The Reserve', leads: 340, visits: 14, revenue: 15800000, conv: 4.1 },
    ],
    salesLeaders: [
      { id: 'u1', name: 'Alex Rivera', role: 'SENIOR SALES ASSOC.', revenue: 12400000, conv: 6.8, status: 'online' },
      { id: 'u2', name: 'Sarah Chen', role: 'PORTFOLIO MANAGER', revenue: 10200000, conv: 5.4, status: 'online' },
      { id: 'u3', name: 'James Wilson', role: 'EXTERNAL BROKER', revenue: 8100000, conv: 3.9, status: 'busy' },
    ]
  };
};

export const useCrmStore = create<CrmState>()(
  persist(
    (set, get) => ({
      leads: initialLeads,
      customers: initialCustomers,
      brokers: initialBrokers,
      campaigns: initialCampaigns,
      siteVisits: initialSiteVisits,
      negotiations: initialNegotiations,
      reservations: initialReservations,
      bookings: initialBookings,
      activities: initialActivities,
      emails: initialEmails,
      whatsappChats: initialWhatsApp,
      
      automations: initialAutomations,
      landingPages: initialLandingPages,
      assets: initialAssets,
      audiences: initialAudiences,
      referrals: initialReferrals,
      smsCampaigns: initialSmsCampaigns,
      
      agencies: initialAgencies,
      commissions: initialCommissions,
      brokerPayments: initialBrokerPayments,
      projectAllocations: initialProjectAllocations,
      corporateSales: initialCorporateSales,
      brokerCompliance: initialBrokerCompliance,

      stats: computeStats(initialLeads, initialBookings, initialSiteVisits, initialActivities, initialEmails, initialWhatsApp),
      
      activeEntityId: null,
      activeTab: 'overview',
      activeFolder: 'HOT_LEADS',
      
      globalModalOpen: false,
      globalModalContext: '',
      
      openGlobalModal: (context) => set({ globalModalOpen: true, globalModalContext: context }),
      closeGlobalModal: () => set({ globalModalOpen: false, globalModalContext: '' }),
      
      setActiveEntity: (id) => set({ activeEntityId: id }),
      setActiveTab: (tabId) => set({ activeTab: tabId }),
      setActiveFolder: (folderId) => set({ activeFolder: folderId }),

      recalculateStats: () => {
        const state = get();
        set({ stats: computeStats(
          state.leads || [], 
          state.bookings || [], 
          state.siteVisits || [], 
          state.activities || [], 
          state.emails || [], 
          state.whatsappChats || []
        ) });
      },
      
      addActivity: (activity) => {
        set(state => ({
          activities: [{ ...activity, id: 'act-' + Math.random().toString(36).substr(2, 9) }, ...state.activities]
        }));
      },

      createTask: (task) => {
        set(state => ({
          activities: [{ ...task, type: 'Task', id: 'task-' + Math.random().toString(36).substr(2, 9) }, ...state.activities]
        }));
      },

      completeTask: (id) => {
        set(state => ({
          activities: state.activities.map(a => a.id === id ? { ...a, status: 'COMPLETED', completedAt: new Date().toISOString() } : a)
        }));
      },

      logCall: (call) => {
        set(state => ({
          activities: [{ ...call, type: 'Call', id: 'call-' + Math.random().toString(36).substr(2, 9) }, ...state.activities]
        }));
      },

      sendEmail: (email) => {
        set(state => ({
          emails: [{ ...email, id: 'email-' + Math.random().toString(36).substr(2, 9) }, ...state.emails]
        }));
        // Log activity
        get().addActivity({
          leadId: email.leadId,
          type: 'Email',
          title: `Email Sent: ${email.subject}`,
          description: email.body,
          assignedTo: 'Current User',
          createdAt: new Date().toISOString(),
          status: 'COMPLETED',
          priority: 'LOW'
        });
      },

      sendWhatsApp: (msg) => {
        set(state => ({
          whatsappChats: [{ ...msg, id: 'wa-' + Math.random().toString(36).substr(2, 9) }, ...state.whatsappChats]
        }));
      },
      
      createLead: (leadData) => {
        const id = 'lead-' + Math.random().toString(36).substr(2, 9);
        const newLead: Lead = {
          ...leadData,
          id,
          createdAt: new Date().toISOString(),
          lastContactAt: new Date().toISOString(),
          stage: 'NEW',
          winProbability: 10
        };

        set(state => ({
          leads: [newLead, ...state.leads]
        }));

        get().addActivity({
          leadId: id,
          type: 'System',
          title: 'Lead Created',
          description: `Lead captured via ${leadData.source || 'Manual'}.`,
          assignedTo: leadData.assignedExecutive,
          createdAt: new Date().toISOString(),
          status: 'COMPLETED',
          priority: 'LOW'
        });

        // AUTOMATION: Create Follow-up Task after 24 hours
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        get().createTask({
          leadId: id,
          title: 'Initial Follow-up Call',
          description: 'Call the new lead to discuss requirements.',
          assignedTo: leadData.assignedExecutive,
          createdAt: new Date().toISOString(),
          dueDate: tomorrow.toISOString(),
          status: 'PENDING',
          priority: 'HIGH'
        });

        get().recalculateLeadScore(id);
        get().recalculateStats();
      },

      recalculateLeadScore: (id) => {
        const lead = get().leads.find(l => l.id === id);
        if (!lead) return;

        const activities = get().activities.filter(a => a.leadId === id);
        let score = 20; // Base score for new leads

        // Positive Signals
        if (activities.some(a => a.type === 'Email' && a.status === 'COMPLETED')) score += 10;
        if (activities.some(a => a.type === 'Meeting')) score += 15;
        if (get().siteVisits.some(sv => sv.leadId === id)) score += 20;
        if (get().siteVisits.some(sv => sv.leadId === id && sv.status === 'COMPLETED')) score += 15;
        if (get().negotiations.some(n => n.leadId === id)) score += 10;
        if (get().reservations.some(r => r.leadId === id)) score += 10;

        // Negative Signals
        const lastContact = new Date(lead.lastContactAt);
        const daysInactive = Math.floor((new Date().getTime() - lastContact.getTime()) / (1000 * 3600 * 24));
        if (daysInactive > 7) score -= 10;
        if (daysInactive > 14) score -= 15;
        if (get().siteVisits.some(sv => sv.leadId === id && sv.status === 'CANCELLED')) score -= 15;

        // Cap score between 0 and 100
        score = Math.max(0, Math.min(100, score));

        set(state => ({
          leads: state.leads.map(l => l.id === id ? { ...l, score, isHot: score > 80 } : l)
        }));
      },

      moveLeadStage: (id, newStage) => {
        const state = get();
        const lead = state.leads.find(l => l.id === id);
        if (!lead) return;
        const oldStage = lead.stage;

        set(state => {
          const leads = state.leads.map(l => {
            if (l.id !== id) return l;
            let newProb = l.winProbability;
            if (newStage === 'NEW') newProb = 10;
            if (newStage === 'QUALIFIED') newProb = 30;
            if (newStage === 'VISIT SCHEDULED') newProb = 50;
            if (newStage === 'NEGOTIATION') newProb = 80;
            if (newStage === 'BOOKING' || newStage === 'WON') newProb = 100;
            if (newStage === 'LOST') newProb = 0;
            return { ...l, stage: newStage, winProbability: newProb };
          });
          return { leads };
        });

        get().addActivity({
          leadId: id,
          type: 'System',
          title: 'Stage Changed',
          createdAt: new Date().toISOString(),
          description: `Lead moved from ${oldStage} to ${newStage}`,
          assignedTo: 'Current User',
          status: 'COMPLETED',
          priority: 'LOW'
        });

        // CROSS-MODULE AUTOMATION
        // If moved to VISIT SCHEDULED but no site visit exists
        if (newStage === 'VISIT SCHEDULED' && !state.siteVisits.some(v => v.leadId === id && v.status === 'SCHEDULED')) {
           get().createSiteVisit({
             leadId: id,
             projectId: lead.interestedProjectId || 'PROJ-1',
             date: new Date(Date.now() + 86400000).toISOString(), // tomorrow
             time: '14:00',
             executive: lead.assignedExecutive,
             status: 'SCHEDULED',
             notes: 'Auto-generated site visit from stage movement.'
           });
        }
        
        // If moved to NEGOTIATION but no active negotiation exists
        if (newStage === 'NEGOTIATION' && !state.negotiations.some(n => n.leadId === id && n.status === 'PENDING')) {
           get().startNegotiation({
             leadId: id,
             unitId: 'AUTO-UNIT',
             quotedPrice: lead.budget,
             offerPrice: lead.budget * 0.98,
             discount: lead.budget * 0.02,
             discountPercentage: 2,
             marginImpact: 1.5,
             status: 'PENDING',
             notes: 'Auto-generated negotiation from stage movement.'
           });
        }

        get().recalculateStats();
      },

      createSiteVisit: (visit) => {
        set(state => ({
          siteVisits: [{ ...visit, id: 'visit-' + Math.random().toString(36).substr(2, 9) }, ...state.siteVisits]
        }));
        const lead = get().leads.find(l => l.id === visit.leadId);
        if (lead && lead.stage !== 'VISIT SCHEDULED' && lead.stage !== 'VISIT COMPLETED' && lead.stage !== 'NEGOTIATION' && lead.stage !== 'BOOKING' && lead.stage !== 'WON') {
            get().moveLeadStage(visit.leadId, 'VISIT SCHEDULED');
        } else {
            get().addActivity({
              leadId: visit.leadId,
              type: 'System',
              title: 'Visit Scheduled',
              createdAt: new Date().toISOString(),
              description: `Site visit scheduled for ${new Date(visit.date).toLocaleDateString()} at ${visit.time}`,
              assignedTo: 'Current User',
              status: 'COMPLETED',
              priority: 'LOW'
            });

            // AUTOMATION: Create Reminder Task 24h before visit
            const visitDate = new Date(visit.date);
            visitDate.setDate(visitDate.getDate() - 1); // 24h before
            get().createTask({
              leadId: visit.leadId,
              title: 'Site Visit Reminder',
              description: `Remind lead about their site visit tomorrow at ${visit.time}.`,
              assignedTo: 'Current User',
              createdAt: new Date().toISOString(),
              dueDate: visitDate.toISOString(),
              status: 'PENDING',
              priority: 'MEDIUM'
            });

            get().recalculateStats();
        }
      },

      updateSiteVisitStatus: (id, status) => {
        let leadId = '';
        set(state => ({
          siteVisits: state.siteVisits.map(v => {
            if (v.id === id) {
              leadId = v.leadId;
              return { ...v, status };
            }
            return v;
          })
        }));
        if (status === 'COMPLETED' && leadId) {
          get().moveLeadStage(leadId, 'VISIT COMPLETED');
        }
      },

      startNegotiation: (neg) => {
        set(state => ({
          negotiations: [{ ...neg, id: 'neg-' + Math.random().toString(36).substr(2, 9) }, ...state.negotiations]
        }));
        const lead = get().leads.find(l => l.id === neg.leadId);
        if (lead && lead.stage !== 'NEGOTIATION' && lead.stage !== 'BOOKING' && lead.stage !== 'WON') {
            get().moveLeadStage(neg.leadId, 'NEGOTIATION');
        } else {
            get().addActivity({
              leadId: neg.leadId,
              type: 'System',
              title: 'Negotiation Started',
              createdAt: new Date().toISOString(),
              description: `Negotiation started for unit ${neg.unitId}`,
              assignedTo: 'Current User',
              status: 'COMPLETED',
              priority: 'LOW'
            });
            get().recalculateStats();
        }
      },

      updateNegotiationStatus: (id, status) => {
        set(state => ({
          negotiations: state.negotiations.map(n => n.id === id ? { ...n, status } : n)
        }));
      },

      createReservation: (res) => {
        set(state => ({
          reservations: [{ ...res, id: 'res-' + Math.random().toString(36).substr(2, 9) }, ...state.reservations]
        }));
        get().moveLeadStage(res.leadId, 'BOOKING');
      },

      createBooking: (booking) => {
        set(state => ({
          bookings: [{ ...booking, id: 'booking-' + Math.random().toString(36).substr(2, 9), customerId: '' }, ...state.bookings]
        }));
        get().moveLeadStage(booking.leadId, 'BOOKING');
      },

      updateBookingStatus: (id, status) => {
        let booking = get().bookings.find(b => b.id === id);
        if (!booking) return;

        set(state => ({
          bookings: state.bookings.map(b => b.id === id ? { ...b, status } : b)
        }));

        if (status === 'COMPLETED') {
            // Create Customer record automatically
            const lead = get().leads.find(l => l.id === booking.leadId);
            if (lead && !get().customers.some(c => c.leadId === lead.id)) {
                const custId = 'cust-' + Math.random().toString(36).substr(2, 9);
                set(state => ({
                  customers: [{
                    id: custId,
                    name: lead.name,
                    phone: lead.phone,
                    email: lead.email,
                    kycStatus: 'PENDING',
                    totalInvestment: booking!.totalValue,
                    joinedAt: new Date().toISOString(),
                    leadId: lead.id
                  }, ...state.customers]
                }));
                // Link customerId to booking
                set(state => ({
                    bookings: state.bookings.map(b => b.id === id ? { ...b, customerId: custId } : b)
                }));
                get().moveLeadStage(lead.id, 'WON');
                
                // MARKETING ATTRIBUTION
                if (lead.campaignId) {
                  set(state => ({
                    campaigns: state.campaigns.map(c => {
                      if (c.id === lead.campaignId) {
                        const newRevenue = c.revenue + booking!.totalValue;
                        const newBookings = c.bookings + 1;
                        return { 
                          ...c, 
                          revenue: newRevenue, 
                          bookings: newBookings,
                          roi: c.spend > 0 ? ((newRevenue - c.spend) / c.spend) * 100 : 0,
                          costPerBooking: newBookings > 0 ? c.spend / newBookings : 0
                        };
                      }
                      return c;
                    })
                  }));
                }

                // BROKER COMMISSION ATTRIBUTION
                if (lead.brokerId || lead.agencyId) {
                  const broker = lead.brokerId ? get().brokers.find(b => b.id === lead.brokerId) : null;
                  const commissionRate = broker ? broker.commissionRate : 2; // Default 2% if not found
                  const commissionAmount = booking!.bookingAmount * (commissionRate / 100);

                  const newCommission: Commission = {
                    id: 'comm-' + Math.random().toString(36).substr(2, 9),
                    bookingId: id,
                    leadId: lead.id,
                    brokerId: lead.brokerId,
                    agencyId: lead.agencyId,
                    amount: commissionAmount,
                    commissionType: 'PERCENTAGE',
                    status: 'PENDING',
                    createdAt: new Date().toISOString()
                  };

                  set(state => ({
                    commissions: [newCommission, ...state.commissions]
                  }));

                  // Update Broker Stats if broker exists
                  if (broker) {
                    set(state => ({
                      brokers: state.brokers.map(b => {
                        if (b.id === broker.id) {
                          return {
                            ...b,
                            dealsClosed: b.dealsClosed + 1,
                            revenueGenerated: b.revenueGenerated + booking!.totalValue,
                            commissionEarned: b.commissionEarned + commissionAmount
                          };
                        }
                        return b;
                      })
                    }));
                  }
                }
            }
        }
      }
    }),
    {
      name: 'propertyhub-crm-storage',
      partialize: (state) => ({ 
        activeFolder: state.activeFolder,
        leads: state.leads,
        customers: state.customers,
        siteVisits: state.siteVisits,
        negotiations: state.negotiations,
        bookings: state.bookings,
        activities: state.activities,
        emails: state.emails,
        whatsappChats: state.whatsappChats,
        automations: state.automations,
        landingPages: state.landingPages,
        assets: state.assets,
        audiences: state.audiences,
        referrals: state.referrals,
        smsCampaigns: state.smsCampaigns,
        agencies: state.agencies,
        commissions: state.commissions,
        brokerPayments: state.brokerPayments,
        projectAllocations: state.projectAllocations,
        corporateSales: state.corporateSales,
        brokerCompliance: state.brokerCompliance
      })
    }
  )
);

// Helper Selectors to keep components clean
export const selectFilteredLeads = (state: CrmState) => {
  switch (state.activeFolder) {
    case 'HOT_LEADS': return state.leads.filter(l => l.score > 80 && l.stage !== 'WON' && l.stage !== 'LOST').sort((a,b) => b.score - a.score);
    case 'QUALIFIED_LEADS': return state.leads.filter(l => l.stage === 'QUALIFIED');
    default: return state.leads;
  }
};
