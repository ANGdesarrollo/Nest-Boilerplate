import { IMongooseBaseRepository } from '../../../../Shared/Infrastructure/Repositories/IMongooseBaseRepository';
import { IRole } from '../../Domain/Interfaces/IRole';

export abstract class IRoleRepository extends IMongooseBaseRepository<IRole> {}
