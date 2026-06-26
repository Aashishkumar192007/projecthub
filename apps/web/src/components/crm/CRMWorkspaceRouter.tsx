'use client';

import { useCrmStore } from '@/store/crmStore';
import { HotLeadsView } from '@/components/crm/views/HotLeadsView';
import { AllLeadsView } from '@/components/crm/views/AllLeadsView';
import { QualifiedLeadsView } from '@/components/crm/views/QualifiedLeadsView';
import { SiteVisitsView } from '@/components/crm/views/SiteVisitsView';
import { NegotiationsView } from '@/components/crm/views/NegotiationsView';
import { BookingsView } from '@/components/crm/views/BookingsView';
import { CustomersView } from '@/components/crm/views/CustomersView';
import { BrokersView } from '@/components/crm/views/BrokersView';
import { CampaignsView } from '@/components/crm/views/CampaignsView';
import { CallsView } from '@/components/crm/views/CallsView';
import { TasksView } from '@/components/crm/views/TasksView';
import { EmailCenterView } from '@/components/crm/views/EmailCenterView';
import { WhatsAppView } from '@/components/crm/views/WhatsAppView';

// Marketing Views
import { LeadCaptureView } from '@/components/crm/views/marketing/LeadCaptureView';
import { LandingPagesView } from '@/components/crm/views/marketing/LandingPagesView';
import { AutomationsView } from '@/components/crm/views/marketing/AutomationsView';
import { EmailMarketingView } from '@/components/crm/views/marketing/EmailMarketingView';
import { SmsCampaignsView } from '@/components/crm/views/marketing/SmsCampaignsView';
import { AudiencesView } from '@/components/crm/views/marketing/AudiencesView';
import { MarketingAnalyticsView } from '@/components/crm/views/marketing/MarketingAnalyticsView';
import { AssetsView } from '@/components/crm/views/marketing/AssetsView';
import { ReferralsView } from '@/components/crm/views/marketing/ReferralsView';
import { AgenciesView } from '@/components/crm/views/AgenciesView';
import { BrokerWorkspaceView } from '@/components/crm/views/BrokerWorkspaceView';
import { CommissionsView } from '@/components/crm/views/CommissionsView';
import { BrokerPaymentsView } from '@/components/crm/views/BrokerPaymentsView';
import { PartnerPortalView } from '@/components/crm/views/PartnerPortalView';
import { ProjectAllocationsView } from '@/components/crm/views/ProjectAllocationsView';
import { BrokerPerformanceView } from '@/components/crm/views/BrokerPerformanceView';
import { PartnerMarketingView } from '@/components/crm/views/PartnerMarketingView';
import { CorporateSalesView } from '@/components/crm/views/CorporateSalesView';
import { BrokerComplianceView } from '@/components/crm/views/BrokerComplianceView';

export function CRMWorkspaceRouter() {
  const { activeFolder } = useCrmStore();

  switch (activeFolder) {
    case 'HOT_LEADS': return <HotLeadsView />;
    case 'ALL_LEADS': return <AllLeadsView />;
    case 'QUALIFIED_LEADS': return <QualifiedLeadsView />;
    case 'SITE_VISITS': return <SiteVisitsView />;
    case 'NEGOTIATIONS': return <NegotiationsView />;
    case 'BOOKINGS': return <BookingsView />;
    case 'CUSTOMERS': return <CustomersView />;
    case 'BROKERS': return <BrokersView />;
    case 'CAMPAIGNS': return <CampaignsView />;
    case 'CALLS': return <CallsView />;
    case 'TASKS': return <TasksView />;
    case 'EMAILS': return <EmailCenterView />;
    case 'WHATSAPP': return <WhatsAppView />;
    case 'LEAD_CAPTURE': return <LeadCaptureView />;
    case 'LANDING_PAGES': return <LandingPagesView />;
    case 'AUTOMATIONS': return <AutomationsView />;
    case 'EMAIL_MARKETING': return <EmailMarketingView />;
    case 'SMS_CAMPAIGNS': return <SmsCampaignsView />;
    case 'AUDIENCES': return <AudiencesView />;
    case 'MARKETING_ANALYTICS': return <MarketingAnalyticsView />;
    case 'ASSETS': return <AssetsView />;
    case 'REFERRALS': return <ReferralsView />;
    case 'AGENCIES': return <AgenciesView />;
    case 'BROKER_WORKSPACE': return <BrokerWorkspaceView />;
    case 'COMMISSIONS': return <CommissionsView />;
    case 'BROKER_PAYMENTS': return <BrokerPaymentsView />;
    case 'PARTNER_PORTAL': return <PartnerPortalView />;
    case 'PROJECT_ALLOCATIONS': return <ProjectAllocationsView />;
    case 'BROKER_PERFORMANCE': return <BrokerPerformanceView />;
    case 'PARTNER_MARKETING': return <PartnerMarketingView />;
    case 'CORPORATE_SALES': return <CorporateSalesView />;
    case 'BROKER_COMPLIANCE': return <BrokerComplianceView />;
    default: return <AllLeadsView />;
  }
}
