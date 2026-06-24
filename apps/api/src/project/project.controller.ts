import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { ProjectService } from './project.service';
import type { RequestWithTenant } from '../tenant/tenant.middleware';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: any, @Req() req: RequestWithTenant) {
    return this.projectService.create(createProjectDto, req.tenantId || req.user?.tenantId);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.projectService.findAll(req.tenantId || req.user?.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithTenant) {
    return this.projectService.findOne(id, req.tenantId || req.user?.tenantId);
  }
}
