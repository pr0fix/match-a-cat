export interface Card {
  id: number;
  catImage: string;
  name: string;
  age: number;
  type: string;
  location: string;
  breed: string;
  gender: string;
}

export interface User {
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
