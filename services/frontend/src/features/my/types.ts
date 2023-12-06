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

export type Order = {
  id: string;
  name: string;
  queues: string[];
  duration: number;
  updatedAt: string;
  status: 'end' | 'request' | 'coming';
};
