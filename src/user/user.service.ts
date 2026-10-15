import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository.js';
import { LatestTaskRow } from './types/latest-task-row.js';

@Injectable()
export class UserService {
  constructor(private readonly users: UserRepository) {}

  async requireById(id: string): Promise<void> {
    const user = await this.users.findById(id);
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
  }

  findLatestTaskPerUser(): Promise<LatestTaskRow[]> {
    return this.users.findLatestTaskPerUser();
  }
}
