import { Order } from '~backend/domain/order/entity';
import { IOrderRepository } from '~backend/domain/order/repository/order/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW, INVALID } from '~backend/domain/order/error';

type Payload = Parameters<DeleteOrderUseCase['execute']>[0];

const mockOrderRepository = {
  getByIdAndProviderId: jest.fn(),
  deleteById: jest.fn(),
} as unknown as jest.Mocked<IOrderRepository>;

import { DeleteOrderUseCase } from './implementation';

const deleteOrderUseCase = new DeleteOrderUseCase(mockOrderRepository);

describe('DeleteOrderUseCase', () => {
  const id = 12;
  const providerId = 1;

  test.each([
    [{}, INVALID],
    [{ providerId }, INVALID],
    [{ id }, INVALID],
  ])(
    'should return an error if the provider ID or ID is missing',
    async (payload, expected) => {
      const result = await deleteOrderUseCase.execute(payload as Payload);

      expect(result).toEqual(Result.fail(expected));
    }
  );

  it('should return an error if the order does not exist', async () => {
    mockOrderRepository.getByIdAndProviderId.mockResolvedValue(null);

    const result = await deleteOrderUseCase.execute({
      id,
      providerId,
    });

    expect(result).toEqual(Result.fail(NOT_ALLOW));
    expect(mockOrderRepository.getByIdAndProviderId).toHaveBeenCalledWith(
      id,
      providerId
    );
  });
  it('should delete order', async () => {
    mockOrderRepository.getByIdAndProviderId.mockResolvedValue({
      id,
      providerId,
    } as Order);

    const [error] = await deleteOrderUseCase.execute({
      id,
      providerId,
    });

    expect(error).toBe(null);
    expect(mockOrderRepository.deleteById).toHaveBeenCalledWith(id);
  });
});
