import "../../database/connect";

import IssueRepository from "../../repositories/Issue/IssueRepository";
import IIssue from "../../interfaces/IIssue";

import UserRepository from "../../repositories/User/UserRepository";
import IUser from "../../interfaces/IUser";

describe("Issue Repository tests suite", (): void => {
  const issueRepository: IssueRepository = new IssueRepository();

  const model: IIssue = {
    content: "test",
  };

  beforeAll(async (): Promise<void> => {
    const user: IUser = await new UserRepository().create({
      username: "test",
      email: "test@email.com",
      password: "123",
    });

    Object.assign(model, { creatorUuid: user.uuid });
  });

  afterAll(async (): Promise<void> => {
    await new UserRepository().remove(model.creatorUuid!);
  });

  it("Create a issue", async (): Promise<void> => {
    const issue: IIssue = await issueRepository.create(model);

    if (issue) Object.assign(model, { uuid: issue.uuid });

    expect(issue.content).toStrictEqual(model.content);
    expect(issue.creatorUuid).toStrictEqual(model.creatorUuid);
  });

  it("Find a issue", async (): Promise<void> => {
    const issue: IIssue = await issueRepository.findOne(model.uuid!);

    expect(issue.uuid).toStrictEqual(model.uuid);
  });

  it("Find many issues", async (): Promise<void> => {
    const issues: Array<IIssue> = await issueRepository.findMany({});

    expect(issues.length).toStrictEqual(1);
  });

  it("Update a issue", async (): Promise<void> => {
    const issue: IIssue = await issueRepository.update(
      model.uuid!,
      { content: "update test" },
      model.creatorUuid!,
    );

    expect(issue.content).toStrictEqual("update test");
  });

  it("Remove a issue", async (): Promise<void> => {
    const issue: void = await issueRepository.remove(model.uuid!);

    expect(issue).toStrictEqual(undefined);
  });

  it("Vote up", async (): Promise<void> => {
    const issue: void = await issueRepository.vote(
      model.uuid!,
      "up",
      model.creatorUuid!,
    );

    expect(issue).toStrictEqual(undefined);
  });

  it("Vote down", async (): Promise<void> => {
    const issue: void = await issueRepository.vote(
      model.uuid!,
      "down",
      model.creatorUuid!,
    );

    expect(issue).toStrictEqual(undefined);
  });
});
