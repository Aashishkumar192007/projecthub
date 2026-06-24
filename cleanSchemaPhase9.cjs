const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schema = fs.readFileSync(schemaPath, 'utf8');

// Strip off the Phase 9 models
const markerIndex = schema.indexOf('// 38. PROCUREMENT & INVENTORY CLOUD (Phase 9)');
if (markerIndex !== -1) {
  schema = schema.substring(0, markerIndex);
}

// Clean up duplicate fields in Tenant, Vendor, Invoice by only keeping unique lines
function removeDuplicateLines(modelString) {
  const lines = modelString.split('\n');
  const seen = new Set();
  return lines.filter(line => {
    const trimmed = line.trim();
    if (trimmed === '' || trimmed === '}') return true; // Keep empty lines and closing brace
    
    // For relations, we can just check if the property name is already seen
    const propertyMatch = trimmed.match(/^([a-zA-Z0-9_]+)/);
    if (propertyMatch) {
      const propName = propertyMatch[1];
      if (seen.has(propName)) {
        return false;
      }
      seen.add(propName);
    }
    return true;
  }).join('\n');
}

schema = schema.replace(/model Tenant \{[\s\S]*?\n\}/g, match => removeDuplicateLines(match));
schema = schema.replace(/model Vendor \{[\s\S]*?\n\}/g, match => removeDuplicateLines(match));
schema = schema.replace(/model Invoice \{[\s\S]*?\n\}/g, match => removeDuplicateLines(match));

fs.writeFileSync(schemaPath, schema);
console.log('Schema cleaned up.');
