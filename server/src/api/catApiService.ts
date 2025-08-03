import axios from "axios";
import { CAT_API_KEY, CAT_API_URL } from "../utils/constants";
import { CatModel, CatResponse } from "../utils/types";

const fetchRandomCats = async (limit = 10): Promise<CatModel[]> => {
  try {
    const res = await axios.get<CatResponse[]>(
      `${CAT_API_URL}?limit=${limit}&has_breeds=1&api_key=${CAT_API_KEY}`
    );

    return res.data.map((cat) => ({
      id: cat.id,
      imageUrl: cat.url,
      breed: cat.breeds?.[0].name || "Unknown",
      description: cat.breeds?.[0]?.description || "A mysterious cat",
      rarity: assignRarity(cat.breeds?.[0]),
      traits: extractTraits(cat.breeds?.[0]),
    }));
  } catch (error) {
    console.error("Error fetching cats:", error);
    throw new Error("Failed to fetch cats from Cat API");
  }
};

const assignRarity = (breed: any): string => {
  if (!breed) return "common";

  const rarityMap: Record<string, string> = {
    Sphynx: "legendary",
    "Scottish Fold": "epic",
    Bengal: "epic",
    "Maine Coon": "rare",
    Siamese: "rare",
  };

  return rarityMap[breed.name] || "common";
};

const extractTraits = (breed: any): string[] => {
  if (!breed) return ["Mysterious"];

  const traits: string[] = [];
  if (breed.temperament) {
    traits.push(...breed.temperament.split(", ").slice(0, 3));
  }

  if (breed.origin) traits.push(breed.origin);

  return traits;
};

export default { fetchRandomCats };
