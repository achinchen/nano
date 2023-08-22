import type { Service, ServiceHistory } from '~backend/domain/service/entity';
import type {
  CreateServiceDTO,
  UpdateServiceDTO,
} from '~backend/domain/service/dto';

export interface IServiceRepository {
  create(payload: CreateServiceDTO): Promise<ServiceHistory>;
  getInfoByIdAndProviderId(
    id: Service['id'],
    providerId: Service['providerId']
  ): Promise<ServiceHistory>;
  getInfoById(id: Service['id']): Promise<ServiceHistory>;
  getAllByProviderId(
    provider: Service['providerId']
  ): Promise<ServiceHistory[]>;
  update(payload: UpdateServiceDTO): Promise<boolean>;
}
