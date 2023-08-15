import type { Provider, Supplier } from '~backend/domain/provider/entity';
import type {
  CreateSupplierDTO,
  UpdateProviderDTO,
} from '~backend/domain/provider/dto';

export interface ISupplierRepository {
  create(payload: CreateSupplierDTO): Promise<Supplier>;
  getById(id: Supplier['id']): Promise<Supplier>;
  update(payload: UpdateProviderDTO): Promise<boolean>;
  getAllByProviderId(id: Provider['id']): Promise<Supplier[]>;
  deleteById(id: Supplier['id']): Promise<boolean>;
}
