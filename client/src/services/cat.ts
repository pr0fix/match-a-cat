import axios from "axios";
import { CAT_BASE_URL } from "../utils/constants";
import auth from "./auth";

const getDailyCats = async () => {
  try {
    const userToken = auth.getToken();
    const res = await axios.get(`${CAT_BASE_URL}/daily`, {
      headers: { Authorization: userToken },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching daily cats");
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to fetch daily cats";
      console.error(`API Error: ${message}`);
      return { error: true, message, status: error.response?.status };
    }
    console.error("Unexpected error:", error);
    return {
      error: true,
      message: "An unexpected error occurred",
      originalError: error,
    };
  }
};

export default { getDailyCats };
