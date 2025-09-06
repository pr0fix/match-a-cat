import mongoose from "mongoose";
import { Cat } from "../utils/types";

const catSchema = new mongoose.Schema<Cat>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    breed: String,
    description: String,
    rarity: {
      type: String,
      enum: ["common", "rare", "epic", "legendary"],
      default: "common",
    },
    traits: [String],
  },
  { versionKey: false }
);

catSchema.set("toJSON", {
  transform: (_document: any, returnedObject: any) => {
    returnedObject.mongoId = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Cat = mongoose.model<Cat>("Cat", catSchema);

export default Cat;
