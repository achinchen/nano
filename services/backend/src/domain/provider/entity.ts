export class Provider {
  constructor(
    public id: number,
    public name: string,
    public slug: string,
    public description: string,
    public ownerId: number,
    public avatarUrl: string,
    public SNSId: string,
    public email: string,
    public openAt: Date,
    public openDuration: number
  ) {}
}

export class Takeleave {
  constructor(
    public id: number,
    public startAt: Date,
    public endAt: Date,
    public providerId: number
  ) {}
}

export class Location {
  constructor(
    public id: number,
    public name: string,
    public address: string,
    public providerId: number
  ) {}
}

export class Supplier {
  constructor(
    public id: number,
    public name: string,
    public avatarUrl: string,
    public providerId: number
  ) {}
}
