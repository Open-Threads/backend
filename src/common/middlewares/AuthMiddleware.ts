import { Request, Response, NextFunction } from "express";
import HttpException from "../../exceptions/HttpException";

import AuthService from "../../services/internal/AuthService";
import IUser from "../../interfaces/IUser";

export default class AuthMiddleware {
  public static middle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void | Response<any> {
    try {
      const [tokenType, token]: Array<string> =
        req.headers.authorization!.split(" ");

      if (tokenType !== "Bearer") throw new Error("Invalid token type");

      ((req as any).currentUser as IUser) = AuthService.getMe(token);

      next();
    } catch (err) {
      return new HttpException(res).throw(err.message, 403);
    }
  }
}
