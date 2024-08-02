import { CreateUserDto } from '../../Presentation/Dto/CreateUserDto';
import { BaseId } from '../../../../Shared/Domain/Models/BaseId';
import { UpdateUserDto } from '../../Presentation/Dto/UpdateUserDto';

export class User extends BaseId {
  username: string;
  password: string;
  role: string;

  constructor(payload: CreateUserDto) {
    super();
    this.username = payload.username;
    this.password = payload.password;
  }

  static updateUser(payload: UpdateUserDto): User {
    // TODO: Impl builder pattern
    return payload as User;
  }
}
