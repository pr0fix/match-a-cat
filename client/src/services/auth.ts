import axios from "axios";
import type {
  AuthResponse,
  LoginCredentials,
  SignUpCredentials,
} from "../utils/types";
import { AUTH_BASE_URL } from "../utils/constants";

let token: string | null = null;

const TOKEN_KEY = "userToken";

/**
 * Sets the authentication token in memory and localStorage
 * @param newToken The token to store
 * @returns Success status and optional error message
 */
const setToken = (newToken: string): { success: boolean; error?: string } => {
  try {
    if (!newToken) {
      return { success: false, error: "Token cannot be empty" };
    }
    token = `Bearer ${newToken}`;
    window.localStorage.setItem(TOKEN_KEY, token);
    return { success: true };
  } catch (error) {
    console.error("Error setting token:", error);
    token = `Bearer ${newToken}`; // Keep token in memory even if localStorage fails
    return {
      success: false,
      error:
        "Failed to store token in local storage. You may need to login again after refreshing",
    };
  }
};

/**
 * Gets the authentication token from memory or localStorage
 * @returns The token or null if not found/error occurs
 */
const getToken = (): string | null => {
  try {
    if (!token) {
      token = window.localStorage.getItem(TOKEN_KEY);
    }
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

/**
 * Removes the authentication token from memory and localStorage
 * @returns Success status and optional error message
 */
const removeToken = (): { success: boolean; error?: string } => {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    token = null;
    return { success: true };
  } catch (error) {
    console.error("Error removing token:", error);
    token = null; // Clear memory even if localStorage fails
    return {
      success: false,
      error: "Failed to remove token from localStorage",
    };
  }
};

/**
 * Handles the login and authentication of a user
 * @param credentials The login credentials
 * @returns Promise with success boolean, response data, and response status
 */
const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/login`, credentials);
    if (response.data.token) {
      setToken(response.data.token);
    }
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      switch (status) {
        case 401:
          return {
            success: false,
            message: "Invalid username or password",
            status: 401,
          };
        case 429:
          return {
            success: false,
            message: "Too many login attemps. Please try again later.",
            status: 429,
          };
        case 500:
          return {
            success: false,
            message: "Internal server error. Please try again later.",
          };
        default:
          return {
            success: false,
            message: message || "Login failed",
            status: status || 400,
          };
      }
    }

    // Generic error handling
    return {
      success: false,
      message: "An unexpected error occurred",
      status: 500,
    };
  }
};

/**
 * Handles the sign up and authentication of a user
 * @param credentials The sign up credentials
 * @returns Promise with success boolean, message, response data, and response status
 */
const signup = async (
  credentials: SignUpCredentials
): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${AUTH_BASE_URL}/sign-up`, credentials);

    if (response.data.token) {
      setToken(response.data.token);
      login(credentials);
    }

    return {
      success: true,
      message: "Sign up successful",
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      switch (status) {
        case 409:
          return {
            success: false,
            message: "Username already exists",
            status: 409,
          };
        case 400:
          return {
            success: false,
            message: message || "Invalid sign up data",
            status: 400,
          };
        default:
          return {
            success: false,
            message: message || "Sign up failed",
            status: status || 400,
          };
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred while signing up",
      status: 500,
    };
  }
};

/**
 * Handles the log out process by calling the removeToken function
 * @returns Message and the end status of the log out process
 */
const logout = () => {
  try {
    removeToken();
    return {
      message: "You have been logged out",
      status: 200,
    };
  } catch (error) {
    console.error("An error occurred while logging out");
    return {
      message: "An error occurred while logging out, please try again.",
      status: 500,
    };
  }
};

export default { setToken, getToken, login, signup, logout };
