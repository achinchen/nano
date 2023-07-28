import type { UserFederatedCredential } from '~backend/domain/user/entity';
import type { CreateUserFederatedCredentialDTO } from '~backend/domain/user/dto';

export type GetPayload = Pick<UserFederatedCredential, 'provider' | 'subject'>;

export interface IUserFederatedCredentialRepository {
  create(payload: CreateUserFederatedCredentialDTO): Promise<void>;
  getByProviderAndSubject(
    payload: GetPayload
  ): Promise<Omit<UserFederatedCredential, 'userId'>>;
}
