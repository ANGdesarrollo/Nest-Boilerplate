import { v4 as uuid } from 'uuid';
export class BaseId {
  _id: string;
  constructor() {
    this._id = uuid();
  }
}
