import { userRepository } from '~backend/domain/user/repository/user';
import { setting } from '.';
jest.mock('~backend/domain/user/repository/user');

const mockUserRepository = userRepository as jest.Mocked<typeof userRepository>;
const req = { user: { id: 1 } };

describe('setting', () => {
  it('returns the user profile for a given session id', async () => {
    const mockProfile = {
      id: 1,
      phone: '1234567890',
      email: 'john.doe@example.com',
      nickname: 'johndoe',
      firstName: 'John',
      lastName: 'Doe',
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    mockUserRepository.getById.mockResolvedValueOnce(mockProfile);

    await setting(req, res);

    expect(res.json).toHaveBeenCalledWith(mockProfile);
    expect(res.status).not.toHaveBeenCalled();
  });

  it('returns a 403 status code when the profile is not found', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    await setting(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalled();
  });
});
