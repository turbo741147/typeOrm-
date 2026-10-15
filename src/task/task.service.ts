import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { ProjectService } from '../project/project.service.js';
import { UserService } from '../user/user.service.js';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from './task.constants.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { TaskListQueryDto } from './dto/task-list-query.dto.js';
import { TaskListResponseDto } from './dto/task-list-response.dto.js';
import { TaskResponseDto } from './dto/task-response.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { Task } from './task.entity.js';
import { TaskRepository } from './task.repository.js';

@Injectable()
export class TaskService {
  constructor(
    private readonly tasks: TaskRepository,
    private readonly projects: ProjectService,
    private readonly users: UserService,
  ) {}

  async create(projectId: string, dto: CreateTaskDto): Promise<TaskResponseDto> {
    await this.projects.requireById(projectId);
    if (dto.assigneeId) {
      await this.users.requireById(dto.assigneeId);
    }

    const now = new Date();
    const task = this.tasks.create({
      id: randomUUID(),
      title: dto.title,
      description: dto.description ?? null,
      status: dto.status ?? 'todo',
      projectId,
      assigneeId: dto.assigneeId ?? null,
      createdById: null,
      createdAt: now,
      updatedAt: now,
      completedAt: dto.status === 'done' ? now : null,
      deletedAt: null,
    });
    const saved = await this.tasks.save(task);
    return this.toTaskResponse(saved);
  }

  async findByProject(
    projectId: string,
    query: TaskListQueryDto,
  ): Promise<TaskListResponseDto> {
    await this.projects.requireById(projectId);
    const limit = query.limit ?? DEFAULT_LIMIT;
    const offset = query.offset ?? DEFAULT_OFFSET;
    const tasks = await this.tasks.findActiveByProject(projectId, limit, offset);
    return {
      items: tasks.map((task) => this.toTaskResponse(task)),
      limit,
      offset,
    };
  }

  async findOne(taskId: string): Promise<TaskResponseDto> {
    const task = await this.requireTask(taskId);
    return this.toTaskResponse(task);
  }

  async update(taskId: string, dto: UpdateTaskDto): Promise<TaskResponseDto> {
    const task = await this.requireTask(taskId);
    if (dto.assigneeId) {
      await this.users.requireById(dto.assigneeId);
    }

    if (dto.title !== undefined) {
      task.title = dto.title;
    }
    if (dto.description !== undefined) {
      task.description = dto.description;
    }
    if (dto.status !== undefined) {
      task.status = dto.status;
      if (dto.status === 'done' && task.completedAt == null) {
        task.completedAt = new Date();
      }
    }
    if (dto.assigneeId !== undefined) {
      task.assigneeId = dto.assigneeId;
    }
    task.updatedAt = new Date();

    const saved = await this.tasks.save(task);
    return this.toTaskResponse(saved);
  }

  countByStatus(projectId?: string) {
    return this.tasks.countByStatus(projectId);
  }

  findEscalationCandidates() {
    return this.tasks.findEscalationCandidates();
  }

  async remove(taskId: string): Promise<TaskResponseDto> {
    const task = await this.requireTask(taskId);
    await this.tasks.deleteById(taskId);
    return this.toTaskResponse(task);
  }

  private async requireTask(taskId: string): Promise<Task> {
    const task = await this.tasks.findActiveById(taskId);
    if (!task) {
      throw new NotFoundException(`Task ${taskId} not found`);
    }
    return task;
  }

  private toTaskResponse(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      projectId: task.projectId,
      assigneeId: task.assigneeId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      completedAt: task.completedAt,
    };
  }
}
