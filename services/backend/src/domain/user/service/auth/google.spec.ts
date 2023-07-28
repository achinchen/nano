import type { Profile } from 'passport';
import { verify } from '~backend/domain/user/service/auth/google';
import { userFederatedCredentialRepository } from '~backend/domain/user/repository/user-federated-credential';
import { createUserUseCase } from '~backend/domain/user/use-case/create-user';
import { userRepository } from '~backend/domain/user/repository/user';

jest.mock('passport');
jest.mock('passport-google-oauth20');

const mockProfile: Profile = {
  id: 'google_user_id',
  displayName: 'John Doe',
  name: { givenName: 'John', familyName: 'Doe' },
  emails: [{ value: 'john.doe@example.com' }],
  provider: 'google',
};

const mockFederatedCredential = {
  userId: 'user_id',
};

const mockUser = {
  id: 'user_id',
  nickname: 'john_doe',
  email: 'john.doe@example.com',
};

jest.mock('~backend/domain/user/repository/user-federated-credential', () => ({
  userFederatedCredentialRepository: {
    getByProviderAndSubject: jest.fn(),
  },
}));

jest.mock('~backend/domain/user/use-case/create-user', () => ({
  createUserUseCase: {
    execute: jest.fn(),
  },
}));

jest.mock('~backend/domain/user/repository/user', () => ({
  userRepository: {
    getById: jest.fn(),
  },
}));

const mockUserFederatedCredentialRepository = {
  getByProviderAndSubject:
    userFederatedCredentialRepository.getByProviderAndSubject as jest.Mock,
};

const mockCreateUserUseCase = {
  execute: createUserUseCase.execute as jest.Mock,
};

const mockUserRepository = {
  getById: userRepository.getById as jest.Mock,
};

describe('Passport Google Strategy Verify Function', () => {
  const cb = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('create a new user when no federated credential is found', async () => {
    mockUserFederatedCredentialRepository.getByProviderAndSubject.mockResolvedValueOnce(
      null
    );
    mockCreateUserUseCase.execute.mockResolvedValueOnce([null, mockUser]);

    await verify('access_token', 'refresh_token', mockProfile, cb);

    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith({
      nickname: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '',
      provider: 'google',
      subject: 'google_user_id',
    });

    expect(cb).toHaveBeenCalledWith(null, mockUser);
  });

  it('an existing user when a federated credential is found', async () => {
    mockUserFederatedCredentialRepository.getByProviderAndSubject.mockResolvedValueOnce(
      mockFederatedCredential
    );
    mockUserRepository.getById.mockResolvedValueOnce(mockUser);

    await verify('access_token', 'refresh_token', mockProfile, cb);

    expect(userRepository.getById).toHaveBeenCalledWith(mockUser.id);
    expect(cb).toHaveBeenCalledWith(null, mockUser);
  });

  it('return an error when creating a new user fails', async () => {
    mockUserFederatedCredentialRepository.getByProviderAndSubject.mockResolvedValueOnce(
      null
    );
    mockCreateUserUseCase.execute.mockResolvedValueOnce([
      new Error('User creation failed'),
    ]);

    await verify('access_token', 'refresh_token', mockProfile, cb);

    expect(cb).toHaveBeenCalledWith(null, false);
  });

  it('return an error when retrieving an existing user fails', async () => {
    mockUserFederatedCredentialRepository.getByProviderAndSubject.mockResolvedValueOnce(
      mockFederatedCredential
    );
    mockUserRepository.getById.mockResolvedValueOnce(null);

    await verify('access_token', 'refresh_token', mockProfile, cb);

    expect(cb).toHaveBeenCalledWith(null, false);
  });

  it('return an error when an exception occurs in the verify function', async () => {
    mockUserFederatedCredentialRepository.getByProviderAndSubject.mockRejectedValueOnce(
      new Error('Database connection error')
    );

    await verify('access_token', 'refresh_token', mockProfile, cb);

    expect(cb).toHaveBeenCalledWith(expect.any(Error));
  });
});
