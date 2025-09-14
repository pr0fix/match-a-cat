import mongoose from "mongoose";
import { User } from "../utils/types";

const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    dateJoined: {
      type: Date,
      default: Date.now,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    pictureUrl: {
      type: String,
      default: "https://placehold.co/200x200",
    },
    bio: {
      type: String,
    },
    catsSwiped: {
      type: Number,
      default: 0,
    },
    catsLiked: {
      type: Number,
      default: 0,
    },
    catsPassed: {
      type: Number,
      default: 0,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    catsCollected: {
      type: Number,
      default: 0,
    },
    achievements: {
      type: [String],
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
