const fs = require('fs');
const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');
const EOL = require('os').EOL;

if (schema.includes('// 39. PERSONAL WHATSAPP WORKSPACE INTEGRATION CLOUD')) {
  console.log('WhatsApp models already patched.');
  process.exit(0);
}

function injectFields(modelName, fields) {
  const regex = new RegExp("model " + modelName + " \\{[\\s\\S]*?\\}");
  schema = schema.replace(regex, match => {
    return match.substring(0, match.lastIndexOf('}')) + fields.join(EOL) + EOL + '}';
  });
}

injectFields('Tenant', [
  '  whatsappSessions    WhatsAppSession[]',
  '  whatsappChats       WhatsAppChat[]',
  '  whatsappTemplates   WhatsAppTemplate[]',
  '  whatsappAutomations WhatsAppAutomation[]',
  '  whatsappAuditLogs   WhatsAppAuditLog[]'
]);

injectFields('User', [
  '  whatsappSession     WhatsAppSession?',
  '  whatsappChats       WhatsAppChat[]',
  '  whatsappAuditLogs   WhatsAppAuditLog[]'
]);

const newModels = `
// ------------------------------------------------------
// 39. PERSONAL WHATSAPP WORKSPACE INTEGRATION CLOUD
// ------------------------------------------------------

model WhatsAppSession {
  id        String    @id @default(uuid())
  tenantId  String
  tenant    Tenant    @relation(fields: [tenantId], references: [id])
  userId    String    @unique
  user      User      @relation(fields: [userId], references: [id])
  phone     String?
  status    String    @default("DISCONNECTED") // CONNECTED, SCANNING_QR, DISCONNECTED
  qrCode    String?
  device    String?
  lastSync  DateTime?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model WhatsAppChat {
  id            String   @id @default(uuid())
  tenantId      String
  tenant        Tenant   @relation(fields: [tenantId], references: [id])
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  contactName   String
  phone         String
  avatar        String?
  unreadCount   Int      @default(0)
  category      String   @default("ALL_CHATS") // ALL_CHATS, UNREAD, HOT_LEADS, CUSTOMERS, BROKERS, OWNERS, RESIDENTS, ARCHIVED
  leadStatus    String?
  lastMessage   String?
  lastMessageAt DateTime @default(now())
  
  leadId        String?
  customerId    String?
  residentId    String?
  ownerId       String?
  brokerId      String?
  
  messages      WhatsAppMessage[]
  auditLogs     WhatsAppAuditLog[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model WhatsAppMessage {
  id           String       @id @default(uuid())
  chatId       String
  chat         WhatsAppChat @relation(fields: [chatId], references: [id], onDelete: Cascade)
  sender       String       @default("AGENT") // AGENT, CONTACT, AI
  content      String
  mediaType    String       @default("TEXT") // TEXT, IMAGE, VIDEO, PDF, VOICE, DOCUMENT
  mediaUrl     String?
  status       String       @default("SENT") // SENT, DELIVERED, READ
  isStarred    Boolean      @default(false)
  createdAt    DateTime     @default(now())
}

model WhatsAppTemplate {
  id           String   @id @default(uuid())
  tenantId     String
  tenant       Tenant   @relation(fields: [tenantId], references: [id])
  category     String   // LEAD_INTRO, VISIT_REMINDER, BOOKING_CONFIRM, PAYMENT_REMINDER, WELCOME_MSG, MAINTENANCE_NOTICE, FESTIVAL_GREETINGS
  title        String
  body         String
  variables    String?  // JSON string array of variable names e.g. ["name", "project", "price"]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  automations  WhatsAppAutomation[]
}

model WhatsAppAutomation {
  id           String            @id @default(uuid())
  tenantId     String
  tenant       Tenant            @relation(fields: [tenantId], references: [id])
  trigger      String            // LEAD_CREATED, LEAD_ASSIGNED, VISIT_SCHEDULED, BOOKING_COMPLETED, PAYMENT_RECEIVED
  action       String            // SEND_WHATSAPP, ASSIGN_TASK, CREATE_REMINDER, NOTIFY_MANAGER
  templateId   String?
  template     WhatsAppTemplate? @relation(fields: [templateId], references: [id])
  isActive     Boolean           @default(true)
  createdAt    DateTime          @default(now())
}

model WhatsAppAuditLog {
  id           String        @id @default(uuid())
  tenantId     String
  tenant       Tenant        @relation(fields: [tenantId], references: [id])
  userId       String
  user         User          @relation(fields: [userId], references: [id])
  action       String        // MESSAGE_SENT, MESSAGE_DELETED, TEMPLATE_USED, AUTOMATION_TRIGGERED, CONVERSATION_ASSIGNED
  chatId       String?
  chat         WhatsAppChat? @relation(fields: [chatId], references: [id])
  details      String?
  timestamp    DateTime      @default(now())
}
`;

fs.writeFileSync(schemaPath, schema + EOL + newModels);
console.log('Successfully injected WhatsApp models and relations.');
