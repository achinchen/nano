import { DomainEvent } from './index';

type DomainEventPayload = {
  id: string;
  name: string;
  payload: unknown;
};

const events: DomainEventPayload[] = [];

export const backupEvent = (eventPayload: DomainEventPayload) => {
  events.push(eventPayload);
};

export const replayEvents = async (events: DomainEventPayload[]) => {
  const domainEvent = new DomainEvent();
  events.forEach(({ name, payload }) => {
    domainEvent.emit(name, payload);
  });
};

export const getEvents = (): DomainEventPayload[] => events;
