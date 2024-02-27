export type Service = {
  name: string;
  id: number;
  description: string;
  location: {
    name: string;
    address: string;
  };
  allday: boolean;
  attendee: number;
  duration: number;
  queue: boolean;
  supplier: string;
};

export type ServiceDetail = Service & {
  currentAttendee: number;
  startAt: string;
  endAt: string;
};

export type LooseLocationService = Omit<Service, 'location'> & {
  location: string;
};

export type Order = {
  id: number;
  startAt: string;
  service: Pick<
    ServiceDetail,
    'name' | 'id' | 'duration' | 'attendee' | 'currentAttendee'
  >;
};

export type OrderDetail = Order & {
  userId: number;
  name: string;
  SNSId: string;
  email: string;
  phone: string;
  comment: string;
  note: {
    updateAt: string;
    content: string;
  };
};
