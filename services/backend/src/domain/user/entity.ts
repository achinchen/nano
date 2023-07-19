export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public emailVerified: string,
    public phone: string
  ) {}
}

export class UserFederatedCredentials {
  constructor(
    public id: string,
    public userId: string,
    public provider: string,
    public subject: string
  ) {}
}
