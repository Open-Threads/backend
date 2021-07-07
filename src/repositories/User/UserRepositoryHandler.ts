import IUser from "../../interfaces/IUser";

import * as bcrypt from "bcrypt";

export default class UserRepositoryHandler {
  public static async handleHashPassword(user: IUser): Promise<IUser> {
    const salt: string = await bcrypt.genSalt(10);
    const hash: string = await bcrypt.hash(user.password!, salt);

    user.password = hash;

    return user;
  }

  public static handleSensibleDataHide(user: IUser): IUser {
    user.email = undefined;
    user.password = undefined;

    return user;
  }
}
