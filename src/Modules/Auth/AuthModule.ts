import { Module } from '@nestjs/common';
import { SharedModule } from '../Shared/SharedModule';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './User/Domain/Entities/User';
import UserSchema from './User/Infrastructure/Schemas/UserSchema';
import { UserController } from './User/Presentation/Controller/UserController';
import { userServices } from './User/Application';
import { JWToken } from './User/Presentation/Helpers/JWToken';
import { IUserRepository } from './User/Infrastructure/Repositories/IUserRespository';
import { UserRepository } from './User/Infrastructure/Repositories/UserRepository';
import { Role } from './Roles/Domain/Entities/Role';
import RoleSchema from './Roles/Infrastructure/Schemas/RoleSchema';
import { IRoleRepository } from './Roles/Infrastructure/Repositories/IRoleRepository';
import { RoleRepository } from './Roles/Infrastructure/Repositories/RoleRepository';
import { SyncRolesCommand } from './Roles/Presentation/Commands/SyncRolesCommand';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    ...userServices,
    JWToken,
    SyncRolesCommand,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IRoleRepository,
      useClass: RoleRepository,
    },
  ],
})
export class AuthModule {}
