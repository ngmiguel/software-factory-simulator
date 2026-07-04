import { Role, User as PrismaUser } from '@prisma/client';
import { UniqueEntityId } from '../../../../shared/domain/unique-entity-id';
import { Email } from '../../domain/value-objects/email.vo';
import { User } from '../../domain/entities/user.entity';

export class UserMapper {
  static toDomain(raw: PrismaUser): User {
    const emailResult = Email.create(raw.email);
    if (emailResult.isFailure) {
      throw new Error(`Corrupt user email in database: ${raw.email}`);
    }

    return User.reconstitute(
      {
        email: emailResult.getValue(),
        passwordHash: raw.passwordHash,
        firstName: raw.firstName,
        lastName: raw.lastName,
        role: raw.role as Role,
        isActive: raw.isActive,
        emailVerified: raw.emailVerified,
        lastLoginAt: raw.lastLoginAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(user: User): {
    id: string;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: Role;
    isActive: boolean;
    emailVerified: boolean;
    lastLoginAt: Date | null;
  } {
    return {
      id: user.id.toString(),
      email: user.email.value,
      passwordHash: user.passwordHash,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
      emailVerified: user.emailVerified,
      lastLoginAt: user.lastLoginAt ?? null,
    };
  }
}
