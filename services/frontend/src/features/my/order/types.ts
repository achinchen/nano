import OrderDetail from './OrderDetail';

export type Service = {
  name: string;
  id: number;
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

export type ServiceDetail = Service & {
  currentAttendee: number;
  startAt: string;
  endAt: string;
};

export type OrderStatus = 'end' | 'request' | 'coming';

export type Order = {
  id: number;
  startAt: string;
  updateAt: string;
  service: Pick<
    ServiceDetail,
    | 'name'
    | 'id'
    | 'duration'
    | 'attendee'
    | 'currentAttendee'
    | 'supplier'
    | 'description'
    | 'location'
  >;
};

export type Queue = {
  currentAttendee: number;
  startAt: string;
  disabled: boolean;
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
  queues?: Queue[];
};

export type OrderDetailWithStatus = OrderDetail & { status: OrderStatus };
