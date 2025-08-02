import express, { Response } from "express";
import authenticateToken from "../middleware/authenticateToken";
import catService from "../services/catService";
import { RequestWithUser } from "../utils/types";

const router = express.Router();

router.get(
  "/daily",
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const userId = req.user.id;
      const cats = await catService.getDailyCats(userId);
      res.status(200).json(cats);
    } catch (error) {
      console.error("Error fetching daily cats:", error);
      res.status(500).json({ error: "Failed to fetch daily cats" });
    }
  }
);

router.post(
  "/collect/:catId",
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const userId = req.user.id;
      const { catId } = req.params;

      const result = await catService.collectCat(userId, catId);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      res.status(200).json({ success: true, catId });
    } catch (error) {
      console.error("Error collecting cat:", error);
      res.status(500).json({ error: "Failed to collect cat" });
    }
  }
);

router.get(
  "/collection",
  authenticateToken,
  async (req: RequestWithUser, res: Response) => {
    try {
      const userId = req.user.id;
      const collection = await catService.getUserCollection(userId);
      res.status(200).json(collection);
    } catch (error) {
      console.error("Error fetching collection:", error);
      res.status(500).json({ error: "Failed to fetch collection" });
    }
  }
);

export default router;
