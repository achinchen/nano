import { CreateUserFederatedCredentialDTO } from '~backend/domain/user/dto';

const mockDBUserFederatedCredentialRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest
      .fn()
      .mockReturnValue(mockDBUserFederatedCredentialRepository),
  },
}));

import { UserFederatedCredentialRepository } from './implementation';

const userFederatedCredentialRepository =
  new UserFederatedCredentialRepository();

const payload = {
  provider: 'google',
  subject: 'user123',
};

describe('UserFederatedCredentialRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates and saves a user federated credential', async () => {
    const mockPayload: CreateUserFederatedCredentialDTO = {
      userId: 123,
      ...payload,
    };

    await userFederatedCredentialRepository.create(mockPayload);

    expect(mockDBUserFederatedCredentialRepository.create).toHaveBeenCalledWith(
      mockPayload
    );
    expect(mockDBUserFederatedCredentialRepository.save).toHaveBeenCalled();
  });

  it('gets a user federated credential by provider and subject', async () => {
    const mockUserFederatedCredential = {
      id: 1,
      userId: 123,
      ...payload,
    };
    mockDBUserFederatedCredentialRepository.findOneBy.mockResolvedValue(
      mockUserFederatedCredential
    );

    const result =
      await userFederatedCredentialRepository.getByProviderAndSubject(payload);

    expect(
      mockDBUserFederatedCredentialRepository.findOneBy
    ).toHaveBeenCalledWith(payload);
    expect(result).toEqual(mockUserFederatedCredential);
  });
});
