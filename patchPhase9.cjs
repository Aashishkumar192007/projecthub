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

// 4. PurchaseOrder
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

// 5. Warehouse
schema = schema.replace(/model Warehouse \\{[\\s\\S]*?\\n\\}/, match => {
  return match.replace(/\\n\\}$/, [
    '  zones              WarehouseZone[]',
    '  grns               GoodsReceiptNote[]',
    '  ledgers            InventoryLedger[]',
    '  transactions       InventoryTransaction[]',
    '}'
  ].map(s => '\\n' + s).join(''));
});

const newModels = \`
// ------------------------------------------------------
// 38. PROCUREMENT & INVENTORY CLOUD (Phase 9)
// ------------------------------------------------------

model VendorKyc {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  vendorId           String   @unique
  vendor             Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  gstNumber          String?
  panNumber          String?
  bankName           String?
  accountNumber      String?
  ifscCode           String?
  insuranceDocUrl    String?
  kycStatus          String   @default("PENDING") // PENDING, APPROVED, REJECTED
  
  @@map("vendor_kycs")
}

model VendorPerformance {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  vendorId           String   @unique
  vendor             Vendor   @relation(fields: [vendorId], references: [id], onDelete: Cascade)
  
  slaComplianceScore Float    @default(0)
  avgResponseTime    Float    @default(0) // in hours
  qualityRating      Float    @default(0) // 1-5 scale
  residentFeedback   Float    @default(0) // 1-5 scale
  
  @@map("vendor_performances")
}

model PurchaseRequisition {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  requesterId        String
  requester          Employee @relation(fields: [requesterId], references: [id])
  department         String
  status             String   @default("DRAFT") // DRAFT, PENDING_APPROVAL, APPROVED, REJECTED
  createdAt          DateTime @default(now())
  
  items              PurchaseRequisitionItem[]
  purchaseOrders     PurchaseOrder[]
  
  @@map("purchase_requisitions")
}

model PurchaseRequisitionItem {
  id                 String   @id @default(uuid())
  prId               String
  purchaseRequisition PurchaseRequisition @relation(fields: [prId], references: [id], onDelete: Cascade)
  
  itemMasterId       String
  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])
  quantity           Int
  estimatedPrice     Decimal
  
  @@map("purchase_requisition_items")
}

model PurchaseOrderItem {
  id                 String   @id @default(uuid())
  poId               String
  purchaseOrder      PurchaseOrder @relation(fields: [poId], references: [id], onDelete: Cascade)
  
  itemMasterId       String
  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])
  quantity           Int
  unitPrice          Decimal
  
  @@map("purchase_order_items")
}

model GoodsReceiptNote {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  poId               String
  purchaseOrder      PurchaseOrder @relation(fields: [poId], references: [id])
  warehouseId        String
  warehouse          Warehouse @relation(fields: [warehouseId], references: [id])
  
  status             String   @default("RECEIVED") // RECEIVED, PARTIAL, QUALITY_CHECK_FAILED
  receiptDate        DateTime @default(now())
  
  items              GoodsReceiptNoteItem[]
  invoices           Invoice[]
  
  @@map("goods_receipt_notes")
}

model GoodsReceiptNoteItem {
  id                 String   @id @default(uuid())
  grnId              String
  goodsReceiptNote   GoodsReceiptNote @relation(fields: [grnId], references: [id], onDelete: Cascade)
  
  itemMasterId       String
  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])
  receivedQuantity   Int
  acceptedQuantity   Int
  rejectedQuantity   Int      @default(0)
  
  @@map("goods_receipt_note_items")
}

model ItemCategory {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  name               String
  description        String?
  
  items              ItemMaster[]
  
  @@map("item_categories")
}

model ItemMaster {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  categoryId         String
  category           ItemCategory @relation(fields: [categoryId], references: [id])
  
  sku                String   @unique
  name               String
  brand              String?
  unitOfMeasure      String   // PCS, KG, LTR
  barcode            String?  @unique
  
  prItems            PurchaseRequisitionItem[]
  poItems            PurchaseOrderItem[]
  grnItems           GoodsReceiptNoteItem[]
  inventoryLedgers   InventoryLedger[]
  transactions       InventoryTransaction[]
  
  @@map("item_masters")
}

model WarehouseZone {
  id                 String   @id @default(uuid())
  warehouseId        String
  warehouse          Warehouse @relation(fields: [warehouseId], references: [id], onDelete: Cascade)
  
  name               String
  
  bins               WarehouseBin[]
  
  @@map("warehouse_zones")
}

model WarehouseBin {
  id                 String   @id @default(uuid())
  zoneId             String
  zone               WarehouseZone @relation(fields: [zoneId], references: [id], onDelete: Cascade)
  
  name               String
  barcode            String?  @unique
  
  @@map("warehouse_bins")
}

model InventoryTransaction {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  warehouseId        String
  warehouse          Warehouse @relation(fields: [warehouseId], references: [id])
  itemMasterId       String
  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])
  
  type               String   // STOCK_IN, STOCK_OUT, TRANSFER, ADJUSTMENT
  quantity           Int
  transactionDate    DateTime @default(now())
  reference          String?  // Could be GRN ID, Work Order ID, etc.
  
  @@map("inventory_transactions")
}

model InventoryLedger {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  warehouseId        String
  warehouse          Warehouse @relation(fields: [warehouseId], references: [id])
  itemMasterId       String
  itemMaster         ItemMaster @relation(fields: [itemMasterId], references: [id])
  
  currentStock       Int      @default(0)
  valuationMethod    String   @default("FIFO") // FIFO, LIFO, WEIGHTED_AVERAGE
  unitValue          Decimal  @default(0)
  
  @@unique([warehouseId, itemMasterId])
  @@map("inventory_ledgers")
}

model Budget {
  id                 String   @id @default(uuid())
  tenantId           String
  tenant             Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  
  name               String
  fiscalYear         String
  totalAmount        Decimal
  
  allocations        BudgetAllocation[]
  
  @@map("budgets")
}

model BudgetAllocation {
  id                 String   @id @default(uuid())
  budgetId           String
  budget             Budget   @relation(fields: [budgetId], references: [id], onDelete: Cascade)
  
  department         String
  allocatedAmount    Decimal
  spentAmount        Decimal  @default(0)
  
  @@map("budget_allocations")
}
\`;

fs.writeFileSync(schemaPath, schema + '\\n' + newModels + '\\n');
console.log('Patch complete.');
