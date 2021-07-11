import jwt from "jsonwebtoken";

import Env from "../../config/Env";
import IUser from "../../interfaces/IUser";

export default class JsonWebToken {
  public static encode(payload: IUser): string {
    return jwt.sign(payload, Env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: Env.TOKEN_DURATION,
    });
  }

  public static decode(token: string): any {
    try {
      return jwt.verify(token, Env.TOKEN_SECRET);
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}
