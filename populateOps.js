const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'apps', 'api', 'src');

const modules = [
  {
    name: 'tenant-ops',
    service: `import { Injectable, Req, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class TenantOpsService {
  async getTenants(tenantId: string) {
    return prisma.customer.findMany({ where: { tenantId } });
  }

  async getFamilyMembers(tenantId: string, customerId: string) {
    return prisma.familyMember.findMany({ where: { tenantId, customerId } });
  }

  async addFamilyMember(tenantId: string, customerId: string, data: any) {
    return prisma.familyMember.create({ data: { ...data, tenantId, customerId } });
  }
}
`,
    controller: `import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { TenantOpsService } from './tenant-ops.service';

@Controller('tenant-ops')
export class TenantOpsController {
  constructor(private readonly tenantOpsService: TenantOpsService) {}

  @Get()
  getTenants(@Req() req) {
    return this.tenantOpsService.getTenants(req['tenantId']);
  }

  @Get(':customerId/family')
  getFamily(@Req() req, @Param('customerId') customerId: string) {
    return this.tenantOpsService.getFamilyMembers(req['tenantId'], customerId);
  }

  @Post(':customerId/family')
  addFamily(@Req() req, @Param('customerId') customerId: string, @Body() body: any) {
    return this.tenantOpsService.addFamilyMember(req['tenantId'], customerId, body);
  }
}
`
  },
  {
    name: 'document',
    service: `import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class DocumentService {
  async getDocuments(tenantId: string) {
    return prisma.document.findMany({ where: { tenantId } });
  }

  async uploadDocument(tenantId: string, data: any) {
    return prisma.document.create({ data: { ...data, tenantId } });
  }
}
`,
    controller: `import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  getDocuments(@Req() req) {
    return this.documentService.getDocuments(req['tenantId']);
  }

  @Post()
  uploadDocument(@Req() req, @Body() body: any) {
    return this.documentService.uploadDocument(req['tenantId'], body);
  }
}
`
  },
  {
    name: 'work-order',
    service: `import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class WorkOrderService {
  async getWorkOrders(tenantId: string) {
    return prisma.workOrder.findMany({ where: { tenantId }, include: { vendor: true, complaint: true } });
  }

  async createWorkOrder(tenantId: string, data: any) {
    return prisma.workOrder.create({ data: { ...data, tenantId } });
  }

  async updateWorkOrder(tenantId: string, id: string, data: any) {
    return prisma.workOrder.update({ where: { id }, data });
  }
}
`,
    controller: `import { Controller, Get, Post, Put, Body, Req, Param } from '@nestjs/common';
import { WorkOrderService } from './work-order.service';

@Controller('work-orders')
export class WorkOrderController {
  constructor(private readonly workOrderService: WorkOrderService) {}

  @Get()
  getWorkOrders(@Req() req) {
    return this.workOrderService.getWorkOrders(req['tenantId']);
  }

  @Post()
  createWorkOrder(@Req() req, @Body() body: any) {
    return this.workOrderService.createWorkOrder(req['tenantId'], body);
  }

  @Put(':id')
  updateWorkOrder(@Req() req, @Param('id') id: string, @Body() body: any) {
    return this.workOrderService.updateWorkOrder(req['tenantId'], id, body);
  }
}
`
  },
  {
    name: 'preventive-maintenance',
    service: `import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PreventiveMaintenanceService {
  async getChecklists(tenantId: string) {
    return prisma.maintenanceChecklist.findMany({ where: { tenantId }, include: { tasks: true } });
  }
}
`,
    controller: `import { Controller, Get, Req } from '@nestjs/common';
import { PreventiveMaintenanceService } from './preventive-maintenance.service';

@Controller('preventive-maintenance')
export class PreventiveMaintenanceController {
  constructor(private readonly pmService: PreventiveMaintenanceService) {}

  @Get('checklists')
  getChecklists(@Req() req) {
    return this.pmService.getChecklists(req['tenantId']);
  }
}
`
  }
];

function run() {
  for (const mod of modules) {
    const modDir = path.join(srcDir, mod.name);
    
    // Ensure dir exists
    if (!fs.existsSync(modDir)) {
      console.log(\`Waiting for dir \${modDir} to be created by nest cli...\`);
      continue;
    }

    const servicePath = path.join(modDir, \`\${mod.name}.service.ts\`);
    const controllerPath = path.join(modDir, \`\${mod.name}.controller.ts\`);

    fs.writeFileSync(servicePath, mod.service);
    fs.writeFileSync(controllerPath, mod.controller);
    console.log(\`Overwritten \${mod.name} files.\`);
  }
}

// We wrap it in a setTimeout in case the nest cli commands are still running and taking longer than expected.
setTimeout(run, 5000);
