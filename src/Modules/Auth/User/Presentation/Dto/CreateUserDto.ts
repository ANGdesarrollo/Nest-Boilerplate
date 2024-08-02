import { IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsEmail()
  readonly username: string;
  @IsString()
  readonly password: string;
}
