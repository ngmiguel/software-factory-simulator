import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { RegisterUserUseCase } from '../../application/use-cases/register-user.use-case';
import {
  LoginUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
} from '../../application/use-cases/login.use-case';
import { AuthUserResponseDto, RegisterDto } from './dto/register.dto';
import { AuthTokensResponseDto, LoginDto, RefreshTokenDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
@Throttle({ default: { limit: 10, ttl: 60000 } })
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, type: AuthUserResponseDto })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(@Body() dto: RegisterDto): Promise<AuthUserResponseDto> {
    const result = await this.registerUserUseCase.execute(dto);

    if (result.isFailure) {
      const error = result.getError();
      if (error.message === 'Email already registered') {
        throw new ConflictException(error.message);
      }
      throw new BadRequestException(error.message);
    }

    return result.getValue();
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login and receive JWT tokens' })
  @ApiResponse({ status: 200, type: AuthTokensResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto): Promise<AuthTokensResponseDto> {
    const result = await this.loginUseCase.execute(dto);

    if (result.isFailure) {
      throw new UnauthorizedException(result.getError().message);
    }

    return result.getValue();
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({ status: 200, type: AuthTokensResponseDto })
  async refresh(@Body() dto: RefreshTokenDto): Promise<AuthTokensResponseDto> {
    const result = await this.refreshTokenUseCase.execute(dto);

    if (result.isFailure) {
      throw new UnauthorizedException(result.getError().message);
    }

    return result.getValue();
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke refresh token' })
  @ApiResponse({ status: 204 })
  async logout(@Body() dto: RefreshTokenDto): Promise<void> {
    await this.logoutUseCase.execute(dto);
  }
}
