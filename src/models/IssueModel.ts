import { Schema, Model, model } from "mongoose";
import { v4 as uuid } from "uuid";

import IIssue from "../interfaces/IIssue";

const IssueSchema: Schema<IIssue> = new Schema({
  uuid: {
    type: String,
    default: uuid,
  },
  linkedUuid: String,
  creatorUuid: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  votesUp: [String],
  votesDown: [String],
  linkedIssues: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const IssueModel: Model<IIssue> = model("Issue", IssueSchema);

export default IssueModel;
