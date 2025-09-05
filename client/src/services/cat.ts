import axios from "axios";
import { CAT_BASE_URL } from "../utils/constants";
import auth from "./auth";
import type { CatApiResponse } from "../utils/types";

/**
 * Handles the API call to the server to fetch daily cats
 * @returns The response data, status, message, custom error message & original error message
 */
const getDailyCats = async (): Promise<CatApiResponse> => {
  try {
    const userToken = auth.getToken();
    const res = await axios.get(`${CAT_BASE_URL}/daily`, {
      headers: { Authorization: userToken },
    });

    return { data: res.data, status: 200 };
  } catch (error) {
    console.error("Error fetching daily cats");
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to fetch daily cats";
      console.error(`API Error: ${message}`);
      return {
        error: true,
        message,
        status: error.response?.status,
        data: null,
      };
    }
    console.error("Unexpected error:", error);
    return {
      error: true,
      message: "An unexpected error occurred",
      originalError: error,
      data: null,
      status: 500,
    };
  }
};

export default { getDailyCats };
