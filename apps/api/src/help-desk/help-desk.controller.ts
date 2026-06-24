import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { HelpDeskService } from './help-desk.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/v1/complaints')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HelpDeskController {
  constructor(private readonly helpDeskService: HelpDeskService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager', 'FacilityManager')
  create(@Body(ValidationPipe) createComplaintDto: CreateComplaintDto, @CurrentUser() user: any) {
    return this.helpDeskService.create(createComplaintDto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.helpDeskService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.helpDeskService.findOne(id, user.tenantId);
  }
}
