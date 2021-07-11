import { Response } from "express";

export default class HttpException {
  constructor(private readonly res: Response) {}

  public throw(message: string, statusCode: number): Response<any> {
    return this.res.status(statusCode || 500).json({
      message,
    });
  }
}
