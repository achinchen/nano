import type {
  Action,
  EventLog,
  EventName,
  Listener,
  Payload,
  ServiceEventName,
  ServiceName,
  IEventEmitter,
  IEventHelper,
} from '~frontend/utils/event/types';

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
    console.info('Subscribe to browser event', {
      detail: { eventName: serviceEventName },
    });
  };

  const emit = (eventName: string, payload?: Payload): void => {
    const serviceEventName = getServiceEventName(eventName);
    const customEvent = new CustomEvent(serviceEventName, { detail: payload });
    document.dispatchEvent(customEvent);
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
