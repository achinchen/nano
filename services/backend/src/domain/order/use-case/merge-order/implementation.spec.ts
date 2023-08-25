import type { Order } from '~backend/domain/order/entity';
import { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import { Result } from '~backend/domain/shared/result';
import { INVALID, NOT_ALLOW } from '~backend/domain/order/error';
import { STATES } from '~backend/domain/order/entity';
import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';

jest.mock('~backend/domain/order/aggregate-root', () => ({
  OrderAggregateRoot: {
    mergeOrder: jest.fn(),
  },
}));

type Payload = Parameters<MergeOrderUseCase['execute']>[0];

const mockOrderRepository = {
  merge: jest.fn(),
  getById: jest.fn(),
} as unknown as jest.Mocked<IOrderRepository>;

const mockOrderAggregateRoot = {
  mergeOrder: OrderAggregateRoot.mergeOrder,
} as unknown as jest.Mocked<typeof OrderAggregateRoot>;

import { MergeOrderUseCase } from './implementation';

const mergeOrderUseCase = new MergeOrderUseCase(mockOrderRepository);

describe('MergeOrderUseCase', () => {
  const currentOrder: Order = {
    id: 50,
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
    state: STATES[0],
  };

  const payload: Payload = {
    id: currentOrder.id,
    providerId: currentOrder.providerId,
    target: {
      serviceHistoryId: 20,
      startAt: new Date('2021-09-02T10:00:00'),
    },
  };

  const { id, ...currentOrderOmitId } = currentOrder;

  const aggregateRootResult = {
    payload: {
      ...currentOrderOmitId,
      state: STATES[3],
      serviceHistoryId: payload.target.serviceHistoryId,
      startAt: payload.target.startAt,
    },
    id,
  };

  const order = {
    ...aggregateRootResult.payload,
    noteUpdatedAt: new Date('2021-09-02T10:00:00'),
    id: 100,
  };
  test.each([
    [{}, INVALID],
    [{ providerId: payload.providerId }, INVALID],
    [{ id: payload.id }, INVALID],
    [{ target: payload.target }, INVALID],
    [{ providerId: payload.providerId, target: payload.target }, INVALID],
  ])(
    'should return an error if the provider ID, ID, target service and target time is missing',
    async (payload, expected) => {
      const result = await mergeOrderUseCase.execute(payload as Payload);

      expect(result).toEqual(Result.fail(expected));
    }
  );

  it('should return a Result object with an error if the provider is not allowed', async () => {
    mockOrderRepository.getById.mockResolvedValueOnce({
      ...currentOrder,
      providerId: 100,
    });
    const [error] = await mergeOrderUseCase.execute(payload);
    expect(error).toBe(NOT_ALLOW);
  });

  it('should return a Result object with an error if there is an error merging the order', async () => {
    mockOrderRepository.getById.mockResolvedValueOnce(currentOrder);
    const errorMessage = 'Error merging order';
    mockOrderAggregateRoot.mergeOrder.mockReturnValueOnce(
      Result.fail(errorMessage)
    );
    const [error] = await mergeOrderUseCase.execute(payload);
    expect(error).toBe(errorMessage);
  });

  it('should return a Result object with the order if the order is created successfully', async () => {
    mockOrderRepository.getById.mockResolvedValueOnce(currentOrder);
    mockOrderAggregateRoot.mergeOrder.mockReturnValueOnce(
      Result.ok(aggregateRootResult)
    );
    mockOrderRepository.merge.mockResolvedValueOnce(order);
    const [error, result] = await mergeOrderUseCase.execute(payload);
    expect(error).toBe(null);
    expect(result).toEqual(order);
  });
});
