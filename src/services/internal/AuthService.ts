import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import UserModel from "../../models/UserModel";
import JsonWebToken from "../../shared/lib/JsonWebToken";

import IUser from "../../interfaces/IUser";

export default class AuthService {
  private readonly model: Model<IUser> = UserModel;

  protected async login(email: string, password: string): Promise<string> {
    const user: IUser | null = await this.model.findOne({ email });

    if (!user) {
      throw new Error("User doesn't exists");
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      throw new Error("Invalid password");
    }

    return JsonWebToken.encode({
      uuid: user.uuid!,
      username: user.username,
      email: user.email!,
      createdAt: user.createdAt!.toString(),
      updatedAt: user.updatedAt!.toString(),
    });
  }

  public static getMe(token: string): IUser {
    const user: IUser = JsonWebToken.decode(token);

    return user;
  }
}
