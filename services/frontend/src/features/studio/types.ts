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

export type LooseLocationService = Omit<Service, 'location'> & {
  location: string;
};
