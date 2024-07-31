import { UpdateUserDto } from '../Presentation/dto/UpdateUserDto';

export class UpdateUserService {
  async execute(payload: {
    id: string;
    updateUserDto: UpdateUserDto
  }) {
  }
}
