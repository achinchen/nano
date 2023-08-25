/* eslint-disable import/order */
import { DomainEvent } from '~backend/domain/shared/event';
import {
  DEFAULT_STATE,
  REQUESTED_STATE,
  PERMITTED_STATE,
  REJECTED_STATE,
} from './constants';
import {
  ORDER_CREATED,
  ORDER_REQUESTED,
  ORDER_PERMITTED,
  ORDER_REJECTED,
  ORDER_NOTE_UPDATED,
  ORDER_SERVICE_HISTORY_UPDATED,
  ORDER_MERGED,
} from '~backend/domain/order/event';
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

import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';

type CreateOrderPayload = Parameters<typeof OrderAggregateRoot.createOrder>[0];
type RequestOrderPayload = Parameters<
  typeof OrderAggregateRoot.requestOrder
>[0];
type PermitOrderPayload = Parameters<typeof OrderAggregateRoot.permitOrder>[0];
type RejectOrderPayload = Parameters<typeof OrderAggregateRoot.rejectOrder>[0];
type UpdateOrderNotePayload = Parameters<
  typeof OrderAggregateRoot.updateOrderNote
>[0];

jest.spyOn(console, 'info').mockImplementation(() => null);

describe('OrderAggregateRoot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockOrder = {
    providerId: 1,
    serviceHistoryId: 10,
    userId: 20,
    serviceId: 30,
    field: {
      name: '螞蟻怪',
    },
    note: '',
    attendee: 10,
    startAt: new Date('2021-09-01T10:00:00'),
    noteUpdatedAt: new Date('2021-09-01T10:00:00'),
    queueDateTime: [],
    state: DEFAULT_STATE,
    id: 1,
  };

  describe('createOrder', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, state, ...payload } = mockOrder;

    it('should return an error if any required field is missing', () => {
      const [error] = OrderAggregateRoot.createOrder({
        ...payload,
        note: null,
      } as CreateOrderPayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload', () => {
      const [error, result] = OrderAggregateRoot.createOrder(payload);

      const expectedPayload = { ...payload, state: DEFAULT_STATE };
      expect(error).toBe(null);
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        ORDER_CREATED,
        expectedPayload
      );
    });
  });

  describe('requestOrder', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, state, ...payload } = mockOrder;

    it('should return an error if any required field is missing', () => {
      const [error] = OrderAggregateRoot.requestOrder({
        ...payload,
        note: null,
      } as RequestOrderPayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload', () => {
      const [error, result] = OrderAggregateRoot.requestOrder(payload);

      const expectedPayload = { ...payload, state: REQUESTED_STATE };
      expect(error).toBe(null);
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        ORDER_REQUESTED,
        expectedPayload
      );
    });
  });

  describe('permitOrder', () => {
    const payload = {
      id: mockOrder.id,
      providerId: mockOrder.providerId,
    };

    it('should return an error if any required field is missing', () => {
      const [error] = OrderAggregateRoot.permitOrder({
        ...payload,
        id: null,
      } as PermitOrderPayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload', () => {
      const [error, result] = OrderAggregateRoot.permitOrder(payload);

      const expectedPayload = { ...payload, state: PERMITTED_STATE };
      expect(error).toBe(null);
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        ORDER_PERMITTED,
        expectedPayload
      );
    });
  });

  describe('rejectOrder', () => {
    const payload = {
      id: mockOrder.id,
      providerId: mockOrder.providerId,
    };

    it('should return an error if any required field is missing', () => {
      const [error] = OrderAggregateRoot.rejectOrder({
        ...payload,
        id: null,
      } as RejectOrderPayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload', () => {
      const [error, result] = OrderAggregateRoot.rejectOrder(payload);

      const expectedPayload = { ...payload, state: REJECTED_STATE };
      expect(error).toBe(null);
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        ORDER_REJECTED,
        expectedPayload
      );
    });
  });

  describe('updateOrderNote', () => {
    const payload = {
      id: mockOrder.id,
      providerId: mockOrder.providerId,
      note: 'new note',
    };

    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return an error if any required field is missing', () => {
      const [error] = OrderAggregateRoot.updateOrderNote({
        ...payload,
        id: null,
      } as UpdateOrderNotePayload);

      expect(error).not.toBe(null);
      expect(mockEventEmitter.emit).not.toHaveBeenCalled();
    });

    it('should return a result with the correct payload', () => {
      const [error, result] = OrderAggregateRoot.updateOrderNote(payload);
      const expectedPayload = { ...payload, noteUpdatedAt: new Date() };

      expect(error).toBe(null);
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        ORDER_NOTE_UPDATED,
        expectedPayload
      );
    });
  });

  describe('updateOrderServiceHistory', () => {
    const payload = {
      id: mockOrder.id,
      providerId: mockOrder.providerId,
      serviceHistoryId: 200,
    };

    it('should return a result', () => {
      const [error, result] =
        OrderAggregateRoot.updateOrderServiceHistory(payload);
      const expectedPayload = payload;

      expect(error).toBe(null);
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        ORDER_SERVICE_HISTORY_UPDATED,
        expectedPayload
      );
    });
  });

  describe('mergeOrder', () => {
    const payload = {
      target: {
        serviceHistoryId: 300,
        startAt: new Date('2021-09-10T10:00:00'),
      },
      payload: mockOrder,
    };

    it('should return a result', () => {
      const [error, result] = OrderAggregateRoot.mergeOrder(payload);

      const {
        payload: { id, ...restPayload },
        target,
      } = payload;
      const expectedPayload = {
        payload: {
          ...restPayload,
          serviceHistoryId: target.serviceHistoryId,
          startAt: target.startAt,
          state: PERMITTED_STATE,
        },
        id,
      };

      expect(error).toBe(null);
      expect(result).toMatchObject(expectedPayload);
      expect(mockEventEmitter.emit).toHaveBeenCalledWith(
        ORDER_MERGED,
        expectedPayload
      );
    });
  });
});
