import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WhatsAppSession {
  id: string;
  userId: string;
  phone: string;
  status: 'CONNECTED' | 'SCANNING_QR' | 'DISCONNECTED';
  qrCode?: string | null;
  device?: string;
  lastSync?: string;
}

export interface WhatsAppMessage {
  id: string;
  chatId: string;
  sender: 'AGENT' | 'CONTACT' | 'AI';
  content: string;
  mediaType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'PDF' | 'VOICE' | 'DOCUMENT';
  mediaUrl?: string;
  status: 'SENT' | 'DELIVERED' | 'READ';
  isStarred?: boolean;
  createdAt: string;
}

export interface WhatsAppChat {
  id: string;
  userId: string;
  contactName: string;
  phone: string;
  avatar?: string;
  unreadCount: number;
  category: 'ALL_CHATS' | 'UNREAD' | 'HOT_LEADS' | 'CUSTOMERS' | 'BROKERS' | 'OWNERS' | 'RESIDENTS' | 'ARCHIVED';
  leadStatus: string;
  lastMessage: string;
  lastMessageAt: string;
  leadId?: string;
  customerId?: string;
  residentId?: string;
  ownerId?: string;
  brokerId?: string;
  messages: WhatsAppMessage[];
  entityIntelligence?: {
    leadScore: number;
    customerStatus: string;
    propertyInterest: string;
    assignedExecutive: string;
    siteVisits: number;
    bookings: number;
    paymentsCleared: string;
    notes: string;
  };
}

export interface TemplateItem {
  id: string;
  category: string;
  title: string;
  body: string;
  variables: string[];
}

export interface AutomationItem {
  id: string;
  trigger: string;
  action: string;
  templateTitle: string;
  isActive: boolean;
}

interface WhatsAppState {
  currentUserId: string;
  session: WhatsAppSession;
  chats: WhatsAppChat[];
  activeChatId: string | null;
  searchQuery: string;
  activeFilter: string;
  
  templates: TemplateItem[];
  automations: AutomationItem[];
  
  // AI Copilot State
  aiAnalysis: {
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    intent: string;
    temperature: 'Cold' | 'Warm' | 'Hot';
    suggestedReply: string;
  };

  setSearchQuery: (q: string) => void;
  setActiveFilter: (f: string) => void;
  setActiveChat: (chatId: string | null) => void;
  
  connectSession: (phone: string) => void;
  disconnectSession: () => void;
  triggerQrScan: () => void;
  
  sendMessage: (content: string, mediaType?: WhatsAppMessage['mediaType'], mediaUrl?: string) => void;
  toggleStar: (msgId: string) => void;
  deleteMessage: (msgId: string) => void;
  
  createTemplate: (template: Omit<TemplateItem, 'id'>) => void;
  toggleAutomation: (autoId: string) => void;
}

