import type { Payload } from '~frontend/types/utils';
import type {
  Action,
  EventLog,
  EventName,
  Listener,
  ServiceEventName,
  ServiceName,
  IEventEmitter,
  IEventHelper,
} from '~frontend/utils/event/types';
import { getIsProduction } from '~frontend/utils/env/get-is-production';

export const createEventHelper = (serviceName: ServiceName): IEventHelper => {
  const getServiceEventName = (eventName: EventName): ServiceEventName => {
    return `${serviceName}:${eventName}`;
  };

  const getEventLog = (eventName: EventName, action: Action): EventLog => {
    return {
      eventName: `${eventName}:${action}`,
      serviceName,
    };
  };

  return { getServiceEventName, getEventLog };
};

export const createEventEmitter = (serviceName: ServiceName): IEventEmitter => {
  const helper = createEventHelper(serviceName);
  const { getServiceEventName } = helper;

  const subscribe = (eventName: string, listener: Listener): void => {
    const serviceEventName = getServiceEventName(eventName);
    document.addEventListener(serviceEventName, (event: CustomEvent) => {
      listener(event.detail);
    });
    if (getIsProduction()) return;
    console.info('Subscribe to browser event', {
      detail: { eventName: serviceEventName },
    });
  };

  const emit = (eventName: string, payload: Payload = null): void => {
    const serviceEventName = getServiceEventName(eventName);
    const customEvent = new CustomEvent(serviceEventName, { detail: payload });
    document.dispatchEvent(customEvent);
    if (getIsProduction()) return;
    console.info('Emit a browser event', {
      detail: { eventName: serviceEventName, payload },
    });
  };

  const unsubscribe = (eventName: string, listener: Listener): void => {
    const serviceEventName = getServiceEventName(eventName);
    document.removeEventListener(serviceEventName, listener);
  };

  return { ...helper, subscribe, emit, unsubscribe };
};

export const eventEmitter = createEventEmitter('web');
