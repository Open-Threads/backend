import { Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

import AuthService from "../services/internal/AuthService";
import IUser from "../interfaces/IUser";

export default class AuthServiceController extends AuthService {
  public async auth(
    req: Request,
    res: Response,
  ): Promise<Response<{ token: string }>> {
    try {
      const token: string = await super.login(
        req.body.email,
        req.body.password,
      );

      return res.json({
        token,
      });
    } catch (err) {
      return new HttpException(res).throw(err.message, 403);
    }
  }

  public getMe(req: Request, res: Response): Response<IUser> {
    try {
      return res.json((req as any).currentUser);
    } catch (err) {
      return new HttpException(res).throw(err.message, 403);
    }
  }
}
