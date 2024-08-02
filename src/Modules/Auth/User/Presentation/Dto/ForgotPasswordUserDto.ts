import { IsEmail } from 'class-validator';

export class ForgotPasswordUserDto {
  @IsEmail()
  username: string;
}
