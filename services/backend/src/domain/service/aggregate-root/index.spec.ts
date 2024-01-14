import { DomainEvent } from '~backend/domain/shared/event';
import {
  SERVICE_CREATED,
  SERVICE_UPDATED,
  HAS_ORDER_SERVICE_UPDATED,
} from '~backend/domain/service/event';
import { setDateTime, getPlainPeriodTimes } from '~backend/domain/shared/utils';
import { UNCHANGED_CREATE_PAYLOAD } from './constants';

type EventEmitter = typeof DomainEvent.prototype.eventEmitter;
import { providerRepository } from '~backend/domain/provider/repository/provider';
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

jest.mock('~backend/domain/provider/repository/provider', () => ({
  providerRepository: {
    getDetailById: jest.fn(),
  },
}));

const mockProviderRepository = providerRepository as jest.Mocked<
  typeof providerRepository
>;

import { ServiceAggregateRoot } from '.';

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
    it('should return an error if any required field is missing', async () => {
      const [error] = await ServiceAggregateRoot.createService({
        name: 'Test Service',
        description: '',
      } as CreateServicePayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload when allday is false', async () => {
      const payload = {
        providerId: 1,
        allday: false,
        name: 'Test Service',
        description: 'A test service',
        startAt: '2024-01-01T10:00:00',
        endAt: '2024-07-31T11:00:00',
      } as unknown as CreateServicePayload;

      mockProviderRepository.getDetailById.mockResolvedValue({
        openAt: new Date('2024-01-01T10:00:00'),
        openDuration: 600,
      } as Awaited<ReturnType<(typeof providerRepository)['getDetailById']>>);
      const [error, result] = await ServiceAggregateRoot.createService(payload);

      const expectedPayload = {
        ...payload,
        ...UNCHANGED_CREATE_PAYLOAD,
        startAt: new Date(payload.startAt),
        endAt: new Date(payload.endAt),
      };

      expect(error).toBe(null);
      expect(mockProviderRepository.getDetailById).toHaveBeenCalledWith(
        payload.providerId
      );
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        SERVICE_CREATED,
        expectedPayload
      );
    });

    it('should return a result with the correct payload when allday is true', async () => {
      const payload = {
        providerId: 1,
        allday: true,
        name: 'Test Service',
        description: 'A test service',
        startAt: '2024-01-01T10:00:00',
        endAt: '2024-07-31T10:00:00',
      } as unknown as CreateServicePayload;

      const detail = {
        openAt: new Date('2024-01-01T10:00:00'),
        openDuration: 600,
      };

      mockProviderRepository.getDetailById.mockResolvedValue(
        detail as Awaited<
          ReturnType<(typeof providerRepository)['getDetailById']>
        >
      );
      const [error, result] = await ServiceAggregateRoot.createService(payload);

      const [startTime, endTime] = getPlainPeriodTimes(
        detail.openAt,
        detail.openDuration
      );

      const expectedPayload = {
        ...payload,
        ...UNCHANGED_CREATE_PAYLOAD,
        startAt: setDateTime(payload.startAt, startTime),
        endAt: setDateTime(payload.endAt, endTime),
      };

      expect(error).toBe(null);
      expect(mockProviderRepository.getDetailById).toHaveBeenCalledWith(
        payload.providerId
      );
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
