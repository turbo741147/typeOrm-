import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './project.repository.js';

@Injectable()
export class ProjectService {
  constructor(private readonly projects: ProjectRepository) {}

  async requireById(id: string): Promise<void> {
    const project = await this.projects.findById(id);
    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }
  }
}
