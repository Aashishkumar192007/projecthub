const fs = require('fs');
const lines = fs.readFileSync('node_modules/.prisma/client/schema.prisma', 'utf8').split('\\n');
console.log('PO:', lines.findIndex(l => l.includes('model PurchaseOrder')));
console.log('WH:', lines.findIndex(l => l.includes('model Warehouse')));
