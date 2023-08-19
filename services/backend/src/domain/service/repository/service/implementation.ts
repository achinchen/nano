import type { IServiceRepository } from './abstract';
import { Service, ServiceHistory } from '~backend/domain/service/entity';
import { dataSource } from '~backend/data-source';
import { Service as DBService } from '~backend/domain/service/infra/db/service';
import { ServiceHistory as DBServiceHistory } from '~backend/domain/service/infra/db/service-history';
import { CreateServiceDTO } from '~backend/domain/service/dto';

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

  async getInfoById(id: Service['id']): Promise<ServiceHistory> {
    const serviceHistory = await serviceHistoryRepository
      .createQueryBuilder('serviceHistory')
      .innerJoinAndMapOne(
        'service',
        DBService,
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

    console.log('serviceHistory', serviceHistory);
    return serviceHistory;
  }
}
