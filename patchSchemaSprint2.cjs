const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Add SalesExecutiveAssignment
if (!schema.includes('model SalesExecutiveAssignment')) {
  const model = `
model SalesExecutiveAssignment {
  id          String   @id @default(uuid())
  tenantId    String
  tenant      Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  leadId      String
  lead        Lead     @relation(fields: [leadId], references: [id])
  executiveId String
  executive   User     @relation(fields: [executiveId], references: [id])
  assignedAt  DateTime @default(now())
}
`;
  schema += model;
}

// 2. Add Negotiation
if (!schema.includes('model Negotiation')) {
  const model = `
model Negotiation {
  id             String   @id @default(uuid())
  tenantId       String
  tenant         Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  leadId         String
  lead           Lead     @relation(fields: [leadId], references: [id])
  unitId         String
  unit           Unit     @relation(fields: [unitId], references: [id])
  offeredPrice   Float
  discountAmount Float
  finalPrice     Float
  approvalStatus String   @default("PENDING") // PENDING, AUTO_APPROVED, MANAGER_APPROVED, DIRECTOR_APPROVED, REJECTED
  notes          String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
`;
  schema += model;
}

// 3. Add Reservation
if (!schema.includes('model Reservation')) {
  const model = `
model Reservation {
  id                String   @id @default(uuid())
  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  leadId            String
  lead              Lead     @relation(fields: [leadId], references: [id])
  unitId            String
  unit              Unit     @relation(fields: [unitId], references: [id])
  executiveId       String
  executive         User     @relation(fields: [executiveId], references: [id])
  reservationAmount Float
  status            String   @default("ACTIVE") // ACTIVE, EXPIRED, CONVERTED, CANCELLED
  expiryDate        DateTime
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
`;
  schema += model;
}

// 4. Update SiteVisit
if (!schema.includes('visitOutcome')) {
  schema = schema.replace(
    /model SiteVisit \{([\s\S]*?)updatedAt\s+DateTime\s+@updatedAt\s*\}/,
    (match, p1) => {
      let updated = match;
      if (!updated.includes('propertyId')) {
        updated = updated.replace(/lead\s+Lead\s+@relation\(fields: \[leadId\], references: \[id\]\)/, 
          `lead            Lead     @relation(fields: [leadId], references: [id])
  propertyId      String?
  propertyProject PropertyProject? @relation(fields: [propertyId], references: [id])
  towerId         String?
  tower           Tower?   @relation(fields: [towerId], references: [id])
  visitOutcome    String?  // INTERESTED, STRONG_INTEREST, NEEDS_FOLLOW_UP, NOT_INTERESTED, LOST`
        );
      }
      return updated;
    }
  );
}

// 5. Update Booking fields (downPayment, installments, paymentStatus, agreementStatus)
if (!schema.includes('downPayment')) {
  schema = schema.replace(
    /model Booking \{([\s\S]*?)updatedAt\s+DateTime\s+@updatedAt\s*\}/,
    (match, p1) => {
      let updated = match;
      if (!updated.includes('paymentStatus')) {
        updated = updated.replace(/bookingAmount\s+Float/, 
          `bookingAmount   Float
  downPayment     Float?   @default(0)
  installments    Int?     @default(0)
  outstanding     Float?   @default(0)
  paymentStatus   String   @default("TOKEN_PENDING") // TOKEN_PENDING, PARTIALLY_PAID, PAID, REFUNDED
  agreementStatus String   @default("PENDING") // PENDING, GENERATED, SIGNED`
        );
      }
      return updated;
    }
  );
}

// 6. Update Tenant and User and Lead models with the new relations to avoid ambiguous errors
// We need to add relations in Tenant, User, Lead, Unit, PropertyProject, Tower

// Let's just append the arrays to Tenant if not present
const tenantAdditions = [
  'salesExecutiveAssignments SalesExecutiveAssignment[]',
  'negotiations          Negotiation[]',
  'reservations          Reservation[]'
];
tenantAdditions.forEach(add => {
  if (!schema.includes(add.split(' ')[0])) {
    schema = schema.replace(/model Tenant \{([\s\S]*?)rentRolls\s+RentRoll\[\]\s*\}/, (match) => {
      return match.replace('rentRolls             RentRoll[]', `rentRolls             RentRoll[]\n  ${add}`);
    });
  }
});

// Append to User
const userAdditions = [
  'salesExecutiveAssignments SalesExecutiveAssignment[]',
  'reservations          Reservation[]'
];
userAdditions.forEach(add => {
  if (!schema.includes(add.split(' ')[0])) {
    schema = schema.replace(/model User \{([\s\S]*?)reportExports\s+ReportExport\[\]\s*\n\s*@@unique\(\[tenantId, email\]\)/, (match) => {
      return match.replace('reportExports  ReportExport[]', `reportExports  ReportExport[]\n  ${add}`);
    });
  }
});

// Append to Lead
const leadAdditions = [
  'salesExecutiveAssignments SalesExecutiveAssignment[]',
  'negotiations          Negotiation[]',
  'reservations          Reservation[]'
];
leadAdditions.forEach(add => {
  if (!schema.includes(add.split(' ')[0])) {
    schema = schema.replace(/model Lead \{([\s\S]*?)bookings\s+Booking\[\]\s*\}/, (match) => {
      return match.replace('bookings        Booking[]', `bookings        Booking[]\n  ${add}`);
    });
  }
});

// Append to Unit
const unitAdditions = [
  'negotiations          Negotiation[]',
  'reservations          Reservation[]'
];
unitAdditions.forEach(add => {
  if (!schema.includes(add.split(' ')[0])) {
    schema = schema.replace(/model Unit \{([\s\S]*?)hotelRoom\s+HotelRoom\?\s*\}/, (match) => {
      return match.replace('hotelRoom        HotelRoom?', `hotelRoom        HotelRoom?\n  ${add}`);
    });
  }
});

// Append to PropertyProject
if (!schema.includes('siteVisits        SiteVisit[]')) {
  schema = schema.replace(/model PropertyProject \{([\s\S]*?)dashboardConfigs\s+DashboardConfig\[\]\s*\}/, (match) => {
    return match.replace('dashboardConfigs DashboardConfig[]', `dashboardConfigs DashboardConfig[]\n  siteVisits        SiteVisit[]`);
  });
}

// Append to Tower
if (!schema.includes('siteVisits        SiteVisit[]')) {
  schema = schema.replace(/model Tower \{([\s\S]*?)floors\s+Floor\[\]\s*\}/, (match) => {
    return match.replace('floors           Floor[]', `floors           Floor[]\n  siteVisits       SiteVisit[]`);
  });
}

fs.writeFileSync(schemaPath, schema);
console.log('Schema patched successfully for CRM Sprint 2.');
