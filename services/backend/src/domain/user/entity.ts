export class User {
  constructor(
    public nickname: string,
    public firstName: string,
    public lastName: string,
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
