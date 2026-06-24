const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.unit.findMany({ select: { id: true, unitNumber: true } }).then(console.log).finally(() = 
