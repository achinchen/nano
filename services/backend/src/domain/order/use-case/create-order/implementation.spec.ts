import { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/order/error';
import { STATES } from '~backend/domain/order/entity';
import { OrderAggregateRoot } from '~backend/domain/order/aggregate-root';

jest.mock('~backend/domain/order/aggregate-root', () => ({
  OrderAggregateRoot: {
    createOrder: jest.fn(),
  },
}));

type Payload = Parameters<CreateOrderUseCase['execute']>[0];

const mockOrderRepository = {
  create: jest.fn(),
} as unknown as jest.Mocked<IOrderRepository>;

const mockOrderAggregateRoot = {
  createOrder: OrderAggregateRoot.createOrder,
} as unknown as jest.Mocked<typeof OrderAggregateRoot>;

import { CreateOrderUseCase } from './implementation';

const createOrderUseCase = new CreateOrderUseCase(mockOrderRepository);

describe('CreateOrderUseCase', () => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, ...payloadWithoutUserID } = payload;
    const result = await createOrderUseCase.execute(
      payloadWithoutUserID as Payload
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return a Result object with an error if there is an error creating the order', async () => {
    const errorMessage = 'Error creating order';
    mockOrderAggregateRoot.createOrder.mockReturnValueOnce(
      Result.fail(errorMessage)
    );
    const [error] = await createOrderUseCase.execute(payload);
    expect(error).toBe(errorMessage);
  });

  it('should return a Result object with the order if the order is created successfully', async () => {
    mockOrderAggregateRoot.createOrder.mockReturnValueOnce(
      Result.ok(aggregateRootResult)
    );
    mockOrderRepository.create.mockResolvedValueOnce(order);
    const [error, result] = await createOrderUseCase.execute(payload);
    expect(error).toBe(null);
    expect(result).toEqual(order);
  });
});
