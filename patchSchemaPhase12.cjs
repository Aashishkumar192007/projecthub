const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

if (!schema.includes('enum LeadStatus')) {
  schema += "\n\nenum LeadStatus {\n  NEW\n  CONTACTED\n  QUALIFIED\n  VISIT_SCHEDULED\n  VISIT_COMPLETED\n  NEGOTIATION\n  BOOKING\n  WON\n  LOST\n}\n";
}

const newModels = `
// ------------------------------------------------------
// CRM & SALES CLOUD MODELS
// ------------------------------------------------------

model LeadNote {
  id        String   @id @default(uuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  leadId    String
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  content   String
  authorId  String
  author    User     @relation("LeadNoteAuthor", fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model LeadActivity {
  id        String   @id @default(uuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  leadId    String
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  type      String   // CALL, EMAIL, WHATSAPP, NOTE, STATUS_CHANGE
  title     String
  details   String?
  userId    String?
  user      User?    @relation("LeadActivityUser", fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

model SiteVisit {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  leadId          String
  lead            Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  projectId       String?
  propertyProject PropertyProject? @relation(fields: [projectId], references: [id])
  scheduledAt     DateTime
  completedAt     DateTime?
  status          String   @default("SCHEDULED") // SCHEDULED, COMPLETED, CANCELLED
  assignedAgentId String?
  agent           User?    @relation("SiteVisitAgent", fields: [assignedAgentId], references: [id])
  feedback        String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model InterestedUnit {
  id        String   @id @default(uuid())
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  leadId    String
  lead      Lead     @relation(fields: [leadId], references: [id], onDelete: Cascade)
  unitId    String
  unit      Unit     @relation(fields: [unitId], references: [id])
  status    String   @default("INTERESTED") // INTERESTED, RESERVED
  reservedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Booking {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  leadId          String
  lead            Lead     @relation(fields: [leadId], references: [id])
  customerId      String?
  customer        Customer? @relation(fields: [customerId], references: [id])
  unitId          String
  unit            Unit     @relation(fields: [unitId], references: [id])
  projectId       String?
  propertyProject PropertyProject? @relation(fields: [projectId], references: [id])
  bookingAmount   Float
  status          String   @default("PENDING") // PENDING, CONFIRMED, CANCELLED
  assignedAgentId String?
  agent           User?    @relation("BookingAgent", fields: [assignedAgentId], references: [id])
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
`;

if (!schema.includes('model LeadNote')) {
  schema += newModels;
}

const leadRegex = /model Lead \{[\s\S]*?@@map\("leads"\)\s*\}/;
const newLeadModel = `model Lead {
  id              String       @id @default(uuid())
  tenantId        String
  tenant          Tenant       @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  name            String
  phone           String
  email           String?
  source          String       @default("ORGANIC")
  campaignId      String?
  score           Int          @default(0)
  status          LeadStatus   @default(NEW)
  
  assignedToId    String?
  agent           User?        @relation("LeadAssignedAgent", fields: [assignedToId], references: [id])
  
  budgetMin       Float?
  budgetMax       Float?

  customerId      String?
  customer        Customer?    @relation(fields: [customerId], references: [id])
  
  sourceId        String?
  leadSource      LeadSource?  @relation(fields: [sourceId], references: [id])
  
  brokerLead      BrokerLead?
  opportunities   Opportunity[]

  notes           LeadNote[]
  activities      LeadActivity[]
  siteVisits      SiteVisit[]
  bookings        Booking[]
  interestedUnits InterestedUnit[]

  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@map("leads")
}`;

schema = schema.replace(leadRegex, newLeadModel);

const tenantRelations = "\n  leadNotes LeadNote[]\n  leadActivities LeadActivity[]\n  siteVisits SiteVisit[]\n  interestedUnits InterestedUnit[]\n  bookings Booking[]\n";
if (!schema.includes('leadNotes LeadNote[]')) {
  schema = schema.replace('leads                 Lead[]', 'leads                 Lead[]' + tenantRelations);
}

const userRelations = "\n  authoredLeadNotes LeadNote[] @relation(\"LeadNoteAuthor\")\n  authoredLeadActivities LeadActivity[] @relation(\"LeadActivityUser\")\n  assignedSiteVisits SiteVisit[] @relation(\"SiteVisitAgent\")\n  assignedBookings Booking[] @relation(\"BookingAgent\")\n  assignedLeads Lead[] @relation(\"LeadAssignedAgent\")\n";
if (!schema.includes('authoredLeadNotes LeadNote[]')) {
  schema = schema.replace('leads                 Lead[]', 'leads                 Lead[]' + userRelations);
}

const unitRelations = "\n  interestedUnits InterestedUnit[]\n  bookings Booking[]\n";
if (!schema.includes('interestedUnits InterestedUnit[]')) {
  schema = schema.replace('@@map("units")', unitRelations + '  @@map("units")');
}

const projectRelations = "\n  siteVisits SiteVisit[]\n  bookings Booking[]\n";
if (!schema.includes('siteVisits SiteVisit[]')) {
  schema = schema.replace('@@map("property_projects")', projectRelations + '  @@map("property_projects")');
}

fs.writeFileSync(schemaPath, schema);
console.log('Schema patched successfully.');
