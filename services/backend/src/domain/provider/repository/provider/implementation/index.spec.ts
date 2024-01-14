import { CreateProviderDTO } from '~backend/domain/provider/dto';

const mockDBProviderRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
};

const mockLocationRepository = {
  findOne: jest.fn(),
};

const mockSupplierRepository = {
  find: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest
      .fn()
      .mockReturnValueOnce(mockDBProviderRepository)
      .mockReturnValueOnce(mockSupplierRepository)
      .mockReturnValueOnce(mockLocationRepository),
  },
}));

import { ProviderRepository } from '.';

describe('ProviderRepository', () => {
  const providerRepository = new ProviderRepository();
  const payload: CreateProviderDTO = {
    ownerId: 456,
    name: 'Test Provider',
    slug: 'test-provider',
    description: 'A test provider',
    avatarUrl: 'https://test.com/avatar.png',
    SNSId: 'test-provider',
    email: 'example@example.com',
    openAt: new Date('2023-01-01 10:00:00'),
    openDuration: 400,
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

  it('should return the correct detail for a given owner ID', async () => {
    const ownerId = 123;
    const mockProvider = {
      id: 1,
      name: 'Provider Name',
      slug: 'provider-slug',
      description: 'Provider Description',
      avatarUrl: 'provider-avatar-url',
      SNSId: 'provider-sns-id',
      email: 'provider-email',
      openAt: 'provider-open-at',
      openDuration: 'provider-open-duration',
    };
    const mockLocation = {
      id: 1,
      name: 'Location Name',
      address: 'Location Address',
    };
    const mockSuppliers = [
      { id: 1, name: 'Supplier Name', avatarUrl: 'supplier-avatar-url' },
    ];

    mockDBProviderRepository.findOneBy.mockResolvedValue(mockProvider);
    mockLocationRepository.findOne.mockResolvedValue(mockLocation);
    mockSupplierRepository.find.mockResolvedValue(mockSuppliers);

    const detail = await providerRepository.getDetailByOwnerId(ownerId);

    expect(detail).toEqual({
      id: mockProvider.id,
      name: mockProvider.name,
      slug: mockProvider.slug,
      description: mockProvider.description,
      avatarUrl: mockProvider.avatarUrl,
      SNSId: mockProvider.SNSId,
      email: mockProvider.email,
      openAt: mockProvider.openAt,
      openDuration: mockProvider.openDuration,
      location: mockLocation,
      suppliers: mockSuppliers,
    });
  });

  it('should return the correct detail for a given ID', async () => {
    const mockProvider = {
      id: 1,
      name: 'Provider Name',
      slug: 'provider-slug',
      description: 'Provider Description',
      avatarUrl: 'provider-avatar-url',
      SNSId: 'provider-sns-id',
      email: 'provider-email',
      openAt: 'provider-open-at',
      openDuration: 'provider-open-duration',
    };
    const mockLocation = {
      id: 1,
      name: 'Location Name',
      address: 'Location Address',
    };
    const mockSuppliers = [
      { id: 1, name: 'Supplier Name', avatarUrl: 'supplier-avatar-url' },
    ];

    mockDBProviderRepository.findOneBy.mockResolvedValue(mockProvider);
    mockLocationRepository.findOne.mockResolvedValue(mockLocation);
    mockSupplierRepository.find.mockResolvedValue(mockSuppliers);

    const detail = await providerRepository.getDetailById(mockProvider.id);

    expect(detail).toEqual({
      id: mockProvider.id,
      name: mockProvider.name,
      slug: mockProvider.slug,
      description: mockProvider.description,
      avatarUrl: mockProvider.avatarUrl,
      SNSId: mockProvider.SNSId,
      email: mockProvider.email,
      openAt: mockProvider.openAt,
      openDuration: mockProvider.openDuration,
      location: mockLocation,
      suppliers: mockSuppliers,
    });
  });
});
