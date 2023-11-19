import type { Service } from '~frontend/features/booking/types';

export type ServiceCardProps = Omit<Service, 'location' | 'description'> &
  Pick<Service['location'], 'address'>;
