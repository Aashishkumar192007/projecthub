import { Controller, Get, Post, Body, Param, Req, Patch } from '@nestjs/common';
import { ListingService } from './listing.service';
import type { RequestWithTenant } from '../tenant/tenant.middleware';

@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  create(@Body() createListingDto: any, @Req() req: RequestWithTenant) {
    return this.listingService.create(createListingDto, req.tenantId || req.user?.tenantId);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.listingService.findAll(req.tenantId || req.user?.tenantId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Req() req: RequestWithTenant) {
    return this.listingService.updateStatus(id, status, req.tenantId || req.user?.tenantId);
  }
}
