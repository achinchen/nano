import { createEventEmitter } from '.';

jest.mock('.', () => ({
  ...jest.requireActual('.'),
  initLogger: () => ({
    info: jest.fn(),
  }),
}));

jest.mock('~frontend/utils/env/get-is-production', () => ({
  getIsProduction: () => true,
}));

describe('EventEmitter', () => {
  const mockService = 'mock-service';
  const mockEventName = 'mock:custom:action';
  const mockListener = jest.fn();

  Object.defineProperty(global, 'document', {
    value: {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    },
    writable: true,
  });

  console.info = () => {
    /* */
  };

  const setupEventEmitter = () => {
    const eventEmitter = createEventEmitter(mockService);
    eventEmitter.subscribe(mockEventName, mockListener);

    return eventEmitter;
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('EventEmitter.subscribe', () => {
    it('should add a message event listener to document', () => {
      setupEventEmitter();

      expect(document.addEventListener).toHaveBeenCalled();
    });

    it('should call listener', () => {
      setupEventEmitter();

      const mockCustomEvent = new CustomEvent(mockEventName, {
        detail: 'test-data',
      });
      (document.addEventListener as jest.Mock).mock.calls[0][1](
        mockCustomEvent
      );
      expect(mockListener).toHaveBeenCalledWith(mockCustomEvent.detail);
    });
  });

  describe('EventEmitter.emit', () => {
    it('should call document.dispatchEvent with payload', () => {
      const eventEmitter = createEventEmitter(mockService);
      const mockPayload = 'test-payload';
      eventEmitter.emit(mockEventName, mockPayload);
      const mockArgument = new CustomEvent(mockEventName, {
        detail: mockPayload,
      });

      expect(document.dispatchEvent).toHaveBeenCalledWith(mockArgument);
    });
  });

  describe('EventEmitter.unsubscribe', () => {
    it('should remove custom event listener from target', () => {
      const eventEmitter = setupEventEmitter();
      eventEmitter.unsubscribe(mockEventName, mockListener);
      expect(document.removeEventListener).toHaveBeenCalled();
    });
  });
});
