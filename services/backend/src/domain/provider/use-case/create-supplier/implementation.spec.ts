import { ISupplierRepository } from '~backend/domain/provider/repository/supplier/abstract';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW, INVALID } from '~backend/domain/provider/error';
import { CreateSupplierUseCase } from './implementation';

type Payload = Parameters<CreateSupplierUseCase['execute']>[0];

const mockProviderRepository = {
  getByOwnerId: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const mockSupplierRepository = {
  create: jest.fn(),
} as unknown as jest.Mocked<ISupplierRepository>;

const createSupplierUseCase = new CreateSupplierUseCase(
  mockProviderRepository,
  mockSupplierRepository
);

describe('CreateSupplierUseCase', () => {
  const payload: Payload = {
    userId: 123,
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.png',
  };

  const provider = {
    id: 456,
    ownerId: payload.userId,
    description: 'Test Provider',
    name: 'Test',
    slug: 'test',
  };

  const supplier = {
    providerId: provider.id,
    id: 789,
    name: payload.name,
    avatarUrl: payload.avatarUrl,
  };

  it('should return NOT_ALLOW if userId is not provided', async () => {
    const result = await createSupplierUseCase.execute({} as Payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return INVALID if name does not exist', async () => {
    const result = await createSupplierUseCase.execute({
      ...payload,
      name: '',
    });
    expect(result).toEqual(Result.fail(INVALID));
  });

  it('should return NOT_ALLOW if provider does not exist', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(undefined);

    const result = await createSupplierUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should create a supplier and return it', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockSupplierRepository.create.mockResolvedValueOnce(supplier);

    const result = await createSupplierUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockSupplierRepository.create).toHaveBeenCalledWith({
      providerId: provider.id,
      name: payload.name,
      avatarUrl: payload.avatarUrl,
    });
    expect(result).toEqual(Result.ok(supplier));
  });
});
