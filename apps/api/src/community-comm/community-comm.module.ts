import { Module } from '@nestjs/common';
import { CommunityCommController } from './community-comm.controller';
import { CommunityCommService } from './community-comm.service';

@Module({
  controllers: [CommunityCommController],
  providers: [CommunityCommService]
})
export class CommunityCommModule {}
