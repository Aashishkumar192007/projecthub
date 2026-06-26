import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { VisitorOpsService } from './visitor-ops.service';

@Controller('v1/visitor-ops')
export class VisitorOpsController {
  constructor(private readonly visitorOpsService: VisitorOpsService) {}

  @Get('visitors')
  getVisitorLogs(@Req() req: any) {
    return this.visitorOpsService.getVisitorLogs(req['tenantId'] || 'acme-corp');
  }

  @Post('visitors')
  createVisitor(@Req() req: any, @Body() body: any) {
    return this.visitorOpsService.createVisitor(req['tenantId'] || 'acme-corp', body);
  }
}
