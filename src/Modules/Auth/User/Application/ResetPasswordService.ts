import { IUserRepository } from '../Infrastructure/Repositories/IUserRespository';
import { Injectable } from '@nestjs/common';
import { PasswordService } from '../../../Shared/Application/PasswordService';

interface PayloadResetPassword {
  password: string;
  username: string;
}
@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async execute(payload: PayloadResetPassword) {
    const newPasswordHash = await this.passwordService.hashPassword(
      payload.password,
    );

    return this.updatePassword({
      username: payload.username,
      password: newPasswordHash,
    });
  }

  private updatePassword(payload: PayloadResetPassword) {
    return this.repository.findOneAndUpdate({
      filter: {
        username: payload.username,
      },
      update: {
        $set: {
          password: payload.password,
        },
      },
    });
  }
}
