import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { locationRepository } from '~backend/domain/provider/repository/location/index';
import { CreateLocationUseCase } from './implementation';
export const createTakeleaveUseCase = new CreateLocationUseCase(
  providerRepository,
  locationRepository
);
