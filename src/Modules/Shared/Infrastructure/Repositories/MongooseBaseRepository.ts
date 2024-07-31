import { Document, Model } from 'mongoose';
import { BaseId } from '../../Models/BaseId';
import { IMongooseBaseRepository } from './IMongooseBaseRepository';

export abstract class MongooseBaseRepository<T extends BaseId, D extends Document & T> implements IMongooseBaseRepository<T> {
  model: Model<D>
  protected constructor(model: Model<D>) {
    this.model = model;
  }

  async create(entity: T): Promise<T> {
    console.log(entity);
    console.log("llegue");
    return this.model.create(entity);
  }
}
