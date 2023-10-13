export class Service {
  constructor(
    public id: number,
    public providerId: number,
    public lastHistoryId?: number
  ) {}
}

const FIELDS = ['name', 'email', 'SNSId', 'phone'] as const;
export type Field = (typeof FIELDS)[number];

export class ServiceHistory {
  constructor(
    public id: number,
    public version: string,
    public name: string,
    public supplierId: number,
    public locationId: number,
    public description: string,
    public duration: Date,
    public attendee: number,
    public allday: boolean,
    public startAt: Date,
    public endAt: Date,
    public queue: boolean,
    public fields: Field[],
    public note: string,
    public serviceId: number
  ) {}
}
