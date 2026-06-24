const fs = require('fs');
const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const EOL = require('os').EOL;

if (schema.includes('// 40. CONSTRUCTION ERP CLOUD')) {
  console.log('Already patched.');
  process.exit(0);
}

function injectFields(modelName, fields) {
  const regex = new RegExp("model " + modelName + " \\\\{[\\\\s\\\\S]*?\\\\}");
  schema = schema.replace(regex, match => {
    return match.substring(0, match.lastIndexOf('}')) + fields.join(EOL) + EOL + '}';
  });
}

injectFields('Tenant', [
  '  landParcels             LandParcel[]'
]);

injectFields('PropertyProject', [
  '  landParcelId       String?',
  '  landParcel         LandParcel? @relation(fields: [landParcelId], references: [id])',
  '  lifecycleState     String      @default("CONCEPT") // CONCEPT, FEASIBILITY, PLANNING, CONSTRUCTION, HANDOVER, CLOSURE',
  '  boqTemplates       BoqTemplate[]',
  '  dailyProgressReports DailyProgressReport[]',
  '  defects            Defect[]',
  '  safetyAudits       SafetyAudit[]',
  '  incidentReports    IncidentReport[]',
  '  projectWip         ProjectWip?'
]);

injectFields('VendorPerformance', [
  '  safetyScore        Float    @default(0)',
  '  deliveryScore      Float    @default(0)'
]);

injectFields('PurchaseRequisitionItem', [
  '  boqItemId          String?',
  '  boqItem            BoqItem? @relation(fields: [boqItemId], references: [id])'
]);

injectFields('Budget', [
  '  materialBudget     Decimal  @default(0)',
  '  laborBudget        Decimal  @default(0)',
  '  equipmentBudget    Decimal  @default(0)',
  '  contractorBudget   Decimal  @default(0)'
]);

injectFields('Unit', [
  '  snagLists          SnagList[]'
]);

const newModels = fs.readFileSync('phase11.prisma', 'utf8');
fs.writeFileSync(schemaPath, schema + EOL + EOL + newModels + EOL);
console.log('Phase 11 Patch completed successfully.');
