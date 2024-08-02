import { IUserRepository } from '../Infrastructure/Repositories/IUserRespository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetOneUserService {
  constructor(private readonly repository: IUserRepository) {}
  async execute(id: string) {
    return this.repository.findOneById(id);
  }
}
