export type Vote = "up" | "down";

export default interface IIssue {
  uuid?: string;
  linkedUuid?: string;
  creatorUuid?: string;
  title: string;
  content: string;
  votesUp?: Array<string> | number;
  votesDown?: Array<string> | number;
  votes?: number;
  alreadyVoted?: Vote;
  linkedIssues?: Array<string> | Array<IIssue>;
  createdAt?: string;
  updatedAt?: string;
}
