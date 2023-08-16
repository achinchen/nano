import { CreateProviderDTO } from '~backend/domain/provider/dto';

const mockDBProviderRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest.fn().mockReturnValue(mockDBProviderRepository),
  },
}));

import { ProviderRepository } from './implementation';

describe('ProviderRepository', () => {
  const providerRepository = new ProviderRepository();
  const payload: CreateProviderDTO = {
    ownerId: 456,
    name: 'Test Provider',
    slug: 'test-provider',
    description: 'A test provider',
  };

  const provider = { ...payload, id: 1 };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a provider', async () => {
    mockDBProviderRepository.create.mockReturnValue(payload);
    mockDBProviderRepository.save.mockResolvedValue(provider);

    const result = await providerRepository.create(payload);

    expect(mockDBProviderRepository.create).toHaveBeenCalledWith(payload);
    expect(mockDBProviderRepository.save).toHaveBeenCalled();
    expect(result).toEqual(provider);
  });

  it('should get a provider by id', async () => {
    mockDBProviderRepository.findOneBy.mockReturnValue(provider);
    const result = await providerRepository.getById(provider.id);

    expect(mockDBProviderRepository.findOneBy).toHaveBeenCalledWith({
      id: provider.id,
    });
    expect(result).toEqual(provider);
  });

  it('should get a provider by owner id', async () => {
    mockDBProviderRepository.findOneBy.mockReturnValue(provider);
    const result = await providerRepository.getByOwnerId(provider.ownerId);

    expect(mockDBProviderRepository.findOneBy).toHaveBeenCalledWith({
      ownerId: provider.ownerId,
    });
    expect(result).toEqual(provider);
  });

  it('should delete a provider by id', async () => {
    mockDBProviderRepository.softDelete.mockReturnValue(provider);

    const result = await providerRepository.deleteById(provider.id);

    expect(mockDBProviderRepository.softDelete).toHaveBeenCalledWith({
      id: provider.id,
    });
    expect(result).toBe(true);
  });
});
