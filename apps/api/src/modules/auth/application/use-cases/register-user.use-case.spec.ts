import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { RegisterUserUseCase } from './register-user.use-case';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { PasswordHasherService } from '../../infrastructure/services/password-hasher.service';
import { Email } from '../../domain/value-objects/email.vo';
import { User } from '../../domain/entities/user.entity';

describe('RegisterUserUseCase', () => {
  let useCase: RegisterUserUseCase;
  const mockRepository = {
    existsByEmail: jest.fn(),
    save: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
  };
  const mockHasher = {
    hash: jest.fn().mockResolvedValue('hashed_password'),
    compare: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        { provide: USER_REPOSITORY, useValue: mockRepository },
        { provide: PasswordHasherService, useValue: mockHasher },
      ],
    }).compile();

    useCase = module.get(RegisterUserUseCase);
  });

  it('should register a new user successfully', async () => {
    mockRepository.existsByEmail.mockResolvedValue(false);
    mockRepository.save.mockImplementation(async (user: User) => user);

    const result = await useCase.execute({
      email: 'cto@test.com',
      password: 'password123',
      firstName: 'Jean',
      lastName: 'Dupont',
      role: Role.CTO,
    });

    expect(result.isSuccess).toBe(true);
    expect(result.getValue().email).toBe('cto@test.com');
    expect(mockHasher.hash).toHaveBeenCalledWith('password123');
  });

  it('should fail when email already exists', async () => {
    mockRepository.existsByEmail.mockResolvedValue(true);

    const result = await useCase.execute({
      email: 'existing@test.com',
      password: 'password123',
      firstName: 'Jean',
      lastName: 'Dupont',
    });

    expect(result.isFailure).toBe(true);
    expect(result.getError().message).toBe('Email already registered');
  });

  it('should fail with invalid email', async () => {
    const result = await useCase.execute({
      email: 'invalid-email',
      password: 'password123',
      firstName: 'Jean',
      lastName: 'Dupont',
    });

    expect(result.isFailure).toBe(true);
  });
});

describe('Email Value Object', () => {
  it('should create valid email', () => {
    const result = Email.create('User@Test.COM');
    expect(result.isSuccess).toBe(true);
    expect(result.getValue().value).toBe('user@test.com');
  });

  it('should reject invalid email', () => {
    const result = Email.create('not-an-email');
    expect(result.isFailure).toBe(true);
  });
});
