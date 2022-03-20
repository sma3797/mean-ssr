import * as mongoose from "mongoose";

import db from "../db";

const { Schema } = mongoose;
const { Types } = Schema;

interface IAccountModel extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  displayPicture: string;
}

const AccountSchema = new Schema(
  {
    email: {
      type: Types.String,
      unique: true,
    },
    name: {
      type: Types.String,
    },
    password: {
      type: Types.String,
    },
    displayPicture: {
      type: Types.String,
    },
  },
  { timestamps: true },
);

const AuthModelName = "Account";

AccountSchema.index({ email: 1 }, { unique: true });
export const Account = db.model<IAccountModel>(AuthModelName, AccountSchema as any);
