import mongoose from "mongoose";
import { User } from "../utils/types";

const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: String,
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

userSchema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.mongoId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model<User>("User", userSchema);

export default User;
