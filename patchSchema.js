const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Add new relation fields to existing models
const additions = {
  'model Tenant {': `  familyMembers    FamilyMember[]\n  documents        Document[]\n  workOrders       WorkOrder[]\n  vendorContracts  VendorContract[]\n  amcContracts     AmcContract[]\n  facilityInspections FacilityInspection[]\n  maintenanceChecklists MaintenanceChecklist[]\n  maintenanceTasks MaintenanceTask[]\n`,
  'model Customer {': `  familyMembers    FamilyMember[]\n  documents        Document[]\n  ownedUnits       Unit[] @relation("UnitOwner")\n`,
  'model Unit {': `  documents        Document[]\n  ownerId          String?\n  owner            Customer? @relation("UnitOwner", fields: [ownerId], references: [id])\n`,
  'model Vendor {': `  vendorContracts  VendorContract[]\n  workOrders       WorkOrder[]\n`,
  'model Complaint {': `  workOrders       WorkOrder[]\n`,
  'model FacilityAsset {': `  amcContracts     AmcContract[]\n  inspections      FacilityInspection[]\n  depreciationRecords DepreciationRecord[]\n`,
  'model MaintenanceSchedule {': `  checklists       MaintenanceChecklist[]\n`,
  'model VisitorLog {': `  vehiclePlate     String?\n  qrCode           String? @unique\n`,
  'model Employee {': `  inspections      FacilityInspection[]\n  workOrders       WorkOrder[]\n`
};

for (const [modelDec, addition] of Object.entries(additions)) {
  const regex = new RegExp(`(${modelDec}[\\s\\S]*?)(?=})`);
  schema = schema.replace(regex, `$1${addition}`);
}

// 2. Append new models
const newModels = `
// ------------------------------------------------------
// 36. PROPERTY OPERATIONS CLOUD (Phase 6)
// ------------------------------------------------------
model FamilyMember {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  customerId         String
  customer           Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  firstName          String
  lastName           String
  relation           String   // SPOUSE, CHILD, PARENT
  dateOfBirth        DateTime?
  contactNumber      String?
  
  @@map("family_members")
}

model Document {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  // Polymorphic-like associations
  customerId         String?
  customer           Customer? @relation(fields: [customerId], references: [id])
  unitId             String?
  unit               Unit?     @relation(fields: [unitId], references: [id])
  
  title              String
  documentType       String    // AGREEMENT, KYC, REGISTRY, NOC
  fileUrl            String
  version            Int       @default(1)
  expiryDate         DateTime?
  status             String    @default("ACTIVE") // ACTIVE, EXPIRED, ARCHIVED
  createdAt          DateTime  @default(now())

  @@map("documents")
}

model WorkOrder {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  complaintId        String?
  complaint          Complaint? @relation(fields: [complaintId], references: [id])
  
  assignedVendorId   String?
  vendor             Vendor?    @relation(fields: [assignedVendorId], references: [id])
  assignedTechId     String?
  technician         Employee?  @relation(fields: [assignedTechId], references: [id])
  
  title              String
  description        String
  priority           String     @default("MEDIUM")
  status             String     @default("CREATED") // CREATED, APPROVED, IN_PROGRESS, COMPLETED, CANCELLED
  estimatedCost      Decimal    @default(0)
  actualCost         Decimal    @default(0)
  scheduledDate      DateTime?
  completedDate      DateTime?
  
  @@map("work_orders")
}

model VendorContract {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  vendorId           String
  vendor             Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  contractTitle      String
  startDate          DateTime
  endDate            DateTime
  contractValue      Decimal
  performanceRating  Decimal? // 1-5
  status             String   @default("ACTIVE") // ACTIVE, EXPIRED, TERMINATED

  @@map("vendor_contracts")
}

model AmcContract {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  facilityAssetId    String
  facilityAsset      FacilityAsset @relation(fields: [facilityAssetId], references: [id], onDelete: Cascade)
  
  providerName       String
  startDate          DateTime
  endDate            DateTime
  cost               Decimal
  visitsPerYear      Int      @default(0)
  
  @@map("amc_contracts")
}

model FacilityInspection {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  facilityAssetId    String
  facilityAsset      FacilityAsset @relation(fields: [facilityAssetId], references: [id], onDelete: Cascade)
  inspectorId        String?
  inspector          Employee? @relation(fields: [inspectorId], references: [id])
  
  inspectionDate     DateTime @default(now())
  result             String   // PASS, FAIL, MAINTENANCE_REQUIRED
  notes              String?
  
  @@map("facility_inspections")
}

model DepreciationRecord {
  id                 String   @id @default(uuid())
  facilityAssetId    String
  facilityAsset      FacilityAsset @relation(fields: [facilityAssetId], references: [id], onDelete: Cascade)
  
  year               Int
  depreciationAmount Decimal
  currentValue       Decimal
  
  @@map("depreciation_records")
}

model MaintenanceChecklist {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  scheduleId         String
  schedule           MaintenanceSchedule @relation(fields: [scheduleId], references: [id], onDelete: Cascade)
  
  name               String
  status             String   @default("PENDING") // PENDING, IN_PROGRESS, COMPLETED

  tasks              MaintenanceTask[]
  
  @@map("maintenance_checklists")
}

model MaintenanceTask {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  checklistId        String
  checklist          MaintenanceChecklist @relation(fields: [checklistId], references: [id], onDelete: Cascade)
  
  taskDescription    String
  isCompleted        Boolean  @default(false)
  completedAt        DateTime?
  
  @@map("maintenance_tasks")
}
`;

fs.writeFileSync(schemaPath, schema + newModels);
console.log('Schema patched successfully.');
