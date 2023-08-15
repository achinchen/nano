import { CreateLocationDTO } from '~backend/domain/provider/dto';

const mockDBLocationRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest.fn().mockReturnValue(mockDBLocationRepository),
  },
}));

import { LocationRepository } from './implementation';

describe('LocationRepository', () => {
  const locationRepository = new LocationRepository();
  const payload: CreateLocationDTO = {
    providerId: 456,
    name: '台北車站',
    address: 'Taipei City, Zhongzheng District, Beiping W Rd, 3號 100 臺灣',
  };

  const location = { ...payload, id: 1 };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a location', async () => {
    mockDBLocationRepository.create.mockReturnValueOnce(payload);
    mockDBLocationRepository.save.mockResolvedValueOnce(location);

    const result = await locationRepository.create(payload);

    expect(mockDBLocationRepository.create).toHaveBeenCalledWith(payload);
    expect(mockDBLocationRepository.save).toHaveBeenCalledWith(payload);
    expect(result).toEqual(location);
  });

  it('should get a location by id', async () => {
    mockDBLocationRepository.findOneBy.mockResolvedValueOnce(location);

    const result = await locationRepository.getById(location.id);

    expect(mockDBLocationRepository.findOneBy).toHaveBeenCalledWith({
      id: location.id,
    });
    expect(result).toEqual(location);
  });

  it('should get all locations by provider id', async () => {
    const locations = [location, { ...location, id: 2 }];
    mockDBLocationRepository.find.mockResolvedValueOnce(locations);

    const result = await locationRepository.getAllByProviderId(
      payload.providerId
    );

    expect(mockDBLocationRepository.find).toHaveBeenCalledWith({
      where: { providerId: payload.providerId },
    });
    expect(result).toEqual(locations);
  });

  it('should delete a location by id', async () => {
    mockDBLocationRepository.softDelete.mockResolvedValueOnce(location);

    const result = await locationRepository.deleteById(location.id);

    expect(mockDBLocationRepository.softDelete).toHaveBeenCalledWith({
      id: location.id,
    });
    expect(result).toBe(true);
  });
});
