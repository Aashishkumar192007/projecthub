const fs = require('fs');
const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

const EOL = require('os').EOL;

if (schema.includes('// 38. PROCUREMENT & INVENTORY CLOUD')) {
  console.log('Already patched.');
  process.exit(0);
}

// Helper to inject fields into a model
function injectFields(modelName, fields) {
  const regex = new RegExp(\`model \${modelName} \\\\{[\\\\s\\\\S]*?\\\\}\`);
  schema = schema.replace(regex, match => {
    return match.substring(0, match.lastIndexOf('}')) + fields.join(EOL) + EOL + '}';
  });
}

injectFields('Tenant', [
  '  vendorKycs              VendorKyc[]',
  '  vendorPerformances      VendorPerformance[]',
  '  purchaseRequisitions    PurchaseRequisition[]',
  '  goodsReceiptNotes       GoodsReceiptNote[]',
  '  itemCategories          ItemCategory[]',
  '  itemMasters             ItemMaster[]',
  '  inventoryTransactions   InventoryTransaction[]',
  '  inventoryLedgers        InventoryLedger[]',
  '  budgets                 Budget[]'
]);

injectFields('Vendor', [
  '  kyc                     VendorKyc?',
  '  performance             VendorPerformance?'
]);

injectFields('Invoice', [
  '  purchaseOrderId         String?',
  '  purchaseOrder           PurchaseOrder?     @relation(fields: [purchaseOrderId], references: [id])',
  '  goodsReceiptNoteId      String?',
  '  goodsReceiptNote        GoodsReceiptNote?  @relation(fields: [goodsReceiptNoteId], references: [id])',
  '  isThreeWayMatched       Boolean            @default(false)'
]);

injectFields('PurchaseOrder', [
  '  prId               String?',
  '  purchaseRequisition PurchaseRequisition? @relation(fields: [prId], references: [id])',
  '  items              PurchaseOrderItem[]',
  '  goodsReceiptNotes  GoodsReceiptNote[]',
  '  invoices           Invoice[]'
]);

injectFields('Warehouse', [
  '  zones              WarehouseZone[]',
  '  grns               GoodsReceiptNote[]',
  '  ledgers            InventoryLedger[]',
  '  transactions       InventoryTransaction[]'
]);

const newModels = fs.readFileSync('phase9.prisma', 'utf8');
fs.writeFileSync(schemaPath, schema + EOL + EOL + newModels + EOL);
console.log('Patch completed successfully.');
