import type { Service } from '~backend/domain/service/entity';
import type { CreateServiceDTO } from '~backend/domain/service/dto';

export interface IServiceRepository {
  create(payload: CreateServiceDTO): Promise<Service>;
  getById(id: Service['id']): Promise<Service>;
  getAllByProviderId(provider: Service['providerId']): Promise<Service[]>;
  deleteById(id: Service['id']): Promise<boolean>;
}
