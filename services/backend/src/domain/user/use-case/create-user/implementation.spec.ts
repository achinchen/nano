import type { IUserRepository } from '~backend/domain/user/repository/user/abstract';
import type { IUserFederatedCredentialRepository } from '~backend/domain/user/repository/user-federated-credential/abstract';
import { EXISTED_EMAIL } from '~backend/domain/user/error';
import { AppError } from '~backend/domain/shared/error';
import phoneValueObject from '~backend/domain/shared/value-object/phone';
import emailValueObject from '~backend/domain/shared/value-object/email';
import { CreateUserUseCase } from './implementation';

jest.spyOn(AppError, 'Unexpected');

jest.mock('~backend/domain/shared/value-object/phone', () => ({
  execute: jest.fn((phone: string) => [null, phone]),
}));

const mockPhoneValueObject = phoneValueObject as jest.Mocked<
  typeof phoneValueObject
>;

jest.mock('~backend/domain/shared/value-object/email', () => ({
  execute: jest.fn((email: string) => [null, email]),
}));

const mockEmailValueObject = emailValueObject as jest.Mocked<
  typeof emailValueObject
>;

const mockUserRepository = {
  exist: jest.fn(),
  create: jest.fn(),
} as unknown as jest.Mocked<IUserRepository>;

const mockUserFederatedCredentialRepository = {
  create: jest.fn(),
} as unknown as jest.Mocked<IUserFederatedCredentialRepository>;

const createUserUseCase = new CreateUserUseCase(
  mockUserRepository,
  mockUserFederatedCredentialRepository
);

const payload = {
  nickname: 'john_doe',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '1234567890',
  provider: 'google',
  subject: 'google-subject-id',
};

describe('CreateUserUseCase', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a new user and federated credential when all data is valid', async () => {
    mockUserRepository.exist.mockResolvedValue(false);

    const mockCreatedUser = {
      id: 123,
      nickname: payload.nickname,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
    };

    mockUserRepository.create.mockResolvedValue(mockCreatedUser);
    mockUserFederatedCredentialRepository.create.mockResolvedValue(null);

    const [error, result] = await createUserUseCase.execute(payload);

    expect(error).toBe(null);
    expect(result).toEqual(mockCreatedUser);

    expect(mockUserRepository.exist).toHaveBeenCalledWith(payload.email);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      nickname: payload.nickname,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
    });
    expect(mockUserFederatedCredentialRepository.create).toHaveBeenCalledWith({
      userId: mockCreatedUser.id,
      provider: payload.provider,
      subject: payload.subject,
    });
  });

  it('returns an error if the user with the provided email already exists', async () => {
    mockUserRepository.exist.mockResolvedValue(true);

    const [error, result] = await createUserUseCase.execute(payload);

    expect(result).toBeUndefined();
    expect(error).toBe(EXISTED_EMAIL);

    expect(mockUserRepository.exist).toHaveBeenCalledWith(payload.email);
    expect(mockUserRepository.create).not.toHaveBeenCalled();
    expect(mockUserFederatedCredentialRepository.create).not.toHaveBeenCalled();
  });

  it('returns errors from emailValueObject and phoneValueObject executions', async () => {
    const emailError = 'Invalid email format';
    const phoneError = 'Invalid phone format';

    mockEmailValueObject.execute.mockReturnValueOnce([emailError]);

    mockPhoneValueObject.execute.mockReturnValueOnce([phoneError]);

    const [, result] = await createUserUseCase.execute(payload);

    expect(result).toBeUndefined();
    expect(mockUserRepository.exist).not.toHaveBeenCalled();
    expect(mockUserRepository.create).not.toHaveBeenCalled();
    expect(mockUserFederatedCredentialRepository.create).not.toHaveBeenCalled();
  });

  it('returns AppError.Unexpected if an error occurs during user creation', async () => {
    mockUserRepository.exist.mockResolvedValue(false);
    const errorInstance = new Error();
    mockUserRepository.exist.mockRejectedValue(errorInstance);

    const [error, result] = await createUserUseCase.execute(payload);

    expect(AppError.Unexpected).toHaveBeenCalledWith(errorInstance);
    expect(result).toBeUndefined();
    expect(error).toEqual(AppError.Unexpected(errorInstance)[0]);

    expect(mockUserRepository.exist).toHaveBeenCalledWith(payload.email);
    expect(mockUserRepository.create).not.toHaveBeenCalledWith({
      nickname: payload.nickname,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
    });
    expect(mockUserFederatedCredentialRepository.create).not.toHaveBeenCalled();
  });
});
