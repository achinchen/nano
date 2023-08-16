import type { Service } from '~backend/domain/service/entity';
import { CreateServiceDTO } from '~backend/domain/service/dto';

const mockDBServiceRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest.fn().mockReturnValue(mockDBServiceRepository),
  },
}));

import { ServiceRepository } from './implementation';

describe('ServiceRepository', () => {
  const serviceRepository = new ServiceRepository();
  const payload: CreateServiceDTO = {
    providerId: 123,
    lastHistoryId: 456,
  };

  const service = { ...payload, id: 1 } as Service;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a service', async () => {
    mockDBServiceRepository.create.mockReturnValue(payload);
    mockDBServiceRepository.save.mockResolvedValue(service);

    const result = await serviceRepository.create(payload);

    expect(mockDBServiceRepository.create).toHaveBeenCalledWith(payload);
    expect(mockDBServiceRepository.save).toHaveBeenCalled();
    expect(result).toEqual(service);
  });

  it('should get a service by id', async () => {
    mockDBServiceRepository.findOneBy.mockResolvedValue(service);
    const result = await serviceRepository.getById(service.id);

    expect(mockDBServiceRepository.findOneBy).toHaveBeenCalledWith({
      id: service.id,
    });
    expect(result).toEqual(service);
  });

  it('should get services by provider id', async () => {
    const services = [service, { ...service, id: 2 }] as Service[];
    mockDBServiceRepository.find.mockResolvedValue(services);
    const result = await serviceRepository.getAllByProviderId(
      service.providerId
    );

    expect(mockDBServiceRepository.find).toHaveBeenCalledWith({
      where: {
        providerId: service.providerId,
      },
    });
    expect(result).toEqual(services);
  });

  it('should delete a service by id', async () => {
    mockDBServiceRepository.softDelete.mockReturnValue(service);

    const result = await serviceRepository.deleteById(service.id);

    expect(mockDBServiceRepository.softDelete).toHaveBeenCalledWith({
      id: service.id,
    });
    expect(result).toBe(true);
  });
});
