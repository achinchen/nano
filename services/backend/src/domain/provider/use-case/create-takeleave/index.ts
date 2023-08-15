import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { takeleaveRepository } from '~backend/domain/provider/repository/takeleave/index';
import { CreateTakeleaveUseCase } from './implementation';
export const createTakeleaveUseCase = new CreateTakeleaveUseCase(
  providerRepository,
  takeleaveRepository
);
