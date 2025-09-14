import CatModel from "../models/cat";
import Collection from "../models/collection";
import catApiService from "../api/catApiService";
import mongoose from "mongoose";
import { generateCatDetails } from "../utils/generateCatDetails";
import { Cat } from "../utils/types";

const fetchAndStoreDailyCats = async (limit = 50) => {
  try {
    const newCats = await catApiService.fetchRandomCats(limit);
    
    for (const catData of newCats) {
      let cat = await CatModel.findOne({ id: catData.id });
      if (!cat) {
        const catDetails = generateCatDetails();
        cat = new CatModel({
          ...catData,
          name: catDetails.name,
          age: catDetails.age,
          location: catDetails.location,
          gender: catDetails.gender,
        });
        await cat.save();
      }
    }
    console.log(`Fetched and stored ${newCats.length} new cats`);
  } catch (error) {
    console.error("Error fetching/storing daily cats:", error);
  }
};

const getDailyCats = async (userId: string, limit = 10) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    let collection = await Collection.findOne({ userId: userObjectId });
    if (!collection) {
      collection = new Collection({
        userId: userObjectId,
        cats: [],
        swipedCats: [],
        dailyCats: [],
        lastRefreshed: new Date(0),
      });
    }

    const now = new Date();
    const lastRefresh = new Date(collection.lastRefreshed);
    const hoursSinceRefresh =
      (now.getTime() - lastRefresh.getTime()) / (1000 * 60 * 60);

    let dailyCats: Cat[] = [];

    if (hoursSinceRefresh >= 24 || collection.dailyCats.length === 0) {
      const availableCats = await CatModel.aggregate([
        { $match: { _id: { $nin: collection.swipedCats } } },
        { $sample: { size: limit } },
      ]);

      dailyCats = availableCats;

      const newCatIds = availableCats.map((cat) => cat._id);
      collection.dailyCats = newCatIds;
      collection.lastRefreshed = now;
      await collection.save();
    } else {
      dailyCats = await CatModel.find({ _id: { $in: collection.dailyCats } });
    }
    return dailyCats;
  } catch (error) {
    console.error("Error getting daily cats:", error);
    throw new Error("Failed to get daily cats");
  }
};

const recordSwipe = async (userId: string, catId: string, liked: boolean) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const catObjectId = new mongoose.Types.ObjectId(catId);

    const update: any = { $addToSet: { swipedCats: catObjectId } };
    if (liked) {
      update.$addToSet.cats = catObjectId;
    }

    await Collection.findOneAndUpdate({ userId: userObjectId }, update, {
      upsert: true,
    });

    return { success: true };
  } catch (error) {
    console.error("Error recording swipe:", error);
    throw new Error("Failed to record swipe");
  }
};

const saveUserCollection = async (userId: string, catIds: string[]) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const cats = await CatModel.find({ id: { $in: catIds } });
    const catObjectIds = cats.map((cat) => cat._id);
    let collection = await Collection.findOneAndUpdate(
      { userId: userObjectId },
      { $addToSet: { cats: { $each: catObjectIds } } },
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

export default {
  fetchAndStoreDailyCats,
  getDailyCats,
  saveUserCollection,
  getUserCollection,
  recordSwipe,
};
