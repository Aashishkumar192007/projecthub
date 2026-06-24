const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
const lines = fs.readFileSync(schemaPath, 'utf8').split(/\\r?\\n/);

let out = [];
let models = new Map();
let currentModel = null;
let currentBlockType = null;
let currentBlockLines = [];

for (const line of lines) {
  const trimmed = line.trim();
  
  if (trimmed.startsWith('model ')) {
    currentBlockType = 'model';
    currentModel = trimmed.split(/\\s+/)[1];
    if (!models.has(currentModel)) {
      models.set(currentModel, { declarations: [], fields: new Map() });
    }
    continue;
  }
  
  if (trimmed.startsWith('enum ') || trimmed.startsWith('generator ') || trimmed.startsWith('datasource ')) {
    currentBlockType = 'other';
    currentBlockLines.push(line);
    continue;
  }
  
  if (currentBlockType && trimmed === '}') {
    if (currentBlockType === 'other') {
      currentBlockLines.push(line);
      out.push(currentBlockLines.join('\\n') + '\\n');
      currentBlockLines = [];
    }
    currentBlockType = null;
    currentModel = null;
    continue;
  }
  
  if (currentBlockType === 'model' && currentModel) {
    if (trimmed === '' || trimmed.startsWith('//')) {
      models.get(currentModel).declarations.push(line);
    } else if (trimmed.startsWith('@@')) {
      // @@map or @@unique
      const key = trimmed;
      if (!models.get(currentModel).fields.has(key)) {
         models.get(currentModel).fields.set(key, line);
      }
    } else {
      // It's a field
      const fieldName = trimmed.split(/\\s+/)[0];
      if (!models.get(currentModel).fields.has(fieldName)) {
        models.get(currentModel).fields.set(fieldName, line);
      }
    }
    continue;
  }
  
  if (!currentBlockType) {
    // Top-level comments or newlines
    if (trimmed !== '') {
      out.push(line);
    }
  }
}

// Reconstruct
let newSchema = out.join('\\n') + '\\n\\n';

for (const [modelName, modelData] of models.entries()) {
  newSchema += \`model \${modelName} {\\n\`;
  
  for (const dec of modelData.declarations) {
    if (dec.trim() !== '') {
      newSchema += dec + '\\n';
    }
  }
  
  for (const fieldLine of modelData.fields.values()) {
    newSchema += fieldLine + '\\n';
  }
  
  newSchema += \`}\\n\\n\`;
}

fs.writeFileSync(schemaPath, newSchema);
console.log('Ultimate fix completed.');
