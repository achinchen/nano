import type { ServiceStatus } from '~frontend/types';

export type Service = {
  name: string;
  id: number;
  serviceId: number;
  description: string;
  location: {
    name: string;
    address: string;
  };
  time?: string;
  attendee: number;
  duration: number;
  allday: boolean;
  supplier: string;
  status: ServiceStatus;
};
