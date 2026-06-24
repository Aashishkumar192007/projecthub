import { Controller, Get, Post, Body, Req, Param } from '@nestjs/common';
import { VotingService } from './voting.service';

@Controller('voting')
export class VotingController {
  constructor(private readonly votingService: VotingService) {}

  @Get(':societyId/polls')
  getPolls(@Req() req: any, @Param('societyId') societyId: string) {
    return this.votingService.getPolls(req['tenantId'], societyId);
  }

  @Post(':societyId/polls')
  createPoll(@Req() req: any, @Param('societyId') societyId: string, @Body() body: any) {
    return this.votingService.createPoll(req['tenantId'], societyId, body);
  }

  @Post('vote')
  castVote(@Body() body: { pollId: string; optionId: string; customerId: string }) {
    return this.votingService.castVote(body.pollId, body.optionId, body.customerId);
  }
}
