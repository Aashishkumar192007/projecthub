const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  const ext = path.extname(filePath);
  if (['.ts', '.tsx'].includes(ext)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;
    // Replace \` with `
    content = content.replace(/\\`/g, '`');
    // Replace \${ with ${
    content = content.replace(/\\\$\{/g, '${');
    
    if (content !== original) {
      console.log(`Fixed: ${filePath}`);
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      walk(file);
    } else {
      fixFile(file);
    }
  });
}

walk(path.resolve(__dirname, 'apps/web/src'));
console.log('Done cleaning escape sequences.');
