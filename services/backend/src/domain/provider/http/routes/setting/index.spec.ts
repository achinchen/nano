import { providerRepository } from '~backend/domain/provider/repository/provider'; // replace with actual import
import setting from './index';

jest.mock('~backend/domain/provider/repository/provider', () => ({
  providerRepository: {
    getDetailByOwnerId: jest.fn(),
  },
}));

const mockProviderRepository = providerRepository as jest.Mocked<
  typeof providerRepository
>;

describe('setting', () => {
  it('returns the correct providers for a given user ID', async () => {
    const mockReq = {
      user: {
        id: '123',
      },
    };
    const mockRes = {
      json: jest.fn(),
    };
    const mockProviders = {
      id: 1,
      name: 'Provider Name',
    } as Awaited<ReturnType<typeof providerRepository.getDetailByOwnerId>>;

    mockProviderRepository.getDetailByOwnerId.mockResolvedValue(mockProviders);

    await setting(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(mockProviders);
  });
});
