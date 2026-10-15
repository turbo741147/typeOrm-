import { Injectable } from '@nestjs/common';
import { ProjectService } from '../project/project.service.js';
import { TaskService } from '../task/task.service.js';
import { UserService } from '../user/user.service.js';
import { EscalationCandidateDto } from './dto/escalation-candidate.dto.js';
import { LatestTaskDto } from './dto/latest-task.dto.js';
import { TasksByStatusDto } from './dto/tasks-by-status.dto.js';

@Injectable()
export class ReportService {
  constructor(
    private readonly tasks: TaskService,
    private readonly projects: ProjectService,
    private readonly users: UserService,
  ) {}

  async tasksByStatus(projectId?: string): Promise<TasksByStatusDto[]> {
    if (projectId) {
      await this.projects.requireById(projectId);
    }

    const rows = await this.tasks.countByStatus(projectId);
    return rows.map((row) => ({
      projectId: row.projectId,
      status: row.status,
      tasksCount: Number(row.tasksCount),
    }));
  }

  async latestTaskPerUser(): Promise<LatestTaskDto[]> {
    const rows = await this.users.findLatestTaskPerUser();
    return rows.map((row) => ({
      userId: row.userId,
      userName: row.userName,
      taskId: row.taskId,
      title: row.title,
      status: row.status,
      createdAt: row.createdAt,
    }));
  }

  async escalationCandidates(): Promise<EscalationCandidateDto[]> {
    const rows = await this.tasks.findEscalationCandidates();
    return rows.map((row) => ({
      projectId: row.projectId,
      taskId: row.taskId,
      title: row.title,
      ageDays: Number(row.ageDays),
      priorityRank: Number(row.priorityRank),
    }));
  }
}
