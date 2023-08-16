import type { Service, ServiceHistory } from '~backend/domain/service/entity';

export type CreateServiceDTO = Omit<Service, 'id'>;
export type CreateServiceHistoryDTO = Omit<ServiceHistory, 'id'>;
