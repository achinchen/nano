export type ServiceOrder = {
  serviceId: number;
  attendee: number;
  duration: number;
  name: string;
  location: {
    name: string;
    address: string;
  };
  supplier: string;
  times: string[];
  queue: boolean;
  expired: boolean;
};
