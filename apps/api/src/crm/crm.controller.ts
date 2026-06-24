import { Controller, Get, Post, Body, Param, Patch, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { CrmService } from './crm.service';

@Controller('v1/crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Get('leads')
  async getLeads(@Req() req: any, @Query('folder') folder?: string) {
    const tenantId = req.tenantId || 'system-tenant-123';
    return this.crmService.getLeads(tenantId, folder);
  }

  @Post('leads')
  async createLead(@Req() req: any, @Body() body: any) {
    const tenantId = req.tenantId || 'system-tenant-123';
    return this.crmService.createLead(tenantId, body);
  }

  @Get('leads/:id')
  async getLead(@Req() req: any, @Param('id') id: string) {
    const tenantId = req.tenantId || 'system-tenant-123';
    return this.crmService.getLead(tenantId, id);
  }

  @Patch('leads/:id/status')
  async updateLeadStatus(@Req() req: any, @Param('id') id: string, @Body('status') status: string) {
    const tenantId = req.tenantId || 'system-tenant-123';
    return this.crmService.updateLeadStatus(tenantId, id, status);
  }
  
  @Post('leads/:id/activities')
  async addActivity(@Req() req: any, @Param('id') id: string, @Body() body: any) {
    const tenantId = req.tenantId || 'system-tenant-123';
    return this.crmService.addActivity(tenantId, id, body);
  }

  @Post('leads/:id/reserve-unit')
  async reserveUnit(@Req() req: any, @Param('id') id: string, @Body('unitId') unitId: string) {
    const tenantId = req.tenantId || 'system-tenant-123';
    return this.crmService.reserveUnit(tenantId, id, unitId);
  }

  @Get('inventory')
  async getInventory(@Req() req: any, @Query() query: any) {
    const tenantId = req.tenantId || 'system-tenant-123';
    return this.crmService.getInventory(tenantId, query);
  }

  @Post('inventory/compare')
  async compareUnits(@Req() req: any, @Body('unitIds') unitIds: string[]) {
    const tenantId = req.tenantId || 'system-tenant-123';
    return this.crmService.compareUnits(tenantId, unitIds);
  }
}
