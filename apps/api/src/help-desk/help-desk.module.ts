import { Module } from '@nestjs/common';
import { HelpDeskController } from './help-desk.controller';
import { HelpDeskService } from './help-desk.service';

@Module({
  controllers: [HelpDeskController],
  providers: [HelpDeskService]
})
export class HelpDeskModule {}
