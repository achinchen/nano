import { DomainEvent } from '~backend/domain/shared/event';
import {
  SERVICE_CREATED,
  SERVICE_UPDATED,
  HAS_ORDER_SERVICE_UPDATED,
} from '~backend/domain/service/event';
type EventEmitter = typeof DomainEvent.prototype.eventEmitter;
const mockEventEmitter = { emit: jest.fn() } as unknown as EventEmitter;

class MockDomainEvent {
  eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = mockEventEmitter;
  }

  emit(name, payload) {
    this.eventEmitter.emit(name, payload);
  }
}

jest.mock('~backend/domain/shared/event', () => ({
  DomainEvent: MockDomainEvent,
}));

import { ServiceAggregateRoot, FIRST_VERSION } from '.';

type CreateServicePayload = Parameters<
  typeof ServiceAggregateRoot.createService
>[0];

type UpdateServicePayload = Parameters<
  typeof ServiceAggregateRoot.updateService
>[0];

type UpdateServiceHasOrderPayload = Parameters<
  typeof ServiceAggregateRoot.updateServiceHasOrder
>[0];

jest.spyOn(console, 'info').mockImplementation(() => null);

describe('ServiceAggregateRoot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createService', () => {
    it('should return an error if any required field is missing', () => {
      const [error] = ServiceAggregateRoot.createService({
        name: 'Test Service',
        description: '',
      } as CreateServicePayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload', () => {
      const payload = {
        name: 'Test Service',
        description: 'A test service',
      } as CreateServicePayload;
      const [error, result] = ServiceAggregateRoot.createService(payload);

      const expectedPayload = { ...payload, version: FIRST_VERSION };
      expect(error).toBe(null);
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        SERVICE_CREATED,
        expectedPayload
      );
    });
  });

  describe('updateService', () => {
    it('should return an error if any required field is missing', () => {
      const [error] = ServiceAggregateRoot.updateService({
        name: 'Test Service',
        description: '',
      } as UpdateServicePayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload', () => {
      const payload = {
        name: 'Test Service',
        description: 'A test service',
      } as UpdateServicePayload;
      const [error, result] = ServiceAggregateRoot.updateService(payload);

      expect(error).toBe(null);
      expect(result).toMatchObject(payload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        SERVICE_UPDATED,
        payload
      );
    });
  });

  describe('updateServiceHasOrder', () => {
    it('should return an error if any required field is missing', () => {
      const [error] = ServiceAggregateRoot.updateServiceHasOrder({
        name: 'Test Service',
        description: '',
      } as UpdateServiceHasOrderPayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload', () => {
      const payload = {
        name: 'Test Service',
        description: 'A test service',
      } as UpdateServiceHasOrderPayload;

      const [error, result] =
        ServiceAggregateRoot.updateServiceHasOrder(payload);

      expect(error).toBe(null);
      expect(result).toMatchObject(payload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        HAS_ORDER_SERVICE_UPDATED,
        payload
      );
    });
  });
});
