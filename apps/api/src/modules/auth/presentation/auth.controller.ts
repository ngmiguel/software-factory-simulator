import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Role } from '@prisma/client';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case';
import {
  LoginUseCase,
  LogoutUseCase,
  RefreshTokenUseCase,
} from '../application/use-cases/login.use-case';
import { AuthenticatedUser } from '../infrastructure/strategies/jwt.strategy';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Current user JWT payload' })
  me(@CurrentUser() user: AuthenticatedUser): AuthenticatedUser {
    return user;
  }

  @Get('admin/check')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.CEO, Role.CTO)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify RBAC — admin roles only' })
  adminCheck(@CurrentUser() user: AuthenticatedUser) {
    return {
      message: 'Access granted',
      role: user.role,
    };
  }
}
