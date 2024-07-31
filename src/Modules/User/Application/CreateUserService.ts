import { CreateUserDto } from '../Presentation/dto/CreateUserDto';
import { IUserRepository } from '../Infrastructure/Repositories/IUserRespository';
import { User } from '../Domain/entities/User';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../Infrastructure/Repositories/UserRepository';

export class CreateUserService {

  constructor(@Inject(IUserRepository) private readonly repository: UserRepository) {
  }
  async execute(
    payload: CreateUserDto,
  ) {

    const user = new User(payload);
    return this.repository.create(user);
  }
}
