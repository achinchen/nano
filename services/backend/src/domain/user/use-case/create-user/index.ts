import { userRepository } from '~backend/domain/user/repository/user';
import { userFederatedCredentialRepository } from '~backend/domain/user/repository/user-federated-credential';
import { CreateUserUseCase } from './implementation';
export const createUserUseCase = new CreateUserUseCase(
  userRepository,
  userFederatedCredentialRepository
);
