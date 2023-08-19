import EventEmitter from 'node:events';

export interface IDomainEvent {
  eventEmitter: EventEmitter;
  id: string;
}

export class DomainEvent implements IDomainEvent {
  eventEmitter: EventEmitter;
  id: string;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.id = DomainEvent.generateId();
  }

  private static generateHash(number: number) {
    return number.toString(36);
  }

  private static generateId() {
    return `${DomainEvent.generateHash(Date.now())}${DomainEvent.generateHash(
      Math.random()
    )}`;
  }

  emit(name, payload) {
    this.eventEmitter.emit(name, payload);
  }

  subscribe(name, listener) {
    this.eventEmitter.on(name, listener);
  }

  unsubscribe(name, listener) {
    this.eventEmitter.off(name, listener);
  }
}
