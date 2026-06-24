const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Wipe the marker and below
const marker = '// 38. PROCUREMENT & INVENTORY CLOUD';
const markerIndex = schema.indexOf(marker);
if (markerIndex !== -1) {
  schema = schema.substring(0, markerIndex);
}

// Remove all known Phase 9 fields from the entire file by regex matching them
const badFieldsRegex = /\\s+(vendorKycs|vendorPerformances|purchaseRequisitions|purchaseOrders|goodsReceiptNotes|itemCategories|itemMasters|warehouses|inventoryTransactions|inventoryLedgers|budgets|kyc|performance|purchaseOrderId|purchaseOrder|goodsReceiptNoteId|goodsReceiptNote|isThreeWayMatched)\\s+.*?\\n/g;

schema = schema.replace(badFieldsRegex, '\\n');

fs.writeFileSync(schemaPath, schema);
console.log("Direct fix done");
