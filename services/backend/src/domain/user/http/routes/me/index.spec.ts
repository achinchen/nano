import type { Provider } from '~backend/domain/provider/entity';
import { providerRepository } from '~backend/domain/provider/repository/provider';
import { me, Role } from '.';

jest.mock('~backend/domain/provider/repository/provider');

const mockProviderRepository = providerRepository as jest.Mocked<
  typeof providerRepository
>;

const id = 1;
const req = { user: { id } };
const res = { json: jest.fn(), status: jest.fn() };
const next = jest.fn();

describe('me', () => {
  it('returns the correct role for a given session id', async () => {
    mockProviderRepository.getByOwnerId.mockResolvedValue(null);

    await me(req, res, next);
    expect(res.json).toHaveBeenCalledWith({ id, role: Role.consumer });
  });

  it('returns the guest role when the session id is not found', async () => {
    const req = { user: {} };
    await me(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ role: Role.guest });
  });

  it('returns the provider role when the user is a provider', async () => {
    const provider = {
      id: 3,
      name: 'name',
      avatarUrl: 'avatarUrl',
      SNSId: 'SNSId',
    } as Provider;
    mockProviderRepository.getByOwnerId.mockResolvedValue(provider);

    await me(req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      id,
      role: Role.provider,
      studio: {
        avatarUrl: provider.avatarUrl,
        name: provider.name,
        SNSId: provider.SNSId,
      },
    });
  });
});
