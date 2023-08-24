import type { Service, ServiceHistory } from '~backend/domain/service/entity';

type Payload = Omit<ServiceHistory, 'id' | 'serviceId' | 'version'>;

export type CreateServiceDTO = Omit<Service, 'id'> & Payload;

export type UpdateServiceDTO =
  | Partial<Payload> & {
      version: ServiceHistory['version'];
      id: Service['id'];
    };

export type CloseServiceDTO = Omit<Service, 'lastHistoryId'>;
