import {
  IMongooseBaseRepository
} from '../../../Shared/Infrastructure/Repositories/IMongooseBaseRepository';
import { IUser } from '../../Domain/interfaces/IUser';

export abstract class IUserRepository extends IMongooseBaseRepository<IUser> {}
