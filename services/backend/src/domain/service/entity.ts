export class Service {
  constructor(
    public id: number,
    public lastHistoryId: number,
    public providerId: number
  ) {}
}

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
    public fields: string[],
    public note: string,
    public serviceId: number
  ) {}
}
