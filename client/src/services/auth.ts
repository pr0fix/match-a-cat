import axios from "axios";
import type { LoginCredentials, SignUpCredentials } from "../utils/types";
import { BASE_URL } from "../utils/constants";

let token: string | null = null;

const TOKEN_KEY = "userToken";

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
  window.localStorage.setItem(TOKEN_KEY, token);
};

const getToken = () => {
  const storedToken = window.localStorage.getItem(TOKEN_KEY);
  token = storedToken;
  return token;
};

const login = async (credentials: LoginCredentials) => {
  const res = await axios.post(`${BASE_URL}/login`, credentials);
  if (res.data.token) {
    setToken(res.data.token);
  }
  return res.data;
};

const signup = async (credentials: SignUpCredentials) => {
  const res = await axios.post(`${BASE_URL}/signup`, credentials);

  if (res.data.token) {
    setToken(res.data.token);
    login(credentials);
  }

  return res.data;
};

const logout = () => {
  token = null;
  window.localStorage.removeItem(TOKEN_KEY);
};

export default { setToken, getToken, login, signup, logout };
