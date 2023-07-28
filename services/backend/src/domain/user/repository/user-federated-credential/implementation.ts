import type { UserFederatedCredential } from '~backend/domain/user/entity';
import type { CreateUserFederatedCredentialDTO } from '~backend/domain/user/dto';
import { dataSource } from '~backend/data-source';
import { UserFederatedCredential as DBUserFederatedCredential } from '~backend/domain/user/infra/db/user-federated-credential';
import { GetPayload, IUserFederatedCredentialRepository } from './abstract';

const userFederatedCredentialRepository = dataSource.getRepository(
  DBUserFederatedCredential
);

export class UserFederatedCredentialRepository
  implements IUserFederatedCredentialRepository
{
  async create(payload: CreateUserFederatedCredentialDTO): Promise<void> {
    const userFederatedCredentialPayload =
      userFederatedCredentialRepository.create(payload);
    await userFederatedCredentialRepository.save(
      userFederatedCredentialPayload
    );
  }

  async getByProviderAndSubject({
    provider,
    subject,
  }: GetPayload): Promise<UserFederatedCredential> {
    const userFederatedCredential =
      await userFederatedCredentialRepository.findOneBy({ provider, subject });
    return userFederatedCredential;
  }
}
