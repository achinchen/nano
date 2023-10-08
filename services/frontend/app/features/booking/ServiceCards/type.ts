import type { Status } from '~frontend/features/booking/components/StatusTag/type';

export type ServiceCardProps = {
  name: string;
  id: number;
  time?: string;
  attendee: number;
  duration: number;
  allday: boolean;
  location: string;
  supplier: string;
  status: Status;
};
