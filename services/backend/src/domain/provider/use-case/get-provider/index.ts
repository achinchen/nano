import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { GetProviderUseCase } from './implementation';
export const getProviderUseCase = new GetProviderUseCase(providerRepository);
