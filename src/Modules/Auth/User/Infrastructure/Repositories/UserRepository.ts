import { UserMongooseDocument } from '../Schemas/UserSchema';
import { IUser } from '../../Domain/Interfaces/IUser';
import { IUserRepository } from './IUserRespository';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseBaseRepository } from '../../../../Shared/Infrastructure/Repositories/MongooseBaseRepository';

@Injectable()
export class UserRepository
  extends MongooseBaseRepository<IUser, UserMongooseDocument>
  implements IUserRepository
{
  constructor(@InjectModel('User') userModel: Model<UserMongooseDocument>) {
    super(userModel);
  }
}
