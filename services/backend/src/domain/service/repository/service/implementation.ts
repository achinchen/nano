import type { IServiceRepository } from './abstract';
import { Service, ServiceHistory } from '~backend/domain/service/entity';
import { dataSource } from '~backend/data-source';
import { Service as DBService } from '~backend/domain/service/infra/db/service';
import { ServiceHistory as DBServiceHistory } from '~backend/domain/service/infra/db/service-history';
import {
  CreateServiceDTO,
  UpdateServiceDTO,
} from '~backend/domain/service/dto';

const serviceRepository = dataSource.getRepository(DBService);
const serviceHistoryRepository = dataSource.getRepository(DBServiceHistory);

export class ServiceRepository implements IServiceRepository {
  async create(payload: CreateServiceDTO): Promise<ServiceHistory> {
    const { providerId, ...resetPayload } = payload;
    const servicePayload = serviceRepository.create({ providerId });
    const service = await serviceRepository.save(servicePayload);

    const serviceHistoryPayload = serviceHistoryRepository.create({
      serviceId: service.id,
      ...resetPayload,
    });
    const serviceHistory = await serviceHistoryRepository.save(
      serviceHistoryPayload
    );

    await serviceRepository.update(service.id, {
      lastHistoryId: serviceHistory.id,
    });

    return serviceHistory;
  }

  async getByIdAndProviderId(
    id: Service['id'],
    providerId: Service['providerId']
  ) {
    const service = await serviceRepository.findOneBy({ id, providerId });
    return service;
  }

  async getInfoByIdAndProviderId(
    id: Service['id'],
    providerId: Service['providerId']
  ): Promise<ServiceHistory> {
    const serviceHistory = await serviceHistoryRepository
      .createQueryBuilder('serviceHistory')
      .innerJoinAndSelect(
        DBService,
        'service',
        'service.lastHistoryId = serviceHistory.id'
      )
      .where(
        'serviceHistory.serviceId = :id and service.providerId = :providerId',
        { id, providerId }
      )
      .getOne();

    return serviceHistory;
  }

  async getInfoById(id: Service['id']): Promise<ServiceHistory> {
    const serviceHistory = await serviceHistoryRepository
      .createQueryBuilder('serviceHistory')
      .innerJoinAndSelect(
        DBService,
        'service',
        'service.lastHistoryId = serviceHistory.id'
      )
      .where('serviceHistory.serviceId = :id', { id })
      .getOne();

    return serviceHistory;
  }

  async getAllByProviderId(
    providerId: Service['providerId']
  ): Promise<ServiceHistory[]> {
    // TODO: paginated
    const serviceHistory = await serviceHistoryRepository
      .createQueryBuilder('serviceHistory')
      .leftJoinAndSelect(
        DBService,
        'service',
        'service.lastHistoryId = serviceHistory.id'
      )
      .where('service.providerId = :providerId', { providerId })
      .orderBy('serviceHistory.createdAt', 'DESC')
      .cache(true)
      .getMany();

    return serviceHistory;
  }

  async update({ id, ...payload }: UpdateServiceDTO): Promise<boolean> {
    const serviceHistoryPayload = serviceHistoryRepository.create({
      serviceId: id,
      ...payload,
    });
    const serviceHistory = await serviceHistoryRepository.save(
      serviceHistoryPayload
    );

    await serviceRepository.update(id, {
      lastHistoryId: serviceHistory.id,
    });

    return Boolean(serviceHistory);
  }

  async deleteById(id: Service['id']): Promise<boolean> {
    const service = await serviceRepository.softDelete({ id });
    return Boolean(service);
  }
}
