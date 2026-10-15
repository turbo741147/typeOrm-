import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '../project/project.module.js';
import { UserModule } from '../user/user.module.js';
import { TaskController } from './task.controller.js';
import { Task } from './task.entity.js';
import { TaskRepository } from './task.repository.js';
import { TaskService } from './task.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ProjectModule, UserModule],
  controllers: [TaskController],
  providers: [TaskRepository, TaskService],
  exports: [TaskService],
})
export class TaskModule {}
