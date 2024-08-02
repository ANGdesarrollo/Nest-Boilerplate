import { CreateUserDto } from '../Presentation/Dto/CreateUserDto';
import { IUserRepository } from '../Infrastructure/Repositories/IUserRespository';
import { User } from '../Domain/Entities/User';
import { Injectable } from '@nestjs/common';
import { PasswordService } from '../../../Shared/Application/PasswordService';
import { IRoleRepository } from '../../Roles/Infrastructure/Repositories/IRoleRepository';
import { RolesEnum } from '../../Roles/Domain/Entities/Role';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly user_repository: IUserRepository,
    private readonly role_repository: IRoleRepository,
  ) {}

  async execute(payload: CreateUserDto) {
    const user = new User(payload);
    const baseRole = await this.getBaseRole();
    user.role = baseRole._id;
    user.password = await this.passwordService.hashPassword(payload.password);

    return this.user_repository.create(user);
  }

  private async getBaseRole() {
    return this.role_repository.findOne({
      filter: {
        slug: RolesEnum.BASIC,
      },
      projection: '_id',
    });
  }
}
