import { PasswordService } from '../../../Shared/Application/PasswordService';
import { IUserRepository } from '../Infrastructure/Repositories/IUserRespository';
import { LoginUserDto } from '../Presentation/Dto/LoginUserDto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from '../Domain/Interfaces/IUser';

@Injectable()
export class LoginUserService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(payload: LoginUserDto) {
    const { password, username } = payload;
    const user = await this.getUser(username);

    const isValidPassword = await this.checkIfPasswordIsValid({
      password,
      hash: user.password,
    });

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  private async getUser(username: string): Promise<Partial<IUser>> {
    return this.userRepository.findOne({
      filter: {
        username,
      },
    });
  }

  private async checkIfPasswordIsValid(payload: {
    password: string;
    hash: string;
  }) {
    const { password, hash } = payload;
    return this.passwordService.comparePassword(password, hash);
  }
}
