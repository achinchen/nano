import { Service } from '~backend/domain/service/entity';
import { IServiceRepository } from '~backend/domain/service/repository/service/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW, INVALID } from '~backend/domain/service/error';

type Payload = Parameters<CloseServiceUseCase['execute']>[0];

const mockServiceRepository = {
  getByIdAndProviderId: jest.fn(),
  deleteById: jest.fn(),
} as unknown as jest.Mocked<IServiceRepository>;

import { CloseServiceUseCase } from './implementation';

const closeServiceUseCase = new CloseServiceUseCase(mockServiceRepository);

describe('CloseServiceUseCase', () => {
  const id = 12;
  const providerId = 1;

  test.each([
    [{}, INVALID],
    [{ providerId }, INVALID],
    [{ id }, INVALID],
  ])(
    'should return an error if the provider ID or ID is missing',
    async (payload, expected) => {
      const result = await closeServiceUseCase.execute(payload as Payload);

      expect(result).toEqual(Result.fail(expected));
    }
  );

  it('should return an error if the service does not exist', async () => {
    mockServiceRepository.getByIdAndProviderId.mockResolvedValue(null);

    const result = await closeServiceUseCase.execute({
      id,
      providerId,
    });

    expect(result).toEqual(Result.fail(NOT_ALLOW));
    expect(mockServiceRepository.getByIdAndProviderId).toHaveBeenCalledWith(
      id,
      providerId
    );
  });
  it('should close service', async () => {
    mockServiceRepository.getByIdAndProviderId.mockResolvedValue({
      id,
      providerId,
    } as Service);

    const [error] = await closeServiceUseCase.execute({
      id,
      providerId,
    });

    expect(error).toBe(null);
    expect(mockServiceRepository.deleteById).toHaveBeenCalledWith(id);
  });
});
