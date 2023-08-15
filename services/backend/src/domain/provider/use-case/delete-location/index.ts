import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { locationRepository } from '~backend/domain/provider/repository/location/index';
import { DeleteLocationUseCase } from './implementation';
export const deleteLocationUseCase = new DeleteLocationUseCase(
  providerRepository,
  locationRepository
);
