import type { Provider } from '~backend/domain/provider/entity';
import { providerRepository } from '~backend/domain/provider/repository/provider';
import { me, Role } from '.';

jest.mock('~backend/domain/provider/repository/provider');

const mockProviderRepository = providerRepository as jest.Mocked<
  typeof providerRepository
>;

const req = { user: { id: 1 } };
const res = { json: jest.fn(), status: jest.fn() };

describe('me', () => {
  it('returns the correct role for a given session id', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValue(null);

    await me(req, res);
    expect(res.json).toHaveBeenCalledWith({ role: Role.consumer });
  });

  it('returns the guest role when the session id is not found', async () => {
    const req = { user: {} };
    await me(req, res);

    expect(res.json).toHaveBeenCalledWith({ role: Role.guest });
  });

  it('returns the provider role when the user is a provider', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValue({
      id: 1,
    } as Provider);

    await me(req, res);

    expect(res.json).toHaveBeenCalledWith({ role: Role.provider });
  });
});
