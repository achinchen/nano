export type ServiceOrder = {
  id: number;
  attendee: number;
  duration: number;
  name: string;
  address: string;
  supplier: string;
  times: string[];
  queue: boolean;
  expired: boolean;
};
