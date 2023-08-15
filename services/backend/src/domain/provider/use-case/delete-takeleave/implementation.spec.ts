import { ITakeleaveRepository } from '~backend/domain/provider/repository/takeleave/abstract';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/provider/error';
import { DeleteTakeleaveUseCase } from './implementation';

type Payload = Parameters<DeleteTakeleaveUseCase['execute']>[0];

const mockProviderRepository = {
  getByOwnerId: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const mockTakeleaveRepository = {
  getById: jest.fn(),
  deleteById: jest.fn(),
} as unknown as jest.Mocked<ITakeleaveRepository>;

const deleteTakeLeaveUseCase = new DeleteTakeleaveUseCase(
  mockProviderRepository,
  mockTakeleaveRepository
);

describe('DeleteTakeleaveUseCase', () => {
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

  const takeleave = {
    id: payload.id,
    providerId: provider.id,
    startAt: new Date('2023/04/05'),
    endAt: new Date('2023/04/15'),
  };

  it('should return NOT_ALLOW if userId is not provided', async () => {
    const result = await deleteTakeLeaveUseCase.execute({} as Payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if provider does not exist', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(undefined);
    const result = await deleteTakeLeaveUseCase.execute(payload);
    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if the provider is not the owner of the takeleave', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockTakeleaveRepository.getById.mockResolvedValueOnce({
      ...takeleave,
      providerId: 999,
    });

    const result = await deleteTakeLeaveUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockTakeleaveRepository.getById).toHaveBeenCalledWith(payload.id);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should delete a takeleave and return result', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockTakeleaveRepository.getById.mockResolvedValueOnce(takeleave);

    const deleteResult = true;
    mockTakeleaveRepository.deleteById.mockResolvedValueOnce(deleteResult);

    const result = await deleteTakeLeaveUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockTakeleaveRepository.getById).toHaveBeenCalledWith(payload.id);
    expect(mockTakeleaveRepository.deleteById).toHaveBeenCalledWith(payload.id);
    expect(result).toEqual(Result.ok(deleteResult));
  });
});
