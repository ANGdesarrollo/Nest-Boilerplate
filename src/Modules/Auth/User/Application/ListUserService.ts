import { IUserRepository } from '../Infrastructure/Repositories/IUserRespository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListUserService {
  constructor(private readonly repository: IUserRepository) {}
  async execute() {
    return this.repository.list();
  }
}
