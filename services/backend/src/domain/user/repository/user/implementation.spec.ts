/* eslint-disable testing-library/no-await-sync-query */
import type { User } from '~backend/domain/user/entity';
// eslint-disable-next-line import/order
import type { CreateUserDTO } from '~backend/domain/user/dto';

const mockDBUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest.fn().mockReturnValue(mockDBUserRepository),
  },
}));

import { UserRepository } from './implementation';

describe('UserRepository', () => {
  const userRepository = new UserRepository();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a user with the given payload', async () => {
    const payload: CreateUserDTO = {
      nickname: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      phone: '1234567890',
    };

    const createdUser: User = {
      id: 1,
      ...payload,
    };
    mockDBUserRepository.create.mockReturnValue(createdUser);
    mockDBUserRepository.save.mockResolvedValue(createdUser);

    const result = await userRepository.create(payload);

    expect(mockDBUserRepository.create).toHaveBeenCalledWith(payload);
    expect(mockDBUserRepository.save).toHaveBeenCalledWith(createdUser);
    expect(result).toEqual(createdUser);
  });

  it('gets a user by id', async () => {
    const userId = 1;
    const foundUser: User = {
      id: userId,
      nickname: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      phone: '1234567890',
    };
    mockDBUserRepository.findOneBy.mockResolvedValue(foundUser);

    const result = await userRepository.getById(userId);

    expect(mockDBUserRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
    expect(result).toEqual(foundUser);
  });

  it('checks if a user exists by email', async () => {
    const userEmail = 'test@example.com';
    const foundUser: User = {
      id: 1,
      nickname: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      email: userEmail,
      phone: '1234567890',
    };
    mockDBUserRepository.findOneBy.mockResolvedValue(foundUser);

    let result = await userRepository.exist(userEmail);
    expect(mockDBUserRepository.findOneBy).toHaveBeenCalledWith({
      email: userEmail,
    });
    expect(result).toBe(true);

    mockDBUserRepository.findOneBy.mockResolvedValue(null);
    result = await userRepository.exist('nonexistent@example.com');
    expect(result).toBe(false);
  });
});
