import Cat from "../models/cat";
import Collection from "../models/collection";
import catApiService from "../api/catApiService";
import mongoose from "mongoose";

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
          cat = new Cat(catData);
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

const collectCat = async (userId: string, catId: string) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const cat = await Cat.findOne({ id: catId });
    if (!cat) {
      return { error: "Cat not found" };
    }

    const catObjectId = cat._id;

    let collection = await Collection.findOne({ userId: userObjectId });

    if (!collection) {
      collection = new Collection({
        userId: userObjectId,
        cats: [catObjectId],
      });
    } else {
      if (collection.cats.some(id => id.equals(catObjectId))) {
        return { error: "Cat already in collection" };
      }

      collection.cats.push(catObjectId);
    }

    await collection.save();

    return { success: true, catId };
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

export default { getDailyCats, collectCat, getUserCollection };
