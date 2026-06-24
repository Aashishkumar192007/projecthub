const fs = require('fs');

const schemaPath = 'prisma/schema.prisma';
let schema = fs.readFileSync(schemaPath, 'utf8');

if (schema.includes('// 38. PROCUREMENT & INVENTORY CLOUD')) {
  console.log('Already patched.');
  process.exit(0);
}

// 1. Tenant
schema = schema.replace(/model Tenant \\{[\\s\\S]*?\\n\\}/, match => {
  return match.replace(/\\n\\}$/, [
    '  vendorKycs              VendorKyc[]',
    '  vendorPerformances      VendorPerformance[]',
    '  purchaseRequisitions    PurchaseRequisition[]',
    '  goodsReceiptNotes       GoodsReceiptNote[]',
    '  itemCategories          ItemCategory[]',
    '  itemMasters             ItemMaster[]',
    '  inventoryTransactions   InventoryTransaction[]',
    '  inventoryLedgers        InventoryLedger[]',
    '  budgets                 Budget[]',
    '}'
  ].map(s => '\\n' + s).join(''));
});

// 2. Vendor
schema = schema.replace(/model Vendor \\{[\\s\\S]*?\\n\\}/, match => {
  return match.replace(/\\n\\}$/, [
    '  kyc                     VendorKyc?',
    '  performance             VendorPerformance?',
    '}'
  ].map(s => '\\n' + s).join(''));
});

// 3. Invoice
schema = schema.replace(/model Invoice \\{[\\s\\S]*?\\n\\}/, match => {
  return match.replace(/\\n\\}$/, [
    '  purchaseOrderId         String?',
    '  purchaseOrder           PurchaseOrder?     @relation(fields: [purchaseOrderId], references: [id])',
    '  goodsReceiptNoteId      String?',
    '  goodsReceiptNote        GoodsReceiptNote?  @relation(fields: [goodsReceiptNoteId], references: [id])',
    '  isThreeWayMatched       Boolean            @default(false)',
    '}'
  ].map(s => '\\n' + s).join(''));
});

// 4. PurchaseOrder (already exists)
schema = schema.replace(/model PurchaseOrder \\{[\\s\\S]*?\\n\\}/, match => {
  return match.replace(/\\n\\}$/, [
    '  prId               String?',
    '  purchaseRequisition PurchaseRequisition? @relation(fields: [prId], references: [id])',
    '  items              PurchaseOrderItem[]',
    '  goodsReceiptNotes  GoodsReceiptNote[]',
    '  invoices           Invoice[]',
    '}'
  ].map(s => '\\n' + s).join(''));
});

// 5. Warehouse (already exists)
schema = schema.replace(/model Warehouse \\{[\\s\\S]*?\\n\\}/, match => {
  return match.replace(/\\n\\}$/, [
    '  zones              WarehouseZone[]',
    '  grns               GoodsReceiptNote[]',
    '  ledgers            InventoryLedger[]',
    '  transactions       InventoryTransaction[]',
    '}'
  ].map(s => '\\n' + s).join(''));
});

const newModels = fs.readFileSync('phase9.prisma', 'utf8');

fs.writeFileSync(schemaPath, schema + '\\n' + newModels + '\\n');
console.log('Patch complete.');
