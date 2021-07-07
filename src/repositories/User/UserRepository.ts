import { Model } from "mongoose";

import IRepository from "../IRepository";
import IUser from "../../interfaces/IUser";

import UserModel from "../../models/UserModel";
import UserRepositoryHandler from "./UserRepositoryHandler";

export default class UserRepository implements IRepository<IUser> {
  public readonly model: Model<IUser> = UserModel;

  public async create(user: IUser): Promise<IUser> {
    const userExists: boolean = !!(await this.model.findOne({
      email: user.email,
    }));

    if (userExists) {
      throw new Error("User already exists!");
    }

    const handledUser: IUser = await UserRepositoryHandler.handleHashPassword(
      user,
    );
    const createdUser: IUser = await new this.model(handledUser).save();

    return UserRepositoryHandler.handleSensibleDataHide(createdUser);
  }

  public async findOne(uuid: string): Promise<IUser> {
    const user: IUser | null = await this.model.findOne({ uuid });

    if (!user) {
      throw new Error("User doesn't exists!");
    }

    return UserRepositoryHandler.handleSensibleDataHide(user);
  }

  public async findMany(): Promise<Array<IUser>> {
    const users: Array<IUser> = await this.model.find();

    return users.map(
      (user: IUser): IUser =>
        UserRepositoryHandler.handleSensibleDataHide(user),
    );
  }

  public async remove(uuid: string): Promise<void> {
    await this.model.findOneAndRemove({ uuid });
  }

  public async update(uuid: string, data: IUser): Promise<IUser> {
    await this.model.findOneAndUpdate({ uuid }, data);

    return this.findOne(uuid);
  }
}
