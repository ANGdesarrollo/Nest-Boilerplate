export abstract class IMongooseBaseRepository<T> {
  abstract create(entity: T): Promise<T>
}
