import { Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

import IController from "./IController";
import IRepository from "../repositories/IRepository";
import IUser from "../interfaces/IUser";

import UserRepository from "../repositories/User/UserRepository";

export default class UserController implements IController<IUser> {
  public readonly repository: IRepository<IUser> = new UserRepository();

  public async create(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      const user: IUser = await this.repository.create(req.body);

      return res.status(201).json(user);
    } catch (err) {
      return new HttpException(res).throw(err.message, 406);
    }
  }

  public async findOne(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      const user: IUser = await this.repository.findOne(req.params.uuid);

      return res.json(user);
    } catch (err) {
      return new HttpException(res).throw(err.message, 404);
    }
  }

  public async findMany(
    _req: Request,
    res: Response,
  ): Promise<Response<Array<IUser>>> {
    const users: Array<IUser> = await this.repository.findMany();

    return res.json(users);
  }

  public async update(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      const user: IUser = await this.repository.update(
        (req as any).currentUser.uuid,
        req.body,
      );

      return res.json(user);
    } catch (err) {
      return new HttpException(res).throw(err.message, 406);
    }
  }

  public async remove(req: Request, res: Response): Promise<Response<void>> {
    try {
      await this.repository.remove((req as any).currentUser.uuid);

      return res.status(202).json();
    } catch (err) {
      return new HttpException(res).throw(err.message, 406);
    }
  }
}
