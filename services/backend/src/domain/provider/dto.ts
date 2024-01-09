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

export type ProviderDetailDTO = Pick<
  Provider,
  | 'description'
  | 'name'
  | 'id'
  | 'slug'
  | 'avatarUrl'
  | 'SNSId'
  | 'email'
  | 'openAt'
  | 'openDuration'
> & {
  location: Pick<Location, 'id' | 'name' | 'address'>;
  suppliers: Pick<Supplier, 'id' | 'name' | 'avatarUrl'>[];
};
