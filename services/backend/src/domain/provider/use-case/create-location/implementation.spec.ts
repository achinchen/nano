import { ILocationRepository } from '~backend/domain/provider/repository/location/abstract';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW, INVALID } from '~backend/domain/provider/error';
import { CreateLocationUseCase } from './implementation';

type Payload = Parameters<CreateLocationUseCase['execute']>[0];

const mockProviderRepository = {
  getByOwnerId: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const mockLocationRepository = {
  create: jest.fn(),
} as unknown as jest.Mocked<ILocationRepository>;

const createLocationUseCase = new CreateLocationUseCase(
  mockProviderRepository,
  mockLocationRepository
);

describe('CreateLocationUseCase', () => {
  const payload: Payload = {
    userId: 123,
    name: '台北車站',
    address: 'Taipei City, Zhongzheng District, Beiping W Rd, 3號 100 臺灣',
  };

  const provider = {
    id: 456,
    ownerId: payload.userId,
    description: 'Test Provider',
    name: 'Test',
    slug: 'test',
    avatarUrl: 'https://example.com/avatar.png',
    SNSId: '123456789',
    email: 'example@exaple.com',
    openAt: new Date('2023-01-01 10:00:00'),
    openDuration: 400,
  };

  const location = {
    providerId: provider.id,
    id: 789,
    name: payload.name,
    address: payload.address,
  };

  it('should return NOT_ALLOW if userId is not provided', async () => {
    const result = await createLocationUseCase.execute({} as Payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  test.each([
    { ...payload, name: '' },
    { ...payload, address: '' },
  ])(
    'should return INVALID if name or description does not exist %s',
    async (input) => {
      const result = await createLocationUseCase.execute(input as Payload);
      expect(result).toEqual(Result.fail(INVALID));
    }
  );

  it('should return NOT_ALLOW if provider does not exist', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(undefined);

    const result = await createLocationUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should create a location and return it', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockLocationRepository.create.mockResolvedValueOnce(location);

    const result = await createLocationUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockLocationRepository.create).toHaveBeenCalledWith({
      providerId: provider.id,
      name: payload.name,
      address: payload.address,
    });
    expect(result).toEqual(Result.ok(location));
  });
});
