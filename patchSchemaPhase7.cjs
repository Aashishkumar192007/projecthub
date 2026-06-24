const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Add new relation fields to existing models
const additions = {
  'model Society {': `  committeeMembers CommitteeMember[]\n  agmMeetings      AgmMeeting[]\n  polls            Poll[]\n`,
  'model Customer {': `  pets             Pet[]\n  emergencyContacts EmergencyContact[]\n  committeeRoles   CommitteeMember[]\n  votes            Vote[]\n  facilityBookings FacilityBooking[]\n`,
  'model VisitorLog {': `  guestInvitationId String?\n  guestInvitation   GuestInvitation? @relation(fields: [guestInvitationId], references: [id])\n  deliveryLog       DeliveryLog?\n`,
  'model MaintenanceBill {': `  lineItems        MaintenanceBillLineItem[]\n`,
  'model EventSpace {': `  facilityBookings FacilityBooking[]\n`
};

for (const [modelDec, addition] of Object.entries(additions)) {
  const regex = new RegExp(`(${modelDec}[\\s\\S]*?)(?=})`);
  schema = schema.replace(regex, `$1${addition}`);
}

// 2. Append new models
const newModels = `
// ------------------------------------------------------
// 37. SOCIETY MANAGEMENT CLOUD (Phase 7)
// ------------------------------------------------------
model CommitteeMember {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  societyId          String
  society            Society  @relation(fields: [societyId], references: [id], onDelete: Cascade)
  customerId         String
  customer           Customer @relation(fields: [customerId], references: [id])
  
  role               String   // PRESIDENT, SECRETARY, TREASURER, MEMBER
  termStartDate      DateTime
  termEndDate        DateTime?
  status             String   @default("ACTIVE") // ACTIVE, RESIGNED, COMPLETED

  @@map("committee_members")
}

model Pet {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  customerId         String
  customer           Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  name               String
  species            String   // DOG, CAT, BIRD
  breed              String?
  vaccinationDate    DateTime?
  
  @@map("pets")
}

model EmergencyContact {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  customerId         String
  customer           Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  name               String
  relationship       String
  phoneNumber        String
  
  @@map("emergency_contacts")
}

model GuestInvitation {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  hostId             String
  host               Customer @relation("HostInvitations", fields: [hostId], references: [id], onDelete: Cascade)
  
  guestName          String
  expectedDate       DateTime
  qrCode             String   @unique
  status             String   @default("VALID") // VALID, USED, EXPIRED

  visitorLogs        VisitorLog[]
  
  @@map("guest_invitations")
}

model DeliveryLog {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  visitorLogId       String   @unique
  visitorLog         VisitorLog @relation(fields: [visitorLogId], references: [id], onDelete: Cascade)
  
  deliveryCompany    String
  packageCount       Int      @default(1)
  receivedBySecurity Boolean  @default(false)
  
  @@map("delivery_logs")
}

model MaintenanceBillLineItem {
  id                 String   @id @default(uuid())
  maintenanceBillId  String
  maintenanceBill    MaintenanceBill @relation(fields: [maintenanceBillId], references: [id], onDelete: Cascade)
  
  description        String   // COMMON_AREA, SINKING_FUND, PARKING, WATER
  amount             Decimal

  @@map("maintenance_bill_line_items")
}

model FacilityBooking {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  facilityId         String
  facility           EventSpace @relation(fields: [facilityId], references: [id])
  customerId         String
  customer           Customer @relation(fields: [customerId], references: [id])
  
  startTime          DateTime
  endTime            DateTime
  totalFee           Decimal  @default(0)
  status             String   @default("PENDING_APPROVAL") // PENDING_APPROVAL, APPROVED, REJECTED, CANCELLED

  @@map("facility_bookings")
}

model AgmMeeting {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  societyId          String
  society            Society  @relation(fields: [societyId], references: [id], onDelete: Cascade)
  
  title              String
  meetingDate        DateTime
  meetingUrl         String?
  status             String   @default("SCHEDULED") // SCHEDULED, IN_PROGRESS, CONCLUDED
  minutesUrl         String?

  @@map("agm_meetings")
}

model Poll {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  societyId          String
  society            Society  @relation(fields: [societyId], references: [id], onDelete: Cascade)
  
  title              String
  description        String?
  expiresAt          DateTime
  status             String   @default("ACTIVE") // ACTIVE, CLOSED

  options            PollOption[]
  votes              Vote[]

  @@map("polls")
}

model PollOption {
  id                 String   @id @default(uuid())
  pollId             String
  poll               Poll     @relation(fields: [pollId], references: [id], onDelete: Cascade)
  
  optionText         String

  votes              Vote[]

  @@map("poll_options")
}

model Vote {
  id                 String   @id @default(uuid())
  pollId             String
  poll               Poll     @relation(fields: [pollId], references: [id], onDelete: Cascade)
  optionId           String
  option             PollOption @relation(fields: [optionId], references: [id])
  customerId         String
  customer           Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  votedAt            DateTime @default(now())

  @@unique([pollId, customerId])
  @@map("votes")
}
`;

fs.writeFileSync(schemaPath, schema + newModels);
console.log('Phase 7 Schema patched successfully.');
