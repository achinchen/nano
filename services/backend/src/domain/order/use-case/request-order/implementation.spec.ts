import { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/order/error';
import { STATES } from '~backend/domain/order/entity';
import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';

jest.mock('~backend/domain/order/aggregate-root', () => ({
  OrderAggregateRoot: {
    requestOrder: jest.fn(),
  },
}));

type Payload = Parameters<RequestOrderUseCase['execute']>[0];

const mockOrderRepository = {
  create: jest.fn(),
} as unknown as jest.Mocked<IOrderRepository>;

const mockOrderAggregateRoot = {
  requestOrder: OrderAggregateRoot.requestOrder,
} as unknown as jest.Mocked<typeof OrderAggregateRoot>;

import { RequestOrderUseCase } from './implementation';

const requestOrderUseCase = new RequestOrderUseCase(mockOrderRepository);

describe('RequestOrderUseCase', () => {
  const payload: Payload = {
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
    queueDateTime: [],
  };

  const aggregateRootResult = {
    ...payload,
    state: STATES[0],
  };

  const order = {
    ...aggregateRootResult,
    noteUpdatedAt: new Date('2021-09-02T10:00:00'),
    id: 1,
  };

  it('should return a Result.fail if the payload does not have a userId', async () => {
    const { userId: _, ...payloadWithoutUserID } = payload;
    const result = await requestOrderUseCase.execute(
      payloadWithoutUserID as Payload
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return a Result object with an error if there is an error creating the order', async () => {
    const errorMessage = 'Error creating order';
    mockOrderAggregateRoot.requestOrder.mockReturnValueOnce(
      Result.fail(errorMessage)
    );
    const [error] = await requestOrderUseCase.execute(payload);
    expect(error).toBe(errorMessage);
  });

  it('should return a Result object with the order if the order is created successfully', async () => {
    mockOrderAggregateRoot.requestOrder.mockReturnValueOnce(
      Result.ok(aggregateRootResult)
    );
    mockOrderRepository.create.mockResolvedValueOnce(order);
    const [error, result] = await requestOrderUseCase.execute(payload);
    expect(error).toBe(null);
    expect(result).toEqual(order);
  });
});
