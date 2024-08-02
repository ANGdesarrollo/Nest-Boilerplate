import { IsString } from 'class-validator';

export class ResetPasswordUserDto {
  @IsString()
  password: string;
}
