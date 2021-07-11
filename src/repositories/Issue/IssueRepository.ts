import { Model } from "mongoose";

import IRepository from "../IRepository";
import IIssue, { Vote } from "../../interfaces/IIssue";
import IssueRepositoryFeaturesContract from "./IssueRepositoryFeaturesContract";

import IssueModel from "../../models/IssueModel";
import IssueRepositoryHandler from "./IssueRepositoryHandler";

export default class IssueRepository
  implements IRepository<IIssue>, IssueRepositoryFeaturesContract
{
  public readonly model: Model<IIssue> = IssueModel;

  public async create(issue: IIssue): Promise<IIssue> {
    const createdIssue: IIssue = new this.model(issue);

    if (issue.linkedUuid) {
      this.model.findOneAndUpdate(
        { uuid: issue.linkedUuid },
        {
          $push: { linkedIssues: createdIssue.uuid },
        },
      );
    }

    return (createdIssue as any).save();
  }

  public async findOne(uuid: string, currentUser?: string): Promise<IIssue> {
    const issue: IIssue | null = await this.model.findOne({ uuid });

    if (!issue) {
      throw new Error("This issue doesn't exists");
    }

    return IssueRepositoryHandler.handleVotes(issue, currentUser);
  }

  public async findMany({}, currentUser?: string): Promise<Array<IIssue>> {
    const issues: Array<IIssue> = await this.model.find();

    return issues.map(
      (issue: IIssue): IIssue =>
        IssueRepositoryHandler.handleVotes(issue, currentUser),
    );
  }

  public async remove(uuid: string, currentUser?: string): Promise<void> {
    const issue: IIssue | null = await this.model.findOneAndRemove({ uuid });

    if (issue?.linkedUuid) {
      this.model.findOneAndUpdate(
        { uuid: issue.linkedUuid, creatorUuid: currentUser },
        {
          $pull: { linkedIssues: issue.uuid },
        },
      );
    }
  }

  public async update(
    uuid: string,
    data: IIssue,
    currentUser?: string,
  ): Promise<IIssue> {
    Object.assign(data, { updatedAt: new Date().toLocaleString() });

    await this.model.findOneAndUpdate({ uuid, creatorUuid: currentUser }, data);

    return this.findOne(uuid, currentUser);
  }

  public async vote(
    uuid: string,
    direction: Vote,
    currentUser?: string,
  ): Promise<void> {
    const issue: IIssue = await this.findOne(uuid, currentUser);
    const push: string = direction === "up" ? "votesUp" : "votesDown";
    const pull: string = direction === "up" ? "votesDown" : "votesUp";

    if (issue.alreadyVoted === direction) {
      await this.model.findOneAndUpdate(
        { uuid },
        { $pull: { [push]: currentUser } },
      );
    } else {
      if (issue.alreadyVoted) {
        await this.model.findOneAndUpdate(
          { uuid },
          { $pull: { [pull]: currentUser } },
        );
      }

      await this.model.findOneAndUpdate(
        { uuid },
        { $push: { [push]: currentUser } },
      );
    }
  }
}
