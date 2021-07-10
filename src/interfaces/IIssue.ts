export type Vote = "up" | "down";

export default interface IIssue {
  uuid?: string;
  linkedUuid?: string;
  creatorUuid?: string;
  content: string;
  votesUp?: Array<string> | number;
  votesDown?: Array<string> | number;
  votes?: number;
  alreadyVoted?: Vote;
  linkedIssues: Array<string>;
  createdAt?: string;
  updatedAt?: string;
}
