const fs = require('fs');
const schema = fs.readFileSync('prisma/schema.prisma', 'utf8');

function extractModel(name) {
  const match = schema.match(new RegExp("model " + name + " \\\\{[\\\\s\\\\S]*?\\\\}"));
  if (match) console.log(match[0]);
  else console.log("Model " + name + " not found");
}

extractModel('PropertyProject');
extractModel('VendorPerformance');
extractModel('PurchaseRequisitionItem');
extractModel('Budget');
