import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { JwtPayload, TokenPair } from '../../application/commands/auth-tokens.command';
import { User } from '../../domain/entities/user.entity';
import {
  IRefreshTokenRepository,
  REFRESH_TOKEN_REPOSITORY,
} from '../../domain/repositories/refresh-token.repository.interface';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async generateTokenPair(user: User): Promise<TokenPair> {
    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email.value,
      role: user.role,
    };

    const expiresIn = this.configService.get<string>('app.jwtExpiresIn', '15m');
    const accessToken = this.jwtService.sign(payload);

    const refreshToken = randomBytes(64).toString('hex');
    const refreshExpiresIn = this.configService.get<string>('app.jwtRefreshExpiresIn', '7d');
    const expiresAt = this.parseDurationToDate(refreshExpiresIn);

    await this.refreshTokenRepository.create(user.id.toString(), refreshToken, expiresAt);

    return { accessToken, refreshToken, expiresIn };
  }

  parseDurationToDate(duration: string): Date {
    const now = new Date();
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) {
      now.setDate(now.getDate() + 7);
      return now;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        now.setSeconds(now.getSeconds() + value);
        break;
      case 'm':
        now.setMinutes(now.getMinutes() + value);
        break;
      case 'h':
        now.setHours(now.getHours() + value);
        break;
      case 'd':
        now.setDate(now.getDate() + value);
        break;
    }

    return now;
  }

  verifyAccessToken(token: string): JwtPayload {
    return this.jwtService.verify<JwtPayload>(token);
  }
}
