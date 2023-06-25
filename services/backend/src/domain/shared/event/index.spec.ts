import EventEmitter from 'node:events';
import { DomainEvent } from './index';

describe('DomainEvent', () => {
  let domainEvent: DomainEvent;
  const eventListener = jest.fn();

  beforeEach(() => {
    domainEvent = new DomainEvent();
    jest.clearAllMocks();
  });

  afterEach(() => {
    domainEvent.unsubscribe('testEvent', eventListener);
  });

  test('emit and subscribe to an event', () => {
    const payload = { message: 'Test event payload' };

    domainEvent.subscribe('testEvent', eventListener);
    domainEvent.emit('testEvent', payload);

    expect(eventListener).toHaveBeenCalledWith(payload);
  });

  test('unsubscribe from an event', () => {
    const payload = { message: 'Test event payload' };

    domainEvent.subscribe('testEvent', eventListener);
    domainEvent.unsubscribe('testEvent', eventListener);
    domainEvent.emit('testEvent', payload);

    expect(eventListener).not.toHaveBeenCalled();
  });

  test('have a unique ID', () => {
    const idRegex = /[a-z0-9]\.[a-z0-9]/;

    expect(domainEvent.id).toMatch(idRegex);
  });

  test('use EventEmitter for event handling', () => {
    expect(domainEvent.eventEmitter).toBeInstanceOf(EventEmitter);
  });
});
