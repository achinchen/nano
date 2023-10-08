import type { Service } from '~frontend/features/booking/type';

export type ServiceCardProps = Omit<Service, 'location' | 'description'> &
  Pick<Service['location'], 'address'>;
