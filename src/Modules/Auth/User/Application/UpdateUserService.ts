import { UpdateUserDto } from '../Presentation/Dto/UpdateUserDto';
import { IUserRepository } from '../Infrastructure/Repositories/IUserRespository';
import { Injectable } from '@nestjs/common';
import { User } from '../Domain/Entities/User';

@Injectable()
export class UpdateUserService {
  constructor(private readonly repository: IUserRepository) {}
  async execute(payload: { id: string; updateUserDto: UpdateUserDto }) {
    const { id, updateUserDto } = payload;

    const user = User.updateUser(updateUserDto);
    return this.repository.findOneByIdAndUpdate({
      id,
      entity: user,
    });
  }
}
