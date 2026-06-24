const fs = require('fs');
const lines = fs.readFileSync('prisma/schema.prisma', 'utf8').split('\\n');

function getModel(name) {
  let inside = false;
  let out = [];
  for (let line of lines) {
    if (line.startsWith('model ' + name + ' {')) inside = true;
    if (inside) {
      out.push(line);
      if (line.startsWith('}')) break;
    }
  }
  return out.join('\\n');
}

fs.writeFileSync('extracted.txt', getModel('Tenant') + '\\n\\n' + getModel('WorkOrder') + '\\n\\n' + getModel('FacilityAsset') + '\\n\\n' + getModel('PropertyProject'));
