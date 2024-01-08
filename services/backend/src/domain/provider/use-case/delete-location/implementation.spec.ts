import { ILocationRepository } from '~backend/domain/provider/repository/location/abstract';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/provider/error';
import { DeleteLocationUseCase } from './implementation';

type Payload = Parameters<DeleteLocationUseCase['execute']>[0];

const mockProviderRepository = {
  getByOwnerId: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const mockLocationRepository = {
  getById: jest.fn(),
  deleteById: jest.fn(),
} as unknown as jest.Mocked<ILocationRepository>;

const deleteLocationUseCase = new DeleteLocationUseCase(
  mockProviderRepository,
  mockLocationRepository
);

describe('DeleteLocationUseCase', () => {
  const payload: Payload = {
    id: 789,
    userId: 123,
  };

  const provider = {
    id: 456,
    ownerId: payload.userId,
    description: 'Test Provider',
    name: 'Test',
    slug: 'test',
    avatarUrl: 'https://example.com/avatar.png',
    SNSId: '123456789',
    email: 'example@example.com',
    openAt: new Date('2023-01-01 10:00:00'),
    openDuration: 400,
  };

  const location = {
    id: payload.id,
    providerId: provider.id,
    name: '台北車站',
    address: 'Taipei City, Zhongzheng District, Beiping W Rd, 3號 100 臺灣',
  };

  it('should return NOT_ALLOW if userId is not provided', async () => {
    const result = await deleteLocationUseCase.execute({} as Payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if provider does not exist', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(undefined);
    const result = await deleteLocationUseCase.execute(payload);
    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if the provider is not the owner of the location', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockLocationRepository.getById.mockResolvedValueOnce({
      ...location,
      providerId: 999,
    });

    const result = await deleteLocationUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockLocationRepository.getById).toHaveBeenCalledWith(payload.id);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should delete a location and return result', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockLocationRepository.getById.mockResolvedValueOnce(location);

    const deleteResult = true;
    mockLocationRepository.deleteById.mockResolvedValueOnce(deleteResult);

    const result = await deleteLocationUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockLocationRepository.getById).toHaveBeenCalledWith(payload.id);
    expect(mockLocationRepository.deleteById).toHaveBeenCalledWith(payload.id);
    expect(result).toEqual(Result.ok(deleteResult));
  });
});
