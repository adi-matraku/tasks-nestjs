export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  salt?: any;
  createdAt: Date;
  lastUpdatedAt: Date;
  isActive: boolean;
}

export interface JwtPayloadInterface {
  id: number;
  iat: number;
  exp: number;
}
