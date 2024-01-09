import { ITakeleaveRepository } from '~backend/domain/provider/repository/takeleave/abstract';
import { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW, INVALID } from '~backend/domain/provider/error';
import { CreateTakeleaveUseCase } from './implementation';

type Payload = Parameters<CreateTakeleaveUseCase['execute']>[0];

const mockProviderRepository = {
  getByOwnerId: jest.fn(),
} as unknown as jest.Mocked<IProviderRepository>;

const mockTakeleaveRepository = {
  create: jest.fn(),
} as unknown as jest.Mocked<ITakeleaveRepository>;

const createTakeLeaveUseCase = new CreateTakeleaveUseCase(
  mockProviderRepository,
  mockTakeleaveRepository
);

describe('CreateTakeleaveUseCase', () => {
  const payload: Payload = {
    userId: 123,
    startAt: new Date('2023/04/05'),
    endAt: new Date('2023/04/08'),
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

  const takeleave = {
    id: 789,
    providerId: provider.id,
    startAt: payload.startAt,
    endAt: payload.endAt,
  };

  it('should return NOT_ALLOW if userId is not provided', async () => {
    const result = await createTakeLeaveUseCase.execute({} as Payload);
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return NOT_ALLOW if provider does not exist', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(undefined);

    const result = await createTakeLeaveUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return INVALID if provider does not exist', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);

    const result = await createTakeLeaveUseCase.execute({
      ...payload,
      startAt: payload.endAt,
      endAt: payload.startAt,
    });

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(result).toEqual(Result.fail(INVALID));
  });

  it('should create a takeleave and return it', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValueOnce(provider);
    mockTakeleaveRepository.create.mockResolvedValueOnce(takeleave);

    const result = await createTakeLeaveUseCase.execute(payload);

    expect(mockProviderRepository.getByOwnerId).toHaveBeenCalledWith(
      payload.userId
    );
    expect(mockTakeleaveRepository.create).toHaveBeenCalledWith({
      providerId: provider.id,
      startAt: payload.startAt,
      endAt: payload.endAt,
    });
    expect(result).toEqual(Result.ok(takeleave));
  });
});
