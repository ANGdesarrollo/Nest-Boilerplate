import { Module } from '@nestjs/common';
import { UserController } from './Presentation/controller/UserController';
import { ListUserService } from './Application/ListUserService';
import { UserRepository } from './Infrastructure/Repositories/UserRepository';
import { IUserRepository } from './Infrastructure/Repositories/IUserRespository';
import { CreateUserService } from './Application/CreateUserService';
import { GetOneUserService } from './Application/GetOneUserService';
import { UpdateUserService } from './Application/UpdateUserService';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './Domain/entities/User';
import UserSchema from './Infrastructure/Schemas/UserSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
        {
          name: User.name,
          schema: UserSchema,
        },
      ],
    ),
  ],
  controllers: [UserController],
  providers: [
    CreateUserService,
    GetOneUserService,
    ListUserService,
    UpdateUserService,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {
}
