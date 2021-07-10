import { Request, Response } from "express";

import IController from "./IController";
import IRepository from "../repositories/IRepository";
import IUser from "../interfaces/IUser";

import UserRepository from "../repositories/User/UserRepository";

export default class UserController implements IController<IUser> {
  public readonly repository: IRepository<IUser> = new UserRepository();

  public async create(req: Request, res: Response): Promise<Response<IUser>> {
    const user: IUser = await this.repository.create(req.body);

    return res.status(201).json(user);
  }

  public async findOne(req: Request, res: Response): Promise<Response<IUser>> {
    const user: IUser = await this.repository.findOne(req.params.uuid);

    return res.json(user);
  }

  public async findMany(
    _req: Request,
    res: Response,
  ): Promise<Response<Array<IUser>>> {
    const users: Array<IUser> = await this.repository.findMany();

    return res.json(users);
  }

  public async update(req: Request, res: Response): Promise<Response<IUser>> {
    const user: IUser = await this.repository.update(
      (req as any).currentUser,
      req.body,
    );

    return res.json(user);
  }

  public async remove(req: Request, res: Response): Promise<Response<void>> {
    await this.repository.remove((req as any).currentUser);

    return res.status(202);
  }
}
