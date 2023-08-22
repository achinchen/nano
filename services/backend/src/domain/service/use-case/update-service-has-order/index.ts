import { serviceRepository } from '~backend/domain/service/repository/service/index';
import { UpdateServiceHasOrderUseCase } from './implementation';
export const updateServiceHasOrderUseCase = new UpdateServiceHasOrderUseCase(
  serviceRepository
);
