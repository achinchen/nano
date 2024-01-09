import { ISupplierRepository } from '~backend/domain/provider/repository/supplier/abstract';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/provider/error';
import { UpdateSupplierUseCase } from './implementation';

type Payload = Parameters<UpdateSupplierUseCase['execute']>[0];

const mockProviderRepository = {
  getByOwnerId: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const mockSupplierRepository = {
  getById: jest.fn(),
  update: jest.fn(),
} as unknown as jest.Mocked<ISupplierRepository>;

const updateSupplierUseCase = new UpdateSupplierUseCase(
  mockProviderRepository,
  mockSupplierRepository
);

describe('UpdateSupplierUseCase', () => {
  const payload: Payload = {
    id: 789,
    userId: 123,
    name: 'Doe John',
    avatarUrl: 'https://example.com/avatar-new.png',
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

  const supplier = {
    id: payload.id,
    providerId: provider.id,
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.png',
  };

  it('should return NOT_ALLOW if userId is not provided', async () => {
    const result = await updateSupplierUseCase.execute({} as Payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if provider is not found', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(undefined);
    const result = await updateSupplierUseCase.execute(payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if supplier is not found', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockSupplierRepository.getById.mockResolvedValueOnce(undefined);
    const result = await updateSupplierUseCase.execute(payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if supplier providerId does not match the provider', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockSupplierRepository.getById.mockResolvedValueOnce({
      ...supplier,
      providerId: 999,
    });
    const result = await updateSupplierUseCase.execute(payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should update the supplier and return true', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockSupplierRepository.getById.mockResolvedValueOnce(supplier);
    mockSupplierRepository.update.mockResolvedValueOnce(true);

    const result = await updateSupplierUseCase.execute(payload);
    expect(mockSupplierRepository.update).toHaveBeenCalledWith({
      id: payload.id,
      name: payload.name,
      avatarUrl: payload.avatarUrl,
    });
    expect(result).toEqual(Result.ok(true));
  });
});
