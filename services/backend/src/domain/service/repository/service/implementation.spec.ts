import { Service as DBService } from '~backend/domain/service/infra/db/service';
import { ServiceHistory as DBServiceHistory } from '~backend/domain/service/infra/db/service-history';
import { CreateServiceDTO } from '~backend/domain/service/dto';

const mockDBServiceRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
  update: jest.fn(),
};

const mockDBServiceHistoryRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
  getOne: jest.fn(),
  getMany: jest.fn(),
  createQueryBuilder: jest.fn(function () {
    return {
      innerJoinAndSelect: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      cache: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getOne: mockDBServiceHistoryRepository.getOne,
      getMany: mockDBServiceHistoryRepository.getMany,
    };
  }),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest
      .fn()
      .mockReturnValueOnce(mockDBServiceRepository)
      .mockReturnValueOnce(mockDBServiceHistoryRepository),
  },
}));

import { ServiceRepository } from './implementation';

const serviceRepository = new ServiceRepository();

describe('ServiceRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new service and service history', async () => {
      const payload: CreateServiceDTO = {
        providerId: 1,
        name: 'Test Service',
        supplierId: 1,
        locationId: 1,
        description: 'Test Service Description',
        duration: new Date(),
        attendee: 10,
        allday: false,
        startAt: new Date(),
        endAt: new Date(),
        fields: ['name', 'email'],
        note: 'Test Service Note',
      };

      const service = { id: 1 };
      const serviceHistory = { id: 1 };

      mockDBServiceRepository.create.mockReturnValueOnce(service);
      mockDBServiceRepository.save.mockReturnValueOnce(service);
      mockDBServiceHistoryRepository.create.mockReturnValueOnce(serviceHistory);
      mockDBServiceHistoryRepository.save.mockReturnValueOnce(serviceHistory);

      const result = await serviceRepository.create(payload);

      expect(mockDBServiceRepository.create).toHaveBeenCalledWith({
        providerId: payload.providerId,
      });
      expect(mockDBServiceRepository.save).toHaveBeenCalledWith(service);
      expect(mockDBServiceHistoryRepository.create).toHaveBeenCalledWith({
        serviceId: service.id,
        // version: payload.version,
        name: payload.name,
        supplierId: payload.supplierId,
        locationId: payload.locationId,
        description: payload.description,
        duration: payload.duration,
        attendee: payload.attendee,
        allday: payload.allday,
        startAt: payload.startAt,
        endAt: payload.endAt,
        fields: payload.fields,
        note: payload.note,
      });
      expect(mockDBServiceHistoryRepository.save).toHaveBeenCalledWith(
        serviceHistory
      );
      expect(mockDBServiceRepository.update).toHaveBeenCalledWith(service.id, {
        lastHistoryId: serviceHistory.id,
      });
      expect(result).toEqual(serviceHistory);
    });
  });

  describe('getByIdAndProviderId', () => {
    it('should get a service by id and providerId', async () => {
      const id = 1;
      const providerId = 1;
      const service = { id, providerId };

      mockDBServiceRepository.findOneBy.mockReturnValueOnce(service);

      const result = await serviceRepository.getByIdAndProviderId(
        id,
        providerId
      );

      expect(mockDBServiceRepository.findOneBy).toHaveBeenCalledWith({
        id,
        providerId,
      });
      expect(result).toEqual(service);
    });
  });

  describe('getInfoByIdAndProviderId', () => {
    it('should get service history by id and providerId', async () => {
      const id = 1;
      const providerId = 1;
      const serviceHistory = { id };

      mockDBServiceHistoryRepository.getOne.mockResolvedValueOnce(
        serviceHistory
      );

      const result = await serviceRepository.getInfoByIdAndProviderId(
        id,
        providerId
      );

      expect(
        mockDBServiceHistoryRepository.createQueryBuilder().getOne
      ).toHaveBeenCalled();
      expect(result).toEqual(serviceHistory);
    });
  });

  describe('getInfoById', () => {
    it('should get service history by id', async () => {
      const id = 1;
      const serviceHistory = { id };

      mockDBServiceHistoryRepository.getOne.mockResolvedValueOnce(
        serviceHistory
      );

      const result = await serviceRepository.getInfoById(id);

      expect(
        mockDBServiceHistoryRepository.createQueryBuilder().getOne
      ).toHaveBeenCalled();
      expect(result).toEqual(serviceHistory);
    });
  });

  describe('getAllByProviderId', () => {
    it('should get all service histories by providerId', async () => {
      const providerId = 1;
      const serviceHistories = [{ id: 1 }, { id: 2 }];

      mockDBServiceHistoryRepository.getMany.mockResolvedValueOnce(
        serviceHistories
      );

      const result = await serviceRepository.getAllByProviderId(providerId);

      expect(
        mockDBServiceHistoryRepository.createQueryBuilder().getMany
      ).toHaveBeenCalled();
      expect(result).toEqual(serviceHistories);
    });
  });

  describe('update', () => {
    it('should update a service history', async () => {
      const id = 1;
      const payload = { version: '1.0.1' };
      const serviceHistory = { id };

      mockDBServiceHistoryRepository.create.mockReturnValueOnce(serviceHistory);
      mockDBServiceHistoryRepository.save.mockReturnValueOnce(serviceHistory);

      const result = await serviceRepository.update({ id, ...payload });

      expect(mockDBServiceHistoryRepository.create).toHaveBeenCalledWith({
        serviceId: id,
        ...payload,
      });
      expect(mockDBServiceHistoryRepository.save).toHaveBeenCalledWith(
        serviceHistory
      );
      expect(mockDBServiceRepository.update).toHaveBeenCalledWith(id, {
        lastHistoryId: serviceHistory.id,
      });
      expect(result).toBe(true);
    });
  });

  describe('deleteById', () => {
    it('should delete a service by id', async () => {
      const id = 1;
      const service = { id };

      mockDBServiceRepository.softDelete.mockReturnValueOnce(service);

      const result = await serviceRepository.deleteById(id);

      expect(mockDBServiceRepository.softDelete).toHaveBeenCalledWith({ id });
      expect(result).toBe(true);
    });
  });
});
