import type { Provider } from '~backend/domain/provider/entity';
import type {
  CreateProviderDTO,
  ProviderDetailDTO,
} from '~backend/domain/provider/dto';

export interface IProviderRepository {
  create(payload: CreateProviderDTO): Promise<Provider>;
  getById(id: Provider['id']): Promise<Provider>;
  getByOwnerId(id: Provider['ownerId']): Promise<Provider>;
  deleteById(id: Provider['id']): Promise<boolean>;
  getDetailByOwnerId(id: Provider['ownerId']): Promise<ProviderDetailDTO>;
}
