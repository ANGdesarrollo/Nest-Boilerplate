import { Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { IRoleRepository } from '../../Infrastructure/Repositories/IRoleRepository';
import { Role, RolesEnum } from '../../Domain/Entities/Role';

@Command({ name: 'syncRoles', description: 'SyncRoles' })
export class SyncRolesCommand extends CommandRunner {
  constructor(private readonly role_repository: IRoleRepository) {
    super();
  }

  async run() {
    const roles = Object.values(RolesEnum);
    const dbRoles = await this.role_repository.list();

    for (const role of roles) {
      const roleExists = dbRoles.find((dbRole) => dbRole.slug === role);

      if (!roleExists) {
        await this.role_repository.create(new Role(role));
      }
    }
  }
}
