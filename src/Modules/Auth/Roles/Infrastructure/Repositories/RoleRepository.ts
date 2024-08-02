import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongooseBaseRepository } from '../../../../Shared/Infrastructure/Repositories/MongooseBaseRepository';
import { RoleMongooseDocument } from '../Schemas/RoleSchema';
import { IRoleRepository } from './IRoleRepository';
import { IRole } from '../../Domain/Interfaces/IRole';

@Injectable()
export class RoleRepository
  extends MongooseBaseRepository<IRole, RoleMongooseDocument>
  implements IRoleRepository
{
  constructor(@InjectModel('Role') roleModel: Model<RoleMongooseDocument>) {
    super(roleModel);
  }
}
