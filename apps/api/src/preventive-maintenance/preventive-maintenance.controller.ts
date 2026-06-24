import { Controller, Get, Req } from '@nestjs/common';
import { PreventiveMaintenanceService } from './preventive-maintenance.service';

@Controller('preventive-maintenance')
export class PreventiveMaintenanceController {
  constructor(private readonly pmService: PreventiveMaintenanceService) {}

  @Get('checklists')
  getChecklists(@Req() req: any) {
    return this.pmService.getChecklists(req['tenantId']);
  }
}
