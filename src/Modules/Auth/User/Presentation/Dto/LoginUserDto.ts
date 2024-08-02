import { IsEmail, IsString } from 'class-validator';
export class LoginUserDto {
  @IsEmail()
  readonly username: string;
  @IsString()
  readonly password: string;
}
