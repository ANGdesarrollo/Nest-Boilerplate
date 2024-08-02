import { IUser } from '../../Domain/Interfaces/IUser';
import { IMongooseBaseRepository } from '../../../../Shared/Infrastructure/Repositories/IMongooseBaseRepository';

export abstract class IUserRepository extends IMongooseBaseRepository<IUser> {}
