const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Add Resident Model
if (!schema.includes('model Resident {')) {
  schema += `
model Resident {
  id         String   @id @default(uuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  customerId String
  customer   Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  
  type       String   @default("OWNER") // OWNER, TENANT, FAMILY_MEMBER
  status     String   @default("ACTIVE") // ACTIVE, MOVE_IN_PENDING, MOVE_OUT_SCHEDULED, INACTIVE
  
  occupancies      Occupancy[]
  amenityBookings  AmenityBooking[]
  complaints       Complaint[]
  maintenanceBills MaintenanceBill[]
  visitorLogs      VisitorLog[]

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("residents")
}
`;
}

// 2. Add Occupancy Model
if (!schema.includes('model Occupancy {')) {
  schema += `
model Occupancy {
  id         String   @id @default(uuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  residentId String
  resident   Resident @relation(fields: [residentId], references: [id], onDelete: Cascade)
  unitId     String
  unit       Unit     @relation(fields: [unitId], references: [id], onDelete: Cascade)
  
  moveInDate  DateTime?
  moveOutDate DateTime?
  status      String    @default("ACTIVE") // ACTIVE, PAST, PENDING

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("occupancies")
}
`;
}

// 3. Add Amenity Model
if (!schema.includes('model Amenity {')) {
  schema += `
model Amenity {
  id              String           @id @default(uuid())
  tenantId        String
  tenant          Tenant           @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  projectId       String
  propertyProject PropertyProject  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  name            String
  category        String // CLUBHOUSE, POOL, GYM, BANQUET, SPORTS_COURT, CONFERENCE
  capacity        Int?
  status          String           @default("AVAILABLE") // AVAILABLE, MAINTENANCE, CLOSED
  
  bookings        AmenityBooking[]

  @@map("amenities")
}
`;
}

// 4. Add AmenityBooking Model
if (!schema.includes('model AmenityBooking {')) {
  schema += `
model AmenityBooking {
  id         String   @id @default(uuid())
  tenantId   String
  tenant     Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  amenityId  String
  amenity    Amenity  @relation(fields: [amenityId], references: [id], onDelete: Cascade)
  residentId String
  resident   Resident @relation(fields: [residentId], references: [id], onDelete: Cascade)
  
  startTime  DateTime
  endTime    DateTime
  status     String   @default("PENDING") // PENDING, APPROVED, CANCELLED, COMPLETED
  paymentRef String?

  @@map("amenity_bookings")
}
`;
}

function appendToModel(schemaName, modelName, fieldsToAdd) {
  const regexStr = '(model \\\\s+' + modelName + '\\\\s+\\\\{[\\\\s\\\\S]*?)(\\\\}\\\\s*)';
  const modelRegex = new RegExp(regexStr);
  let updatedSchema = schemaName;
  
  const match = updatedSchema.match(modelRegex);
  if (!match) return updatedSchema;

  fieldsToAdd.forEach(field => {
    const fieldName = field.trim().split(/\\s+/)[0];
    const fieldPattern = new RegExp('\\\\b' + fieldName + '\\\\b\\\\s+');
    
    if (!match[1].match(fieldPattern)) {
      updatedSchema = updatedSchema.replace(modelRegex, '$1  ' + field + '\\n$2');
    }
  });
  
  return updatedSchema;
}

schema = appendToModel(schema, 'Tenant', [
  'residents Resident[]',
  'occupancies Occupancy[]',
  'amenities Amenity[]',
  'amenityBookings AmenityBooking[]'
]);

schema = appendToModel(schema, 'Customer', [
  'residents Resident[]'
]);

schema = appendToModel(schema, 'Unit', [
  'occupancies Occupancy[]'
]);

schema = appendToModel(schema, 'PropertyProject', [
  'amenities Amenity[]'
]);

// Update Complaint model
schema = appendToModel(schema, 'Complaint', [
  'residentId String?',
  'resident   Resident? @relation(fields: [residentId], references: [id])'
]);

// Update MaintenanceBill model
schema = appendToModel(schema, 'MaintenanceBill', [
  'residentId String?',
  'resident   Resident? @relation(fields: [residentId], references: [id])'
]);

// Update VisitorLog model
schema = appendToModel(schema, 'VisitorLog', [
  'residentId String?',
  'resident   Resident? @relation(fields: [residentId], references: [id])'
]);

fs.writeFileSync(schemaPath, schema);
console.log('Schema patched successfully for Sprint 4.');
