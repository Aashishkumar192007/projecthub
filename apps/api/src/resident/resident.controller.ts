import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { ResidentService } from './resident.service';

@Controller('v1/residents')
export class ResidentController {
  constructor(private readonly residentService: ResidentService) {}

  @Get()
  getResidents(@Req() req: any) {
    return this.residentService.getResidents(req['tenantId'] || 'acme-corp');
  }

  @Get(':id')
  getResidentDetails(@Req() req: any, @Param('id') id: string) {
    return this.residentService.getResidentDetails(req['tenantId'] || 'acme-corp', id);
  }

  @Post('assign-unit')
  assignUnit(@Req() req: any, @Body() data: any) {
    console.log('[DEBUG assignUnit] Incoming payload:', data);
    return this.residentService.assignUnit(req['tenantId'] || 'acme-corp', data);
  }
}
