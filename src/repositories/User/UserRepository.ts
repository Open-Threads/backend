import { Model } from "mongoose";

import IRepository from "../IRepository";
import IUser from "../../interfaces/IUser";

import UserModel from "../../models/UserModel";

export default class UserRepository implements IRepository<IUser> {
  public readonly model: Model<IUser> = UserModel;

  public async create(user: IUser): Promise<IUser> {
    const userExists: boolean = !!(await this.model.findOne({
      email: user.email,
    }));

    if (userExists) {
      throw new Error("User already exists!");
    }

    const createdUser: IUser = await new this.model(user).save();

    return createdUser;
  }

  public async findOne(uuid: string): Promise<IUser> {
    const user: IUser | null = await this.model.findOne({ uuid });

    if (!user) {
      throw new Error("User doesn't exists!");
    }

    return user;
  }

  public async findMany(): Promise<Array<IUser>> {
    return this.model.find();
  }

  public async remove(uuid: string): Promise<void> {
    await this.model.findOneAndRemove({ uuid });
  }

  public async update(uuid: string, data: IUser): Promise<IUser> {
    await this.model.findOneAndUpdate({ uuid }, data);

    return this.findOne(uuid);
  }
}
