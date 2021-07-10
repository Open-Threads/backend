import { Request, Response } from "express";

import IRepository from "../repositories/IRepository";

export default interface IController<T> {
  readonly repository: IRepository<T>;

  create(req: Request, res: Response): Promise<Response<T>>;
  findOne(req: Request, res: Response): Promise<Response<T>>;
  findMany(req: Request, res: Response): Promise<Response<Array<T>>>;
  update(req: Request, res: Response): Promise<Response<T>>;
  remove(req: Request, res: Response): Promise<Response<void>>;
}
