import { DomainEvent } from '../../../../shared/domain/domain-event';

export class UserRegisteredEvent extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly email: string,
  ) {
    super(aggregateId);
  }

  get eventName(): string {
    return 'user.registered';
  }
}
