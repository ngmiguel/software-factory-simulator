export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export interface LoginCommand {
  email: string;
  password: string;
}

export interface RefreshTokenCommand {
  refreshToken: string;
}

export interface LogoutCommand {
  refreshToken: string;
}

export interface AuthTokensResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}
