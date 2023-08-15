import type { Takeleave } from '~backend/domain/provider/entity';
import type { CreateTakeleaveDTO } from '~backend/domain/provider/dto';

export interface ITakeleaveRepository {
  create(payload: CreateTakeleaveDTO): Promise<Takeleave>;
  getById(id: Takeleave['id']): Promise<Takeleave>;
  getAllByProviderId(providerId: Takeleave['providerId']): Promise<Takeleave[]>;
  deleteById(id: Takeleave['id']): Promise<boolean>;
}
