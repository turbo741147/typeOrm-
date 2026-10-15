import { Module } from '@nestjs/common';
import { ProjectModule } from '../project/project.module.js';
import { TaskModule } from '../task/task.module.js';
import { UserModule } from '../user/user.module.js';
import { ReportController } from './report.controller.js';
import { ReportService } from './report.service.js';

@Module({
  imports: [TaskModule, ProjectModule, UserModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
