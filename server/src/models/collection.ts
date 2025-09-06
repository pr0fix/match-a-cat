import mongoose from "mongoose";
import { Collection } from "../utils/types";

const collectionSchema = new mongoose.Schema<Collection>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cat",
      },
    ],
    lastRefreshed: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

collectionSchema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.mongoId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Collection = mongoose.model<Collection>("Collection", collectionSchema);

export default Collection;
