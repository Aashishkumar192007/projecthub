import { Module } from '@nestjs/common';
import { TowerService } from './tower.service';
import { TowerController } from './tower.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TowerController],
  providers: [TowerService],
})
export class TowerModule {}
