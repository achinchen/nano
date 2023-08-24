import { serviceRepository } from '~backend/domain/service/repository/service/index';
import { CreateServiceUseCase } from './implementation';
export const createServiceUseCase = new CreateServiceUseCase(serviceRepository);
