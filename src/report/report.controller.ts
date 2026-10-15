import { Controller, Get, Query } from '@nestjs/common';
import { ReportService } from './report.service.js';
import { TasksByStatusQueryDto } from './dto/tasks-by-status-query.dto.js';

@Controller('reports')
export class ReportController {
  constructor(private readonly reports: ReportService) {}

  @Get('tasks-by-status')
  tasksByStatus(@Query() query: TasksByStatusQueryDto) {
    return this.reports.tasksByStatus(query.projectId);
  }

  @Get('latest-tasks')
  latestTasks() {
    return this.reports.latestTaskPerUser();
  }

  @Get('escalation-candidates')
  escalationCandidates() {
    return this.reports.escalationCandidates();
  }
}
