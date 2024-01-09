import type { Service } from '~frontend/features/studio/types';
export type ServiceCreateResponse = Pick<Service, 'id' | 'name'>;

export type ServiceCreatePayload = Omit<
  Service,
  'supplier' | 'location' | 'id'
> & {
  supplierId: number;
  locationId: number;
  providerId: number;
  startAt: string;
  endAt: string;
};
