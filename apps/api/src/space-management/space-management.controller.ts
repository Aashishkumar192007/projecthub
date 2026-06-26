import { Controller, Get, Req } from '@nestjs/common';
import { SpaceManagementService } from './space-management.service';

@Controller('v1/parking')
export class SpaceManagementController {
  constructor(private readonly spaceManagementService: SpaceManagementService) {}

  @Get('inventory')
  getParkingInventory(@Req() req: any) {
    return this.spaceManagementService.getParkingInventory(req['tenantId'] || 'acme-corp');
  }
}
