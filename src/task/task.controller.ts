import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { TaskListQueryDto } from './dto/task-list-query.dto.js';
import { TaskService } from './task.service.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Controller()
export class TaskController {
  constructor(private readonly tasks: TaskService) {}

  @Post('projects/:projectId/tasks')
  create(@Param('projectId') projectId: string, @Body() dto: CreateTaskDto) {
    return this.tasks.create(projectId, dto);
  }

  @Get('projects/:projectId/tasks')
  findByProject(
    @Param('projectId') projectId: string,
    @Query() query: TaskListQueryDto,
  ) {
    return this.tasks.findByProject(projectId, query);
  }

  @Get('tasks/:taskId')
  findOne(@Param('taskId') taskId: string) {
    return this.tasks.findOne(taskId);
  }

  @Patch('tasks/:taskId')
  update(@Param('taskId') taskId: string, @Body() dto: UpdateTaskDto) {
    return this.tasks.update(taskId, dto);
  }

  @Delete('tasks/:taskId')
  remove(@Param('taskId') taskId: string) {
    return this.tasks.remove(taskId);
  }
}
