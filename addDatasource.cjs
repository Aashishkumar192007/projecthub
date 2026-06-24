const fs = require('fs');
const s = fs.readFileSync('prisma/schema.prisma', 'utf8');
const header = \`generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

\`;
fs.writeFileSync('prisma/schema.prisma', header + s);
