import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { takeleaveRepository } from '~backend/domain/provider/repository/takeleave/index';
import { DeleteTakeleaveUseCase } from './implementation';
export const deleteTakeleaveUseCase = new DeleteTakeleaveUseCase(
  providerRepository,
  takeleaveRepository
);
