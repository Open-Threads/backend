import IIssue from "../../interfaces/IIssue";

export default class IssueRepositoryHandler {
  public static handleVotes(issue: IIssue, userUuid?: string): IIssue {
    const votesUp: Array<string> = issue.votesUp! as Array<string>;
    const votesDown: Array<string> = issue.votesDown! as Array<string>;

    if (userUuid) {
      if (votesUp.includes(userUuid)) {
        issue.alreadyVoted = "up";
      } else if (votesDown.includes(userUuid)) {
        issue.alreadyVoted = "down";
      }
    }

    issue.votesUp = votesUp.length;
    issue.votesDown = votesDown.length;
    issue.votes =
      issue.votesUp >= issue.votesDown
        ? issue.votesUp - issue.votesDown
        : issue.votesDown - issue.votesUp;

    return issue;
  }
}
