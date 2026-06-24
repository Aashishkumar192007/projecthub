import { Module } from '@nestjs/common';
import { ProjectExecutionService } from './project-execution.service';
import { ProjectExecutionController } from './project-execution.controller';

@Module({
  providers: [ProjectExecutionService],
  controllers: [ProjectExecutionController]
})
export class ProjectExecutionModule {}
