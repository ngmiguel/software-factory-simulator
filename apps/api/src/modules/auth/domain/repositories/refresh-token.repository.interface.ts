export interface IRefreshTokenRepository {
  create(userId: string, token: string, expiresAt: Date): Promise<void>;
  findValidToken(token: string): Promise<{ userId: string; id: string } | null>;
  revokeToken(token: string): Promise<void>;
  revokeAllUserTokens(userId: string): Promise<void>;
}

export const REFRESH_TOKEN_REPOSITORY = Symbol('REFRESH_TOKEN_REPOSITORY');
