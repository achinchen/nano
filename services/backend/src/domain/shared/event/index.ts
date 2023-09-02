import EventEmitter from 'node:events';
import { logger } from '~backend/domain/shared/logger';
import { backupEvent } from './backup';

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
    this.log(name, payload);
    backupEvent({ name, payload, id: this.id });
  }

  subscribe(name, listener) {
    this.eventEmitter.on(name, listener);
  }

  unsubscribe(name, listener) {
    this.eventEmitter.off(name, listener);
  }

  private log(name, payload): void {
    logger.info('Domain Event Created', { name, payload, id: this.id });
  }
}
