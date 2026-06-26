import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { CommunityCommService } from './community-comm.service';

@Controller('v1/community')
export class CommunityCommController {
  constructor(private readonly communityService: CommunityCommService) {}

  @Get('posts')
  getPosts(@Req() req: any) {
    return this.communityService.getPosts(req['tenantId'] || 'acme-corp');
  }

  @Post('posts')
  createPost(@Req() req: any, @Body() body: any) {
    return this.communityService.createPost(req['tenantId'] || 'acme-corp', body);
  }
}
