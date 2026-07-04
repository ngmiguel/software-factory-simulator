import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RegisterUserUseCase } from './application/use-cases/register-user.use-case';
import {
  LoginUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
} from './application/use-cases/login.use-case';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';
import { REFRESH_TOKEN_REPOSITORY } from './domain/repositories/refresh-token.repository.interface';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { PrismaRefreshTokenRepository } from './infrastructure/persistence/prisma-refresh-token.repository';
import { PasswordHasherService } from './infrastructure/services/password-hasher.service';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthController } from './presentation/auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('app.jwtSecret'),
        signOptions: {
          expiresIn: config.get<string>('app.jwtExpiresIn', '15m'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    RegisterUserUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    PasswordHasherService,
    JwtTokenService,
    JwtStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: REFRESH_TOKEN_REPOSITORY,
      useClass: PrismaRefreshTokenRepository,
    },
  ],
  exports: [USER_REPOSITORY, PasswordHasherService, JwtModule, PassportModule],
})
export class AuthModule {}
