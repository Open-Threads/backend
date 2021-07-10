import { Vote } from "../../interfaces/IIssue";

export default interface IssueRepositoryFeaturesContract {
  vote(targetUuid: string, direction: Vote): Promise<void>;
}
