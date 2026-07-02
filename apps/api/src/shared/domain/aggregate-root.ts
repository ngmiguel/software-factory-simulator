import { DomainEvent } from './domain-event';

export abstract class AggregateRoot<T> {
  private _domainEvents: DomainEvent[] = [];

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  public pullDomainEvents(): DomainEvent[] {
    const events = [...this._domainEvents];
    this._domainEvents = [];
    return events;
  }

  public get domainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }
}
