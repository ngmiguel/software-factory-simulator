import { Role } from '@prisma/client';
import { AggregateRoot } from '../../../../shared/domain/aggregate-root';
import { UniqueEntityId } from '../../../../shared/domain/unique-entity-id';
import { Email } from '../value-objects/email.vo';
import { UserRegisteredEvent } from '../events/user-registered.event';

export interface UserProps {
  email: Email;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: Role;
  isActive: boolean;
  emailVerified: boolean;
  lastLoginAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends AggregateRoot<UserProps> {
  private props: UserProps;
  private readonly _id: UniqueEntityId;

  private constructor(props: UserProps, id?: UniqueEntityId) {
    super();
    this._id = id ?? new UniqueEntityId();
    this.props = props;
  }

  static create(
    props: Omit<UserProps, 'isActive' | 'emailVerified' | 'lastLoginAt'>,
    id?: UniqueEntityId,
  ): User {
    const user = new User(
      {
        ...props,
        isActive: true,
        emailVerified: false,
        lastLoginAt: null,
      },
      id,
    );

    user.addDomainEvent(new UserRegisteredEvent(user._id.toString(), user.email.value));
    return user;
  }

  static reconstitute(props: UserProps, id: UniqueEntityId): User {
    return new User(props, id);
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get email(): Email {
    return this.props.email;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get role(): Role {
    return this.props.role;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get emailVerified(): boolean {
    return this.props.emailVerified;
  }

  get lastLoginAt(): Date | null | undefined {
    return this.props.lastLoginAt;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  recordLogin(): void {
    this.props.lastLoginAt = new Date();
  }

  verifyPassword(
    plainPassword: string,
    compareFn: (plain: string, hash: string) => Promise<boolean>,
  ): Promise<boolean> {
    return compareFn(plainPassword, this.props.passwordHash);
  }
}
