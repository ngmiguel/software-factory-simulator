import { ValueObject } from '../../../../shared/domain/value-object';
import { Result } from '../../../../shared/application/result';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  private constructor(props: EmailProps) {
    super(props);
  }

  static create(raw: string): Result<Email> {
    const value = raw.trim().toLowerCase();

    if (!Email.EMAIL_REGEX.test(value)) {
      return Result.fail(new Error('Invalid email format'));
    }

    return Result.ok(new Email({ value }));
  }

  get value(): string {
    return this.props.value;
  }
}
