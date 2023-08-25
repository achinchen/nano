export const STATES = [
  'finished',
  'canceled',
  'rejected',
  'accepted',
  'requested',
] as const;
export type State = (typeof STATES)[number];

const FIELDS = ['name', 'email', 'SNSId', 'phone'] as const;
export type Field = Partial<{ [key in (typeof FIELDS)[number]]: string }>;

export class Order {
  constructor(
    public id: number,
    public attendee: number,
    public queueDateTime: Date[],
    public field: Field,
    public note: string,
    public startAt: Date,
    public providerId: number,
    public serviceHistoryId: number,
    public userId: number,
    public state: State,
    public serviceId: number,
    public noteUpdatedAt: Date
  ) {}
}
