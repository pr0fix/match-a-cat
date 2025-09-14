import mongoose from "mongoose";
import { Request } from "express";

export interface User {
  mongoId: mongoose.Types.ObjectId;
  username: string;
  name: string;
  passwordHash: string;
  dateJoined: Date;
  lastActive: Date;
  pictureUrl: string;
  bio?: string;
  catsSwiped: number;
  catsLiked: number;
  catsPassed: number;
  currentStreak: number;
  catsCollected: number;
  achievements: string[];
}

export interface RequestWithUser extends Request {
  user?: any;
}

export interface Cat {
  mongoId?: string;
  id: string;
  imageUrl: string;
  breed: string;
  description: string;
  rarity: string;
  traits: string[];
}

export interface Collection {
  mongoId?: string;
  userId: mongoose.Types.ObjectId;
  cats: mongoose.Types.ObjectId[];
  lastRefreshed: Date;
}

export interface CatResponse {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds?: any[];
}

export interface CatModel {
  id: string;
  imageUrl: string;
  breed: string;
  description: string;
  rarity: string;
  traits: string[];
}
