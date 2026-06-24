const fs = require('fs');
const s = fs.readFileSync('prisma/schema.prisma', 'utf8');
const header = 'generator client {\\n  provider = "prisma-client-js"\\n}\\n\\ndatasource db {\\n  provider = "sqlite"\\n  url      = "file:./dev.db"\\n}\\n\\n';
fs.writeFileSync('prisma/schema.prisma', header + s);
