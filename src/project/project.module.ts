import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity.js';
import { ProjectRepository } from './project.repository.js';
import { ProjectService } from './project.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectRepository, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
