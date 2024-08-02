import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class IMongooseBaseRepository<T> {
  abstract create(entity: T): Promise<T>;
  abstract list(): Promise<T[]>;
  abstract findOneById(id: string): Promise<T>;
  abstract findOneByIdAndUpdate(payload: { id: string; entity: T }): Promise<T>;
  abstract findOneAndUpdate(payload: {
    filter: FilterQuery<T>;
    update?: UpdateQuery<any>;
    options?: QueryOptions;
  }): Promise<T>;
  abstract findOne(payload: {
    filter: FilterQuery<T>;
    // TODO: Change any
    projection?: any;
    options?: QueryOptions;
  }): Promise<Partial<T>>;
}
