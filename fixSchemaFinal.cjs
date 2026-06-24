const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let lines = fs.readFileSync(schemaPath, 'utf8').split(/\\r?\\n/);

let newLines = [];
let insideModel = false;
let currentModel = '';
let currentFields = new Set();

const phase9Fields = new Set([
  'vendorKycs', 'vendorPerformances', 'purchaseRequisitions', 'purchaseOrders',
  'goodsReceiptNotes', 'itemCategories', 'itemMasters', 'warehouses',
  'inventoryTransactions', 'inventoryLedgers', 'budgets',
  'kyc', 'performance',
  'purchaseOrderId', 'purchaseOrder', 'goodsReceiptNoteId', 'goodsReceiptNote', 'isThreeWayMatched'
]);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();

  // If we hit the Phase 9 marker, stop processing entirely
  if (trimmed.startsWith('// 38. PROCUREMENT & INVENTORY CLOUD')) {
    break;
  }

  if (trimmed.startsWith('model ')) {
    insideModel = true;
    currentModel = trimmed.split(/\\s+/)[1];
    currentFields = new Set();
    newLines.push(line);
    continue;
  }

  if (insideModel && trimmed === '}') {
    insideModel = false;
    
    // Inject correct fields right before the closing brace
    if (currentModel === 'Tenant') {
      newLines.push('  vendorKycs              VendorKyc[]');
      newLines.push('  vendorPerformances      VendorPerformance[]');
      newLines.push('  purchaseRequisitions    PurchaseRequisition[]');
      newLines.push('  purchaseOrders          PurchaseOrder[]');
      newLines.push('  goodsReceiptNotes       GoodsReceiptNote[]');
      newLines.push('  itemCategories          ItemCategory[]');
      newLines.push('  itemMasters             ItemMaster[]');
      newLines.push('  warehouses              Warehouse[]');
      newLines.push('  inventoryTransactions   InventoryTransaction[]');
      newLines.push('  inventoryLedgers        InventoryLedger[]');
      newLines.push('  budgets                 Budget[]');
    } else if (currentModel === 'Vendor') {
      newLines.push('  kyc                     VendorKyc?');
      newLines.push('  performance             VendorPerformance?');
      newLines.push('  purchaseOrders          PurchaseOrder[]');
    } else if (currentModel === 'Invoice') {
      newLines.push('  purchaseOrderId         String?');
      newLines.push('  purchaseOrder           PurchaseOrder?     @relation(fields: [purchaseOrderId], references: [id])');
      newLines.push('  goodsReceiptNoteId      String?');
      newLines.push('  goodsReceiptNote        GoodsReceiptNote?  @relation(fields: [goodsReceiptNoteId], references: [id])');
      newLines.push('  isThreeWayMatched       Boolean            @default(false)');
    }
    
    newLines.push(line);
    continue;
  }

  if (insideModel && trimmed.length > 0 && !trimmed.startsWith('//') && !trimmed.startsWith('@@')) {
    const propName = trimmed.split(/\\s+/)[0];
    
    // If it's a phase 9 field, we omit it here because we inject them manually at the end of the model block
    if (phase9Fields.has(propName)) {
      continue; // Skip it!
    }
  }

  newLines.push(line);
}

