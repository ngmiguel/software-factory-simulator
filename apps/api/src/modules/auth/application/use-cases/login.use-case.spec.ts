import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { UniqueEntityId } from '../../../../shared/domain/unique-entity-id';
import { LoginUseCase } from './login.use-case';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { PasswordHasherService } from '../../infrastructure/services/password-hasher.service';
import { JwtTokenService } from '../../infrastructure/services/jwt-token.service';
import { Email } from '../../domain/value-objects/email.vo';
import { User } from '../../domain/entities/user.entity';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;

  const mockUser = User.reconstitute(
    {
      email: Email.create('cto@test.com').getValue(),
      passwordHash: 'hashed',
      firstName: 'Jean',
      lastName: 'Dupont',
      role: Role.CTO,
      isActive: true,
      emailVerified: false,
    },
    new UniqueEntityId('user-1'),
  );

  const mockRepository = {
    findByEmail: jest.fn().mockResolvedValue(mockUser),
    save: jest.fn().mockResolvedValue(mockUser),
    findById: jest.fn(),
    existsByEmail: jest.fn(),
  };

  const mockHasher = {
    compare: jest.fn().mockResolvedValue(true),
    hash: jest.fn(),
  };

  const mockJwt = {
    generateTokenPair: jest.fn().mockResolvedValue({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
      expiresIn: '15m',
    }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockRepository.findByEmail.mockResolvedValue(mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginUseCase,
        { provide: USER_REPOSITORY, useValue: mockRepository },
        { provide: PasswordHasherService, useValue: mockHasher },
        { provide: JwtTokenService, useValue: mockJwt },
      ],
    }).compile();

    useCase = module.get(LoginUseCase);
  });

  it('should login successfully with valid credentials', async () => {
    const result = await useCase.execute({
      email: 'cto@test.com',
      password: 'password123',
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().accessToken).toBe('access_token');
    expect(mockRepository.save).toHaveBeenCalled();
  });

  it('should fail with invalid credentials', async () => {
    mockRepository.findByEmail.mockResolvedValue(null);

    const result = await useCase.execute({
      email: 'wrong@test.com',
      password: 'password123',
    });

    expect(result.isFailure).toBe(true);
  });
});
