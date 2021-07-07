import { Schema, Model, model } from "mongoose";
import { v4 as uuid } from "uuid";

import IUser from "../interfaces/IUser";

const UserSchema: Schema<IUser> = new Schema({
  uuid: {
    type: String,
    default: uuid,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel: Model<IUser> = model("User", UserSchema);

export default UserModel;
