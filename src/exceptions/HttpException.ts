import { Response } from "express";

export default class HttpException {
  constructor(private readonly res: Response) {}

  public throw(statusCode: number, message: string): Response<any> {
    return this.res.status(statusCode || 500).json({
      message,
    });
  }
}