const newModels = [
  '// ------------------------------------------------------',
  '// 38. PROCUREMENT & INVENTORY CLOUD (Phase 9)',
  '// ------------------------------------------------------',
  '',
  'model VendorKyc {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  vendorId           String   @unique',
  '  vendor             Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)',
  '  ',
  '  gstNumber          String?',
  '  panNumber          String?',
  '  bankName           String?',
  '  accountNumber      String?',
  '  ifscCode           String?',
  '  insuranceDocUrl    String?',
  '  kycStatus          String   @default("PENDING") // PENDING, APPROVED, REJECTED',
  '  ',
  '  @@map("vendor_kycs")',
  '}',
  '',
  'model VendorPerformance {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  vendorId           String   @unique',
  '  vendor             Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)',
  '  ',
  '  slaComplianceScore Float    @default(0)',
  '  avgResponseTime    Float    @default(0) // in hours',
  '  qualityRating      Float    @default(0) // 1-5 scale',
  '  residentFeedback   Float    @default(0) // 1-5 scale',
  '  ',
  '  @@map("vendor_performances")',
  '}',
  '',
  'model PurchaseRequisition {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  ',
  '  requesterId        String',
  '  requester          Employee @relation(fields: [requesterId], references: [id])',
  '  department         String',
  '  status             String   @default("DRAFT") // DRAFT, PENDING_APPROVAL, APPROVED, REJECTED',
  '  createdAt          DateTime @default(now())',
  '  ',
  '  items              PurchaseRequisitionItem[]',
  '  purchaseOrders     PurchaseOrder[]',
  '  ',
  '  @@map("purchase_requisitions")',
  '}',
  '',
  'model PurchaseRequisitionItem {',
  '  id                 String   @id @default(uuid())',
  '  prId               String',
  '  purchaseRequisition PurchaseRequisition @relation(fields: [prId], references: [id], onDelete: Cascade)',
  '  ',
  '  itemMasterId       String',
  '  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])',
  '  quantity           Int',
  '  estimatedPrice     Decimal',
  '  ',
  '  @@map("purchase_requisition_items")',
  '}',
  '',
  'model PurchaseOrder {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  ',
  '  prId               String?',
  '  purchaseRequisition PurchaseRequisition? @relation(fields: [prId], references: [id])',
  '  vendorId           String',
  '  vendor             Vendor   @relation(fields: [vendorId], references: [id])',
  '  ',
  '  status             String   @default("ISSUED") // ISSUED, AMENDED, CANCELLED, FULFILLED',
  '  totalAmount        Decimal',
  '  issueDate          DateTime @default(now())',
  '  ',
  '  items              PurchaseOrderItem[]',
  '  goodsReceiptNotes  GoodsReceiptNote[]',
  '  invoices           Invoice[]',
  '  ',
  '  @@map("purchase_orders")',
  '}',
  '',
  'model PurchaseOrderItem {',
  '  id                 String   @id @default(uuid())',
  '  poId               String',
  '  purchaseOrder      PurchaseOrder @relation(fields: [poId], references: [id], onDelete: Cascade)',
  '  ',
  '  itemMasterId       String',
  '  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])',
  '  quantity           Int',
  '  unitPrice          Decimal',
  '  ',
  '  @@map("purchase_order_items")',
  '}',
  '',
  'model GoodsReceiptNote {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  ',
  '  poId               String',
  '  purchaseOrder      PurchaseOrder @relation(fields: [poId], references: [id])',
  '  warehouseId        String',
  '  warehouse          Warehouse @relation(fields: [warehouseId], references: [id])',
  '  ',
  '  status             String   @default("RECEIVED") // RECEIVED, PARTIAL, QUALITY_CHECK_FAILED',
  '  receiptDate        DateTime @default(now())',
  '  ',
  '  items              GoodsReceiptNoteItem[]',
  '  invoices           Invoice[]',
  '  ',
  '  @@map("goods_receipt_notes")',
  '}',
  '',
  'model GoodsReceiptNoteItem {',
  '  id                 String   @id @default(uuid())',
  '  grnId              String',
  '  goodsReceiptNote   GoodsReceiptNote @relation(fields: [grnId], references: [id], onDelete: Cascade)',
  '  ',
  '  itemMasterId       String',
  '  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])',
  '  receivedQuantity   Int',
  '  acceptedQuantity   Int',
  '  rejectedQuantity   Int      @default(0)',
  '  ',
  '  @@map("goods_receipt_note_items")',
  '}',
  '',
  'model ItemCategory {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  ',
  '  name               String',
  '  description        String?',
  '  ',
  '  items              ItemMaster[]',
  '  ',
  '  @@map("item_categories")',
  '}',
  '',
  'model ItemMaster {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  categoryId         String',
  '  category           ItemCategory @relation(fields: [categoryId], references: [id])',
  '  ',
  '  sku                String   @unique',
  '  name               String',
  '  brand              String?',
  '  unitOfMeasure      String   // PCS, KG, LTR',
  '  barcode            String?  @unique',
  '  ',
  '  prItems            PurchaseRequisitionItem[]',
  '  poItems            PurchaseOrderItem[]',
  '  grnItems           GoodsReceiptNoteItem[]',
  '  inventoryLedgers   InventoryLedger[]',
  '  transactions       InventoryTransaction[]',
  '  ',
  '  @@map("item_masters")',
  '}',
  '',
  'model Warehouse {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  ',
  '  name               String',
  '  location           String',
  '  ',
  '  zones              WarehouseZone[]',
  '  grns               GoodsReceiptNote[]',
  '  ledgers            InventoryLedger[]',
  '  transactions       InventoryTransaction[]',
  '  ',
  '  @@map("warehouses")',
  '}',
  '',
  'model WarehouseZone {',
  '  id                 String   @id @default(uuid())',
  '  warehouseId        String',
  '  warehouse          Warehouse @relation(fields: [warehouseId], references: [id], onDelete: Cascade)',
  '  ',
  '  name               String',
  '  ',
  '  bins               WarehouseBin[]',
  '  ',
  '  @@map("warehouse_zones")',
  '}',
  '',
  'model WarehouseBin {',
  '  id                 String   @id @default(uuid())',
  '  zoneId             String',
  '  zone               WarehouseZone @relation(fields: [zoneId], references: [id], onDelete: Cascade)',
  '  ',
  '  name               String',
  '  barcode            String?  @unique',
  '  ',
  '  @@map("warehouse_bins")',
  '}',
  '',
  'model InventoryTransaction {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  warehouseId        String',
  '  warehouse          Warehouse @relation(fields: [warehouseId], references: [id])',
  '  itemMasterId       String',
  '  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])',
  '  ',
  '  type               String   // STOCK_IN, STOCK_OUT, TRANSFER, ADJUSTMENT',
  '  quantity           Int',
  '  transactionDate    DateTime @default(now())',
  '  reference          String?  // Could be GRN ID, Work Order ID, etc.',
  '  ',
  '  @@map("inventory_transactions")',
  '}',
  '',
  'model InventoryLedger {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  warehouseId        String',
  '  warehouse          Warehouse @relation(fields: [warehouseId], references: [id])',
  '  itemMasterId       String',
  '  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])',
  '  ',
  '  currentStock       Int      @default(0)',
  '  valuationMethod    String   @default("FIFO") // FIFO, LIFO, WEIGHTED_AVERAGE',
  '  unitValue          Decimal  @default(0)',
  '  ',
  '  @@unique([warehouseId, itemMasterId])',
  '  @@map("inventory_ledgers")',
  '}',
  '',
  'model Budget {',
  '  id                 String   @id @default(uuid())',
  '  tenantId           String',
  '  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)',
  '  ',
  '  name               String',
  '  fiscalYear         String',
  '  totalAmount        Decimal',
  '  ',
  '  allocations        BudgetAllocation[]',
  '  ',
  '  @@map("budgets")',
  '}',
  '',
  'model BudgetAllocation {',
  '  id                 String   @id @default(uuid())',
  '  budgetId           String',
  '  budget             Budget   @relation(fields: [budgetId], references: [id], onDelete: Cascade)',
  '  ',
  '  department         String',
  '  allocatedAmount    Decimal',
  '  spentAmount        Decimal  @default(0)',
  '  ',
  '  @@map("budget_allocations")',
  '}'
];

fs.writeFileSync(schemaPath, newLines.join('\\n') + '\\n' + newModels.join('\\n'));
console.log('Successfully rewrote schema.prisma with no duplicates.');
