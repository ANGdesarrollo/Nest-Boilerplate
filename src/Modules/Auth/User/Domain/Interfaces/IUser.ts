import { IBaseId } from '../../../../Shared/Domain/Interfaces/IBaseId';

export interface IUser extends IBaseId {
  username: string;
  password: string;
  role: string;
}
