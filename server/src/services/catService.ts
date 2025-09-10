import Cat from "../models/cat";
import Collection from "../models/collection";
import catApiService from "../api/catApiService";
import mongoose from "mongoose";
import { generateCatDetails } from "../utils/generateCatDetails";

const getDailyCats = async (userId: string, limit = 10) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    let collection = await Collection.findOne({ userId: userObjectId });

    if (!collection) {
      collection = new Collection({
        userId: userObjectId,
        cats: [],
        lastRefreshed: new Date(0),
      });
    }

    const now = new Date();
    const lastRefresh = new Date(collection.lastRefreshed);
    const hoursSinceRefresh =
      (now.getTime() - lastRefresh.getTime()) / (1000 * 60 * 60);

    if (hoursSinceRefresh >= 24) {
      const newCats = await catApiService.fetchRandomCats(limit);

      for (const catData of newCats) {
        let cat = await Cat.findOne({ id: catData.id });

        if (!cat) {
          const catDetails = generateCatDetails();
          cat = new Cat({
            ...catData,
            name: catDetails.name,
            age: catDetails.age,
            location: catDetails.location,
            gender: catDetails.gender,
          });
          await cat.save();
        }
      }

      collection.lastRefreshed = now;
      await collection.save();
    }

    const availableCats = await Cat.find({
      _id: { $nin: collection.cats },
    }).limit(limit);

    return availableCats;
  } catch (error) {
    console.error("Error getting daily cats:", error);
    throw new Error("Failed to get daily cats");
  }
};

const saveUserCollection = async (userId: string, catIds: string[]) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const cats = await Cat.find({ id: { $in: catIds } });
    const catObjectIds = cats.map((cat) => cat._id);
    let collection = await Collection.findOneAndUpdate(
      { userId: userObjectId },
      { cats: catObjectIds },
      { new: true, upsert: true }
    );
    console.log(collection);
    await collection.save();

    return { success: true };
  } catch (error) {
    console.error("Error collecting cat:", error);
    throw new Error("Failed to collect cat");
  }
};

const getUserCollection = async (userId: string) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const collection = await Collection.findOne({
      userId: userObjectId,
    }).populate("cats");

    if (!collection) {
      return { cats: [] };
    }

    return { cats: collection.cats };
  } catch (error) {
    console.error("Error getting user collection:", error);
    throw new Error("Failed to get user collection");
  }
};

export default { getDailyCats, saveUserCollection, getUserCollection };
