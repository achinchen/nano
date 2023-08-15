import type {
  Takeleave,
  Provider,
  Location,
} from '~backend/domain/provider/entity';

export type CreateProviderDTO = Omit<Provider, 'id'>;
export type CreateTakeleaveDTO = Omit<Takeleave, 'id'>;
export type CreateLocationDTO = Omit<Location, 'id'>;
