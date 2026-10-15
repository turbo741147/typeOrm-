import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project/project.entity.js';
import { ProjectRepository } from './project/project.repository.js';
import { ReportController } from './report/report.controller.js';
import { ReportService } from './report/report.service.js';
import { Task } from './task/task.entity.js';
import { TaskController } from './task/task.controller.js';
import { TaskRepository } from './task/task.repository.js';
import { TaskService } from './task/task.service.js';
import { User } from './user/user.entity.js';
import { UserRepository } from './user/user.repository.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE as 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Project, Task]),
  ],
  controllers: [TaskController, ReportController],
  providers: [
    ProjectRepository,
    TaskRepository,
    UserRepository,
    TaskService,
    ReportService,
  ],
})
export class AppModule {}
