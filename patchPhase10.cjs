const fs = require('fs');
const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const EOL = require('os').EOL;

if (schema.includes('// 39. ADVANCED FACILITY MANAGEMENT CLOUD')) {
  console.log('Already patched.');
  process.exit(0);
}

// Helper to inject fields into a model
function injectFields(modelName, fields) {
  const regex = new RegExp("model " + modelName + " \\\\{[\\\\s\\\\S]*?\\\\}");
  schema = schema.replace(regex, match => {
    return match.substring(0, match.lastIndexOf('}')) + fields.join(EOL) + EOL + '}';
  });
}

injectFields('Tenant', [
  '  campuses                Campus[]',
  '  assetCategories         AssetCategory[]',
  '  maintenancePlans        MaintenancePlan[]',
  '  utilityMeters           UtilityMeter[]',
  '  esgMetrics              ESGMetric[]'
]);

injectFields('PropertyProject', [
  '  campusId           String?',
  '  campus             Campus?  @relation(fields: [campusId], references: [id])',
  '  zones              Zone[]',
  '  utilityMeters      UtilityMeter[]'
]);

injectFields('FacilityAsset', [
  '  categoryId         String?',
  '  category           AssetCategory? @relation(fields: [categoryId], references: [id])',
  '  depreciation       AssetDepreciation?',
  '  maintenancePlans   MaintenancePlan[]'
]);

injectFields('WorkOrder', [
  '  laborCost          Decimal  @default(0)',
  '  materialCost       Decimal  @default(0)'
]);

injectFields('Employee', [
  '  maintenanceSchedules MaintenanceSchedule[]'
]);

const newModels = fs.readFileSync('phase10.prisma', 'utf8');
fs.writeFileSync(schemaPath, schema + EOL + EOL + newModels + EOL);
console.log('Phase 10 Patch completed successfully.');
