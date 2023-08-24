import { serviceRepository } from '~backend/domain/service/repository/service/index';
import { CloseServiceUseCase } from './implementation';
export const closeServiceUseCase = new CloseServiceUseCase(serviceRepository);
