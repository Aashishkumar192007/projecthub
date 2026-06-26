const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// 1. Add CustomerOwnership
if (!schema.includes('model CustomerOwnership')) {
  schema += `
model CustomerOwnership {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  customerId      String
  customer        Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  propertyId      String?
  propertyProject PropertyProject? @relation(fields: [propertyId], references: [id])
  unitId          String?
  unit            Unit?    @relation(fields: [unitId], references: [id])
  ownershipPct    Float    @default(100.0)
  purchaseDate    DateTime?
  purchaseValue   Float?
  currentValue    Float?
  roi             Float?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("customer_ownerships")
}
`;
}

// 2. Add CustomerInteraction
if (!schema.includes('model CustomerInteraction')) {
  schema += `
model CustomerInteraction {
  id          String   @id @default(uuid())
  tenantId    String
  tenant      Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  customerId  String
  customer    Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)
  type        String // CALL, EMAIL, WHATSAPP, MEETING, SITE_VISIT, NEGOTIATION, BOOKING
  summary     String
  notes       String?
  date        DateTime @default(now())
  createdAt   DateTime @default(now())
  
  @@map("customer_interactions")
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
  'customerOwnerships   CustomerOwnership[]',
  'customerInteractions CustomerInteraction[]'
]);

schema = appendToModel(schema, 'Customer', [
  'ownerships        CustomerOwnership[]',
  'interactions      CustomerInteraction[]'
]);

schema = appendToModel(schema, 'PropertyProject', [
  'customerOwnerships CustomerOwnership[]'
]);

schema = appendToModel(schema, 'Unit', [
  'customerOwnerships CustomerOwnership[]'
]);

fs.writeFileSync(schemaPath, schema);
console.log('Schema patched successfully for CRM Sprint 3.');
