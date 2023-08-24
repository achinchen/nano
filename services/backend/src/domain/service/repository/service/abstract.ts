import type { Service, ServiceHistory } from '~backend/domain/service/entity';
import type {
  CreateServiceDTO,
  UpdateServiceDTO,
} from '~backend/domain/service/dto';

export interface IServiceRepository {
  create(payload: CreateServiceDTO): Promise<ServiceHistory>;
  getByIdAndProviderId(
    id: Service['id'],
    providerId: Service['providerId']
  ): Promise<Service>;
  getInfoByIdAndProviderId(
    id: Service['id'],
    providerId: Service['providerId']
  ): Promise<ServiceHistory>;
  getInfoById(id: Service['id']): Promise<ServiceHistory>;
  getAllByProviderId(
    provider: Service['providerId']
  ): Promise<ServiceHistory[]>;
  update(payload: UpdateServiceDTO): Promise<boolean>;
  deleteById(id: Service['id']): Promise<boolean>;
}
