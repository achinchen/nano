import type { Payload } from '~frontend/types/utils';

export type Action = 'subscribe' | 'emit';
export type EventLog = {
  eventName: EventName;
  serviceName: ServiceName;
};
export type ServiceEventName = string;
export type EventName = string;
export type Listener = (payload?: Payload) => void;
export type ServiceName = string;

export interface IEventHelper {
  getServiceEventName(eventName: EventName): ServiceEventName;
  getEventLog(eventName: EventName, action: Action): EventLog;
}

export interface IEventEmitter extends IEventHelper {
  subscribe(eventName: EventName, listener: Listener): void;
  emit(eventName: EventName, payload?: Payload): void;
  unsubscribe(eventName: EventName, listener: Listener): void;
}

interface ICustomEventMap {
  [key: string]: CustomEvent;
}

declare global {
  interface Document {
    addEventListener<K extends keyof ICustomEventMap>(
      type: K,
      listener: (this: Document, event: ICustomEventMap[K]) => void
    ): void;
    dispatchEvent<K extends keyof ICustomEventMap>(
      event: ICustomEventMap[K]
    ): boolean;
  }
}
