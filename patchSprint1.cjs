const fs = require('fs');
const path = require('path');

const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
let schemaContent = fs.readFileSync(schemaPath, 'utf8');

// 1. Add archivedAt to PropertyProject
schemaContent = schemaContent.replace(
  /(model PropertyProject \{[\s\S]*?)(^\}$)/m,
  (match, p1, p2) => {
    if (!p1.includes('archivedAt')) {
      return p1 + `  archivedAt DateTime?\n  portfolioId String?\n  portfolio Portfolio? @relation(fields: [portfolioId], references: [id])\n  blocks Block[]\n` + p2;
    }
    return match;
  }
);

// 2. Add archivedAt to Tower
schemaContent = schemaContent.replace(
  /(model Tower \{[\s\S]*?)(^\}$)/m,
  (match, p1, p2) => {
    if (!p1.includes('archivedAt')) {
      return p1 + `  archivedAt DateTime?\n  blockId String?\n  block Block? @relation(fields: [blockId], references: [id])\n` + p2;
    }
    return match;
  }
);

// 3. Add archivedAt to Floor
schemaContent = schemaContent.replace(
  /(model Floor \{[\s\S]*?)(^\}$)/m,
  (match, p1, p2) => {
    if (!p1.includes('archivedAt')) {
      return p1 + `  archivedAt DateTime?\n` + p2;
    }
    return match;
  }
);

// 4. Add archivedAt to Unit
schemaContent = schemaContent.replace(
  /(model Unit \{[\s\S]*?)(^\}$)/m,
  (match, p1, p2) => {
    if (!p1.includes('archivedAt')) {
      return p1 + `  archivedAt DateTime?\n` + p2;
    }
    return match;
  }
);

// 5. Append Portfolio and Block models if they don't exist
if (!schemaContent.includes('model Portfolio')) {
  schemaContent += `

model Portfolio {
  id          String   @id @default(cuid())
  tenantId    String
  name        String
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  archivedAt  DateTime?

  properties  PropertyProject[]
  tenant      Tenant   @relation(fields: [tenantId], references: [id], onDelete: Restrict)

  @@index([tenantId])
}

model Block {
  id                String   @id @default(cuid())
  propertyProjectId String
  name              String
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  archivedAt        DateTime?

  propertyProject   PropertyProject @relation(fields: [propertyProjectId], references: [id], onDelete: Restrict)
  towers            Tower[]

  @@index([propertyProjectId])
}
`;
}

fs.writeFileSync(schemaPath, schemaContent, 'utf8');
console.log('Schema successfully patched with Sprint 1 features.');
