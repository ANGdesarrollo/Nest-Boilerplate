import {
  Document,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { BaseId } from '../../Domain/Models/BaseId';
import { IMongooseBaseRepository } from './IMongooseBaseRepository';
import { NotFoundException } from '@nestjs/common';

export abstract class MongooseBaseRepository<
  T extends BaseId,
  D extends Document & T,
> implements IMongooseBaseRepository<T>
{
  model: Model<D>;
  protected constructor(model: Model<D>) {
    this.model = model;
  }

  async create(entity: T): Promise<T> {
    return this.model.create(entity);
  }

  async list(): Promise<T[]> {
    return this.model.find();
  }

  async findOneById(id: string) {
    return this.model.findById(id);
  }

  async findOneByIdAndUpdate(payload: { id: string; entity: T }): Promise<T> {
    const { id, entity } = payload;
    const entityUpdated = await this.model.findByIdAndUpdate(id, entity, {
      new: true,
    });

    if (!entityUpdated) {
      throw new NotFoundException('Entity not found');
    }

    return entityUpdated;
  }

  async findOneAndUpdate(payload: {
    filter: FilterQuery<T>;
    update?: UpdateQuery<any>;
    options?: QueryOptions;
  }): Promise<T> {
    const { filter, update, options } = payload;
    const entityUpdated = await this.model.findOneAndUpdate(filter, update, {
      new: true,
      ...options,
    });

    if (!entityUpdated) {
      throw new NotFoundException('Entity not found');
    }

    return entityUpdated;
  }

  async findOne(payload: {
    filter: FilterQuery<T>;
    projection?: any;
    options?: QueryOptions;
  }): Promise<Partial<T>> {
    const { filter, projection, options } = payload;

    const entity = await this.model.findOne(filter, projection, options);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }
}
