import { Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

import IController from "./IController";
import IIssue, { Vote } from "../interfaces/IIssue";
import IUser from "../interfaces/IUser";

import IssueRepository from "../repositories/Issue/IssueRepository";

interface IssueControllerFeaturesContract {
  vote(req: Request, res: Response): Promise<Response<void>>;
}

export default class IssueController
  implements IController<IIssue>, IssueControllerFeaturesContract
{
  public readonly repository: IssueRepository = new IssueRepository();

  private getCurrentUserUuid(req: Request): string | undefined {
    const currentUser: IUser | undefined = (req as any).currentUser;

    return currentUser ? currentUser.uuid : undefined;
  }

  public async create(req: Request, res: Response): Promise<Response<IIssue>> {
    try {
      Object.assign(req.body, { creatorUuid: this.getCurrentUserUuid(req) });
      const issue: IIssue = await this.repository.create(req.body);

      return res.status(201).json(issue);
    } catch (err) {
      return new HttpException(res).throw(err.message, 500);
    }
  }

  public async findOne(req: Request, res: Response): Promise<Response<IIssue>> {
    try {
      const userUuid: string | undefined = this.getCurrentUserUuid(req);
      const issue: IIssue = await this.repository.findOne(
        req.params.uuid,
        userUuid,
      );

      return res.json(issue);
    } catch (err) {
      return new HttpException(res).throw(err.message, 404);
    }
  }

  public async findMany(
    req: Request,
    res: Response,
  ): Promise<Response<Array<IIssue>>> {
    const userUuid: string | undefined = this.getCurrentUserUuid(req);
    const issues: Array<IIssue> = await this.repository.findMany({}, userUuid);

    return res.json(issues);
  }

  public async remove(req: Request, res: Response): Promise<Response<void>> {
    try {
      const userUuid: string | undefined = this.getCurrentUserUuid(req);
      await this.repository.remove(req.params.uuid, userUuid);

      return res.status(202).json();
    } catch (err) {
      return new HttpException(res).throw(err.message, 404);
    }
  }

  public async update(req: Request, res: Response): Promise<Response<IIssue>> {
    try {
      const userUuid: string | undefined = this.getCurrentUserUuid(req);
      const issue: IIssue = await this.repository.update(
        req.params.uuid,
        req.body,
        userUuid,
      );

      return res.json(issue);
    } catch (err) {
      return new HttpException(res).throw(err.message, 404);
    }
  }

  public async vote(req: Request, res: Response): Promise<Response<void>> {
    try {
      const userUuid: string | undefined = this.getCurrentUserUuid(req);
      await this.repository.vote(
        req.params.uuid,
        req.params.direction as Vote,
        userUuid,
      );

      return res.status(202).json();
    } catch (err) {
      return new HttpException(res).throw(err.message, 404);
    }
  }
}
