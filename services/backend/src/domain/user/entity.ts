export class User {
  constructor(
    public id: number,
    public nickname: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string
  ) {}
}

export const FEDERATED_CREDENTIALS = ['google', 'facebook', 'apple'];
export type FederatedCredentialProvider =
  (typeof FEDERATED_CREDENTIALS)[number];

export class UserFederatedCredential {
  constructor(
    public id: number,
    public userId: number,
    public provider: FederatedCredentialProvider,
    public subject: string
  ) {}
}
