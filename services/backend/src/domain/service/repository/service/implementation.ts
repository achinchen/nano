import type { Service } from '~backend/domain/service/entity';
import type { IServiceRepository } from './abstract';
import { dataSource } from '~backend/data-source';
import { Service as DBService } from '~backend/domain/service/infra/db/service';
import { CreateServiceDTO } from '~backend/domain/service/dto';

const serviceRepository = dataSource.getRepository(DBService);

export class ServiceRepository implements IServiceRepository {
  async create(payload: CreateServiceDTO): Promise<Service> {
    const servicePayload = serviceRepository.create(payload);
    const service = await serviceRepository.save(servicePayload);
    return service;
  }

  async getById(id: Service['id']): Promise<Service> {
    const service = await serviceRepository.findOneBy({ id });
    return service;
  }

  async getAllByProviderId(
    providerId: Service['providerId']
  ): Promise<Service[]> {
    const services = await serviceRepository.find({ where: { providerId } });
    return services;
  }

  async deleteById(id: Service['id']): Promise<boolean> {
    const service = await serviceRepository.softDelete({ id });
    return Boolean(service);
  }
}
