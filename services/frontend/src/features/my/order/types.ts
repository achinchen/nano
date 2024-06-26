export type Service = {
  name: string;
  id: string;
  description: string;
  location: {
    name: string;
    address: string;
  };
  attendee: number;
  duration: number;
  queue: boolean;
  supplier: string;
};

export type OrderStatus = 'end' | 'request' | 'coming';

export type Order = {
  id: string;
  name: string;
  queues: string[];
  duration: number;
  updatedAt: string;
  status: OrderStatus;
};
