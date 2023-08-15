import { ISupplierRepository } from '~backend/domain/provider/repository/supplier/abstract';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/provider/error';
import { DeleteSupplierUseCase } from './implementation';

type Payload = Parameters<DeleteSupplierUseCase['execute']>[0];

const mockProviderRepository = {
  getByOwnerId: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const mockSupplierRepository = {
  getById: jest.fn(),
  deleteById: jest.fn(),
} as unknown as jest.Mocked<ISupplierRepository>;

const deleteSupplierUseCase = new DeleteSupplierUseCase(
  mockProviderRepository,
  mockSupplierRepository
);

describe('DeleteSupplierUseCase', () => {
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
  };

  const supplier = {
    id: payload.id,
    providerId: provider.id,
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.png',
  };

  it('should return NOT_ALLOW if userId is not provided', async () => {
    const result = await deleteSupplierUseCase.execute({} as Payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if provider does not exist', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(undefined);
    const result = await deleteSupplierUseCase.execute(payload);
    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if the provider is not the owner of the supplier', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockSupplierRepository.getById.mockResolvedValueOnce({
      ...supplier,
      providerId: 999,
    });

    const result = await deleteSupplierUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockSupplierRepository.getById).toHaveBeenCalledWith(payload.id);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should delete a supplier and return result', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockSupplierRepository.getById.mockResolvedValueOnce(supplier);

    const deleteResult = true;
    mockSupplierRepository.deleteById.mockResolvedValueOnce(deleteResult);

    const result = await deleteSupplierUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockSupplierRepository.getById).toHaveBeenCalledWith(payload.id);
    expect(mockSupplierRepository.deleteById).toHaveBeenCalledWith(payload.id);
    expect(result).toEqual(Result.ok(deleteResult));
  });
});
