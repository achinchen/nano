import { User } from '~backend/domain/user/entity';
import { IUserRepository } from '~backend/domain/user/repository/user/abstract';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/provider/error';
import { CreateProviderUseCase } from './implementation';

type Payload = Parameters<CreateProviderUseCase['execute']>[0];

const mockUserRepository = {
  getById: jest.fn(),
} as unknown as jest.Mocked<IUserRepository>;

const mockProviderRepository = {
  create: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const createProviderUseCase = new CreateProviderUseCase(
  mockUserRepository,
  mockProviderRepository
);

describe('CreateProviderUseCase', () => {
  let payload: Payload;

  it('should return NOT_ALLOW if userId is not provided', async () => {
    payload = {} as Payload;
    const result = await createProviderUseCase.execute(payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if user does not exist', async () => {
    mockUserRepository.getById.mockResolvedValueOnce(undefined);
    payload = {
      userId: 123,
      description: 'Test Provider',
      name: 'Test',
      slug: 'test',
    };

    const result = await createProviderUseCase.execute(payload);

    expect(mockUserRepository.getById).toHaveBeenCalledWith(payload.userId);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should create a provider and return it', async () => {
    mockUserRepository.getById.mockResolvedValueOnce({ id: 123 } as User);
    payload = {
      userId: 123,
      description: 'Test Provider',
      name: 'Test',
      slug: 'test',
    };

    const provider = {
      id: 456,
      ownerId: payload.userId,
      description: 'Test Provider',
      name: 'Test',
      slug: 'test',
    };

    mockProviderRepository.create.mockResolvedValueOnce(provider);

    const result = await createProviderUseCase.execute(payload);

    expect(mockUserRepository.getById).toHaveBeenCalledWith(payload.userId);
    expect(mockProviderRepository.create).toHaveBeenCalledWith({
      ownerId: payload.userId,
      description: payload.description,
      name: payload.name,
      slug: payload.slug,
    });
    expect(result).toEqual(Result.ok(provider));
  });
});
