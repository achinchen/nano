import { serviceRepository } from '~backend/domain/service/repository/service/index';
import { UpdateServiceUseCase } from './implementation';
export const updateServiceUseCase = new UpdateServiceUseCase(serviceRepository);
