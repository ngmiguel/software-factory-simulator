import { Inject, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import { Result } from '../../../../shared/application/result';
import { Email } from '../../domain/value-objects/email.vo';
import { User } from '../../domain/entities/user.entity';
import {
  IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import { PasswordHasherService } from '../../infrastructure/services/password-hasher.service';
import { AuthUserResponse, RegisterUserCommand } from '../commands/register-user.command';

@Injectable()
export class RegisterUserUseCase implements IUseCase<
  RegisterUserCommand,
  Result<AuthUserResponse>
> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly passwordHasher: PasswordHasherService,
  ) {}

  async execute(command: RegisterUserCommand): Promise<Result<AuthUserResponse>> {
    const emailResult = Email.create(command.email);
    if (emailResult.isFailure) {
      return Result.fail(emailResult.getError());
    }

    const email = emailResult.getValue();
    const exists = await this.userRepository.existsByEmail(email.value);
    if (exists) {
      return Result.fail(new Error('Email already registered'));
    }

    const passwordHash = await this.passwordHasher.hash(command.password);

    const user = User.create({
      email,
      passwordHash,
      firstName: command.firstName.trim(),
      lastName: command.lastName.trim(),
      role: command.role ?? Role.CTO,
    });

    const saved = await this.userRepository.save(user);

    return Result.ok({
      id: saved.id.toString(),
      email: saved.email.value,
      firstName: saved.firstName,
      lastName: saved.lastName,
      role: saved.role,
      createdAt: saved.createdAt ?? new Date(),
    });
  }
}
