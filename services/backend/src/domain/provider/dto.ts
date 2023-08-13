import type { Provider } from '~backend/domain/provider/entity';

export type CreateProviderDTO = Omit<Provider, 'id'>;
