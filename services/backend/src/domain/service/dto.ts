import type { Service, ServiceHistory } from '~backend/domain/service/entity';

export type CreateServiceDTO = Omit<Service, 'id'> &
  Omit<ServiceHistory, 'id' | 'serviceId' | 'version'>;
