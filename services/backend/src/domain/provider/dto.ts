import type {
  Takeleave,
  Provider,
  Location,
  Supplier,
} from '~backend/domain/provider/entity';

export type CreateProviderDTO = Omit<Provider, 'id'>;
export type CreateTakeleaveDTO = Omit<Takeleave, 'id'>;
export type CreateLocationDTO = Omit<Location, 'id'>;
export type CreateSupplierDTO = Omit<Supplier, 'id'>;
export type UpdateProviderDTO = Partial<Supplier> & {
  id: Supplier['id'];
};
