import { Model } from "mongoose";

export default interface IRepository<T> {
  readonly model: Model<T>;

  create(entity: T): Promise<T>;
  findOne(uuid: string): Promise<T>;
  findAll(): Promise<Array<T>>;
  remove(uuid: string): Promise<T>;
  update(uuid: string, data: T): Promise<T>;
}
