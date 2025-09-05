export interface Card {
  mongoId: string;
  imageUrl: string;
  breed: string;
  description: string;
  rarity: string;
  traits: string[];
  name?: string;
  age?: number;
  location?: string;
  gender?: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  user?: User;
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
  status?: number;
}

export interface CatApiResponse {
  data: any;
  status: number | undefined;
  error?: boolean;
  message?: string;
  originalError?: string | unknown;
}
