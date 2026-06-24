import { Module } from '@nestjs/common';
import { SocietyMasterController } from './society-master.controller';
import { SocietyMasterService } from './society-master.service';

@Module({
  controllers: [SocietyMasterController],
  providers: [SocietyMasterService]
})
export class SocietyMasterModule {}
