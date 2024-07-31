import { BaseId } from '../../../Shared/Models/BaseId';
import { CreateUserDto } from '../../Presentation/dto/CreateUserDto';

export class User extends BaseId {
  username: string;
  password: string;

  constructor(payload: CreateUserDto) {
    super();
    this.username = payload.username;
    this.password = payload.password;
  }
}
