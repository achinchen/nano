import type { Service, ServiceHistory } from '~backend/domain/service/entity';
import type { CreateServiceDTO } from '~backend/domain/service/dto';

export interface IServiceRepository {
  create(payload: CreateServiceDTO): Promise<ServiceHistory>;
  getInfoById(id: Service['id']): Promise<ServiceHistory>;
  getAllByProviderId(
    provider: Service['providerId']
  ): Promise<ServiceHistory[]>;
}
