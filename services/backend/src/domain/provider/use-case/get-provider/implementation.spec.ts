import { User } from '~backend/domain/user/entity';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { GetProviderUseCase } from './implementation';

type Payload = Parameters<GetProviderUseCase['execute']>[0];

const mockProviderRepository = {
  getById: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const getProviderUseCase = new GetProviderUseCase(mockProviderRepository);

describe('GetProviderUseCase', () => {
  const payload = {
    id: 456,
  };

  const provider = {
    id: payload.id,
    ownerId: 123,
    description: 'Test Provider',
    name: 'Test',
    slug: 'test',
  };

  it('should get a provider and return it', async () => {
    mockProviderRepository.getById.mockResolvedValueOnce(provider);

    const result = await getProviderUseCase.execute(payload);

    expect(mockProviderRepository.getById).toHaveBeenCalledWith(payload.id);
    expect(result).toEqual(Result.ok(provider));
  });
});
