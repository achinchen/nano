import { DomainEvent } from '~backend/domain/shared/event';

export abstract class AggregateRoot {
  domainEvent: DomainEvent;

  constructor() {
    this.domainEvent = new DomainEvent();
  }

  get id() {
    return this.domainEvent.id;
  }

  protected addDomainEvent(name, payload): void {
    this.domainEvent.emit(name, payload);
    this.log(name, payload);
  }

  private log(name, payload): void {
    console.info(
      '[Domain Event Created]',
      JSON.stringify({ name, payload, id: this.id })
    );
  }
}
