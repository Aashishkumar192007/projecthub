const fs = require('fs');
fs.appendFileSync('prisma/schema.prisma', fs.readFileSync('phase9.prisma', 'utf8'));
console.log('Appended safely.');