const initialMockChats: WhatsAppChat[] = [
  {
    id: 'wa-chat-101',
    userId: 'exec-aashish-1',
    contactName: 'Vikramaditya Singhania',
    phone: '9820011223',
    unreadCount: 2,
    category: 'HOT_LEADS',
    leadStatus: 'VISIT SCHEDULED',
    lastMessage: 'Are we confirmed for the penthouse tour on Saturday morning?',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    leadId: 'lead-88',
    entityIntelligence: {
      leadScore: 92,
      customerStatus: 'VIP Investor',
      propertyInterest: 'Sky Penthouse 4BHK (₹8.5 Cr)',
      assignedExecutive: 'Aashish Kumar (Senior RM)',
      siteVisits: 2,
      bookings: 0,
      paymentsCleared: '₹5 Lakhs Token Hold',
      notes: 'Looking for private elevator access. Prefers high floor.'
    },
    messages: [
      { id: 'm-1', chatId: 'wa-chat-101', sender: 'CONTACT', content: 'Hello Aashish, I saw the brochure for PropertyHub Sky Towers.', mediaType: 'TEXT', status: 'READ', createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
      { id: 'm-2', chatId: 'wa-chat-101', sender: 'AGENT', content: 'Warm greetings Mr. Singhania! Yes, our ultra-luxury penthouse collection is currently open for institutional reservation.', mediaType: 'TEXT', status: 'READ', createdAt: new Date(Date.now() - 1000 * 60 * 115).toISOString() },
      { id: 'm-3', chatId: 'wa-chat-101', sender: 'AGENT', content: 'Here is the floor plan specification.', mediaType: 'PDF', mediaUrl: '/specs/penthouse.pdf', status: 'READ', createdAt: new Date(Date.now() - 1000 * 60 * 114).toISOString() },
      { id: 'm-4', chatId: 'wa-chat-101', sender: 'CONTACT', content: 'Looks impressive. Are we confirmed for the penthouse tour on Saturday morning?', mediaType: 'TEXT', status: 'DELIVERED', createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString() }
    ]
  },
  {
    id: 'wa-chat-102',
    userId: 'exec-aashish-1',
    contactName: 'Ananya Mehra',
    phone: '9888044556',
    unreadCount: 0,
    category: 'CUSTOMERS',
    leadStatus: 'BOOKING WON',
    lastMessage: 'Thank you for clearing the agreement receipt!',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    customerId: 'cust-12',
    entityIntelligence: {
      leadScore: 100,
      customerStatus: 'Unit Owner (Tower A - 1402)',
      propertyInterest: '3BHK Residences',
      assignedExecutive: 'Aashish Kumar',
      siteVisits: 3,
      bookings: 1,
      paymentsCleared: '₹1.85 Cr (30% Milestone)',
      notes: 'Requesting interior customization catalogue.'
    },
    messages: [
      { id: 'm-201', chatId: 'wa-chat-102', sender: 'CONTACT', content: 'Hi Aashish, I transferred the 2nd tranche payment yesterday.', mediaType: 'TEXT', status: 'READ', createdAt: new Date(Date.now() - 1000 * 60 * 300).toISOString() },
      { id: 'm-202', chatId: 'wa-chat-102', sender: 'AGENT', content: 'Thank you for clearing the agreement receipt! I have attached the stamped ledger copy.', mediaType: 'DOCUMENT', mediaUrl: '/receipts/tranche2.pdf', status: 'READ', createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() }
    ]
  },
  {
    id: 'wa-chat-103',
    userId: 'exec-aashish-1',
    contactName: 'Rajesh Kulkarni (Apex Realty)',
    phone: '9811122334',
    unreadCount: 1,
    category: 'BROKERS',
    leadStatus: 'RERA VERIFIED',
    lastMessage: 'Voice note (0:32s)',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    brokerId: 'broker-4',
    entityIntelligence: {
      leadScore: 85,
      customerStatus: 'Platinum Channel Partner',
      propertyInterest: 'Commercial Retail Units',
      assignedExecutive: 'Aashish Kumar',
      siteVisits: 14,
      bookings: 4,
      paymentsCleared: '₹14 Lakhs Brokerage Dispatched',
      notes: 'Bringing 3 corporate clients this Friday.'
    },
    messages: [
      { id: 'm-301', chatId: 'wa-chat-103', sender: 'CONTACT', content: 'Aashish, I have an NRI client interested in purchasing half a floor in the commercial park.', mediaType: 'TEXT', status: 'READ', createdAt: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
      { id: 'm-302', chatId: 'wa-chat-103', sender: 'CONTACT', content: 'Voice note regarding pricing expectations', mediaType: 'VOICE', mediaUrl: '/voice/broker_inquiry.mp3', status: 'DELIVERED', createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString() }
    ]
  },
  {
    id: 'wa-chat-104',
    userId: 'exec-aashish-1',
    contactName: 'Dr. Neha Sharma',
    phone: '9900110022',
    unreadCount: 0,
    category: 'RESIDENTS',
    leadStatus: 'OCCUPIED',
    lastMessage: 'Clubhouse guest parking pass cleared.',
    lastMessageAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(),
    residentId: 'res-9',
    entityIntelligence: {
      leadScore: 90,
      customerStatus: 'Resident Committee Member',
      propertyInterest: 'Villa 42',
      assignedExecutive: 'Facility Ops Desk',
      siteVisits: 5,
      bookings: 1,
      paymentsCleared: '100% AMC Cleared',
      notes: 'Annual maintenance contract up for renewal next month.'
    },
    messages: [
      { id: 'm-401', chatId: 'wa-chat-104', sender: 'AGENT', content: 'Good afternoon Dr. Sharma. Your clubhouse guest parking pass cleared.', mediaType: 'TEXT', status: 'READ', createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString() }
    ]
  }
];

export const useWhatsAppStore = create<WhatsAppState>()(
  persist(
    (set, get) => ({
      currentUserId: 'exec-aashish-1',
      session: {
        id: 'sess-aashish-1',
        userId: 'exec-aashish-1',
        phone: '9876543210',
        status: 'CONNECTED',
        device: 'WhatsApp Web (Chrome Windows)',
        lastSync: new Date().toLocaleTimeString()
      },
      chats: initialMockChats,
      activeChatId: 'wa-chat-101',
      searchQuery: '',
      activeFilter: 'ALL_CHATS',
      
      templates: [
        { id: 't-1', category: 'Lead Introduction', title: 'Luxury Project Intro', body: 'Warm greetings from PropertyHub360! We are delighted to introduce our flagship ultra-luxury development. Would you like to explore our virtual walk-through deck?', variables: ['project_name'] },
        { id: 't-2', category: 'Site Visit Reminder', title: 'Cab & Visit Confirmation', body: 'Hello {name}, your private chauffeur-driven visit to {project} is scheduled for tomorrow at {time}. Our site executive will greet you at the VIP lounge.', variables: ['name', 'project', 'time'] },
        { id: 't-3', category: 'Booking Confirmation', title: 'Welcome to the Family', body: 'Congratulations {name}! Your unit reservation for {unit} has been institutionalized. Attached is your digital ownership welcome kit.', variables: ['name', 'unit'] },
        { id: 't-4', category: 'Payment Reminder', title: 'Milestone Demand Notice', body: 'Dear {name}, this is a gentle reminder regarding the upcoming milestone payment of {amount} for tower {tower}.', variables: ['name', 'amount', 'tower'] }
      ],
      
      automations: [
        { id: 'a-1', trigger: 'Lead Created', action: 'Send WhatsApp', templateTitle: 'Luxury Project Intro', isActive: true },
        { id: 'a-2', trigger: 'Visit Scheduled', action: 'Send WhatsApp', templateTitle: 'Cab & Visit Confirmation', isActive: true },
        { id: 'a-3', trigger: 'Booking Completed', action: 'Assign Task & Notify RM', templateTitle: 'Welcome to the Family', isActive: true },
        { id: 'a-4', trigger: 'Payment Received', action: 'Send WhatsApp Receipt', templateTitle: 'Milestone Demand Notice', isActive: false }
      ],

      aiAnalysis: {
        sentiment: 'Positive',
        intent: 'Site Visit Request',
        temperature: 'Hot',
        suggestedReply: 'Yes Mr. Singhania, our VIP concierge team has reserved the private elevator slot for your tour this Saturday at 11:00 AM. Shall I dispatch the gate entry QR?'
      },

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setActiveFilter: (activeFilter) => set({ activeFilter }),
      
      setActiveChat: (activeChatId) => {
        set({ activeChatId });
        const chat = get().chats.find(c => c.id === activeChatId);
        if (chat) {
          // Mark unread as 0
          const updatedChats = get().chats.map(c => c.id === activeChatId ? { ...c, unreadCount: 0 } : c);
          
          // Recompute AI analysis based on chat category/text
          let sentiment: 'Positive' | 'Neutral' | 'Negative' = 'Neutral';
          let intent = 'General Inquiry';
          let temperature: 'Cold' | 'Warm' | 'Hot' = 'Warm';
          let suggestedReply = 'How can I assist you with your property portfolio today?';

          if (chat.category === 'HOT_LEADS') {
            sentiment = 'Positive';
            intent = 'Site Visit Confirmation';
            temperature = 'Hot';
            suggestedReply = 'Yes, our VIP concierge team has confirmed your site visit booking. Shall I dispatch the gate pass QR?';
          } else if (chat.category === 'BROKERS') {
            sentiment = 'Positive';
            intent = 'NRI Client Deal Collaboration';
            temperature = 'Hot';
            suggestedReply = 'Welcome Rajesh! We offer a 2% spot clearance incentive on commercial park floor closures. Let us align on Friday.';
          } else if (chat.category === 'CUSTOMERS') {
            sentiment = 'Positive';
            intent = 'Milestone Receipt Clearance';
            temperature = 'Warm';
            suggestedReply = 'The interior customization catalogue will be dispatched to your email shortly.';
          }

          set({ chats: updatedChats, aiAnalysis: { sentiment, intent, temperature, suggestedReply } });
        }
      },

      connectSession: (phone) => set({
        session: {
          id: 'sess-' + Date.now(),
          userId: get().currentUserId,
          phone,
          status: 'CONNECTED',
          device: 'WhatsApp Web (+91 ' + phone + ')',
          lastSync: new Date().toLocaleTimeString()
        }
      }),

      disconnectSession: () => set({
        session: {
          ...get().session,
          status: 'DISCONNECTED',
          qrCode: null
        }
      }),

      triggerQrScan: () => set({
        session: {
          ...get().session,
          status: 'SCANNING_QR',
          qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + encodeURIComponent('https://web.whatsapp.com')
        }
      }),

      sendMessage: (content, mediaType = 'TEXT', mediaUrl) => {
        const activeId = get().activeChatId;
        if (!activeId || !content.trim()) return;

        const newMsg: WhatsAppMessage = {
          id: 'msg-' + Math.random().toString(36).substr(2, 9),
          chatId: activeId,
          sender: 'AGENT',
          content,
          mediaType,
          mediaUrl,
          status: 'SENT',
          createdAt: new Date().toISOString()
        };

        const updatedChats = get().chats.map(chat => {
          if (chat.id === activeId) {
            return {
              ...chat,
              lastMessage: content,
              lastMessageAt: new Date().toISOString(),
              messages: [...chat.messages, newMsg]
            };
          }
          return chat;
        });

        // Sort chats so latest is on top
        updatedChats.sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());

        set({ chats: updatedChats });
      },

      toggleStar: (msgId) => {
        const activeId = get().activeChatId;
        if (!activeId) return;
        const updated = get().chats.map(chat => {
          if (chat.id === activeId) {
            const msgs = chat.messages.map(m => m.id === msgId ? { ...m, isStarred: !m.isStarred } : m);
            return { ...chat, messages: msgs };
          }
          return chat;
        });
        set({ chats: updated });
      },

      deleteMessage: (msgId) => {
        const activeId = get().activeChatId;
        if (!activeId) return;
        const updated = get().chats.map(chat => {
          if (chat.id === activeId) {
            const msgs = chat.messages.filter(m => m.id !== msgId);
            return { ...chat, messages: msgs };
          }
          return chat;
        });
        set({ chats: updated });
      },

      createTemplate: (t) => set({
        templates: [{ ...t, id: 't-' + Date.now() }, ...get().templates]
      }),

      toggleAutomation: (id) => set({
        automations: get().automations.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a)
      })
    }),
    { name: 'ph360-whatsapp-store' }
  )
);
