import type { Provider, Location } from '~backend/domain/provider/entity';
import type { CreateLocationDTO } from '~backend/domain/provider/dto';

export interface ILocationRepository {
  create(payload: CreateLocationDTO): Promise<Location>;
  getById(id: Location['id']): Promise<Location>;
  getAllByProviderId(id: Provider['id']): Promise<Location[]>;
  deleteById(id: Location['id']): Promise<boolean>;
}
