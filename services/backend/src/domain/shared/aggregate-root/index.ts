import { DomainEvent } from '~backend/domain/shared/event';

export abstract class AggregateRoot {
  domainEvent: DomainEvent;

  constructor() {
    this.domainEvent = new DomainEvent();
  }

  protected addDomainEvent(name, payload): void {
    this.domainEvent.emit(name, payload);
  }
}
