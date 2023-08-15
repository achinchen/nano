import type { Takeleave, Provider } from '~backend/domain/provider/entity';

export type CreateProviderDTO = Omit<Provider, 'id'>;
export type CreateTakeleaveDTO = Omit<Takeleave, 'id'>;
