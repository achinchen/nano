import { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW, INVALID } from '~backend/domain/order/error';
import { STATES } from '~backend/domain/order/entity';
import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';

jest.mock('~backend/domain/order/aggregate-root', () => ({
  OrderAggregateRoot: {
    rejectOrder: jest.fn(),
  },
}));

type Payload = Parameters<RejectOrderUseCase['execute']>[0];

const mockOrderRepository = {
  update: jest.fn(),
  getById: jest.fn(),
} as unknown as jest.Mocked<IOrderRepository>;

const mockOrderAggregateRoot = {
  rejectOrder: OrderAggregateRoot.rejectOrder,
} as unknown as jest.Mocked<typeof OrderAggregateRoot>;

import { RejectOrderUseCase } from './implementation';

const rejectOrderUseCase = new RejectOrderUseCase(mockOrderRepository);

describe('RejectOrderUseCase', () => {
  const payload: Payload = {
    providerId: 1,
    id: 10,
  };

  const aggregateRootResult = {
    ...payload,
    state: STATES[2],
  };

  const mockOrder = {
    id: payload.id,
    providerId: payload.providerId,
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

  test.each([
    [{}, INVALID],
    [{ providerId: payload.providerId }, INVALID],
    [{ id: payload.id }, INVALID],
  ])(
    'should return an error if the provider ID or ID is missing',
    async (payload, expected) => {
      const result = await rejectOrderUseCase.execute(payload as Payload);

      expect(result).toEqual(Result.fail(expected));
    }
  );

  it('should return an error if the order does not exist', async () => {
    mockOrderRepository.getById.mockResolvedValue(null);

    const result = await rejectOrderUseCase.execute(payload);

    expect(result).toEqual(Result.fail(NOT_ALLOW));
    expect(mockOrderRepository.getById).toHaveBeenCalledWith(payload.id);
  });

  it('should return an error if the order.providerId does not match', async () => {
    mockOrderRepository.getById.mockResolvedValueOnce({
      ...mockOrder,
      providerId: 2,
    });

    const result = await rejectOrderUseCase.execute(payload);

    expect(result).toEqual(Result.fail(NOT_ALLOW));
    expect(mockOrderRepository.getById).toHaveBeenCalledWith(payload.id);
  });

  it('should return a Result object with an error if there is an error rejecting the order', async () => {
    mockOrderRepository.getById.mockResolvedValueOnce(mockOrder);

    const errorMessage = 'Error rejecting order';
    mockOrderAggregateRoot.rejectOrder.mockReturnValueOnce(
      Result.fail(errorMessage)
    );
    const [error] = await rejectOrderUseCase.execute(payload);
    expect(error).toBe(errorMessage);
  });

  it('should return a Result object with true if the order is rejected successfully', async () => {
    mockOrderRepository.getById.mockResolvedValueOnce(mockOrder);
    mockOrderAggregateRoot.rejectOrder.mockReturnValueOnce(
      Result.ok(aggregateRootResult)
    );
    mockOrderRepository.update.mockResolvedValueOnce(true);

    const [error, result] = await rejectOrderUseCase.execute(payload);
    expect(error).toBe(null);
    expect(result).toEqual(true);
  });
});
