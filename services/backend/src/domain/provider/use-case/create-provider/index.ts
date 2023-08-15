import { userRepository } from '~backend/domain/user/repository/user';
import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { CreateProviderUseCase } from './implementation';
export const createProviderUseCase = new CreateProviderUseCase(
  userRepository,
  providerRepository
);
