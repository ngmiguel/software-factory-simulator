import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { Result } from '../../../../shared/application/result';
import { AuthTokensResponse, LoginCommand } from '../commands/auth-tokens.command';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import {
  IRefreshTokenRepository,
  REFRESH_TOKEN_REPOSITORY,
} from '../../domain/repositories/refresh-token.repository.interface';
import { PasswordHasherService } from '../../infrastructure/services/password-hasher.service';
import { JwtTokenService } from '../../infrastructure/services/jwt-token.service';

@Injectable()
export class LoginUseCase implements IUseCase<LoginCommand, Result<AuthTokensResponse>> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: PasswordHasherService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(command: LoginCommand): Promise<Result<AuthTokensResponse>> {
    const user = await this.userRepository.findByEmail(command.email.trim().toLowerCase());

    if (!user) {
      return Result.fail(new Error('Invalid credentials'));
    }

    const isValid = await this.passwordHasher.compare(command.password, user.passwordHash);
    if (!isValid) {
      return Result.fail(new Error('Invalid credentials'));
    }

    if (!user.isActive) {
      return Result.fail(new Error('Account is disabled'));
    }

    user.recordLogin();
    await this.userRepository.save(user);

    const tokens = await this.jwtTokenService.generateTokenPair(user);

    return Result.ok({
      user: {
        id: user.id.toString(),
        email: user.email.value,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    });
  }
}

@Injectable()
export class RefreshTokenUseCase implements IUseCase<
  { refreshToken: string },
  Result<AuthTokensResponse>
> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(command: { refreshToken: string }): Promise<Result<AuthTokensResponse>> {
    const stored = await this.refreshTokenRepository.findValidToken(command.refreshToken);
    if (!stored) {
      return Result.fail(new Error('Invalid or expired refresh token'));
    }

    await this.refreshTokenRepository.revokeToken(command.refreshToken);

    const user = await this.userRepository.findById(stored.userId);
    if (!user || !user.isActive) {
      return Result.fail(new Error('User not found or disabled'));
    }

    const tokens = await this.jwtTokenService.generateTokenPair(user);

    return Result.ok({
      user: {
        id: user.id.toString(),
        email: user.email.value,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      ...tokens,
    });
  }
}

@Injectable()
export class LogoutUseCase implements IUseCase<{ refreshToken: string }, Result<void>> {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute(command: { refreshToken: string }): Promise<Result<void>> {
    await this.refreshTokenRepository.revokeToken(command.refreshToken);
    return Result.ok(undefined);
  }
}
