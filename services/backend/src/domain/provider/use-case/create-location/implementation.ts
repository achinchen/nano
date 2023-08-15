import type { User } from '~backend/domain/user/entity';
import type { Location } from '~backend/domain/provider/entity';
import type { CreateLocationDTO } from '~backend/domain/provider/dto';
import type { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import type { ILocationRepository } from '~backend/domain/provider/repository/location/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW, INVALID } from '~backend/domain/provider/error';

type LocationResult = Location;
export type Payload = Omit<CreateLocationDTO, 'providerId'> & {
  userId: User['id'];
};
type Return = IResult<LocationResult> | AppErrorUnexpected;

export class CreateLocationUseCase
  implements UseCase<Payload, Promise<Return>>
{
  private providerRepository: IProviderRepository;
  private locationRepository: ILocationRepository;

  constructor(
    providerRepository: IProviderRepository,
    locationRepository: ILocationRepository
  ) {
    this.providerRepository = providerRepository;
    this.locationRepository = locationRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    if (!payload.userId) return Result.fail(NOT_ALLOW);

    const { userId, name, address } = payload;
    if (!name || !address) return Result.fail(INVALID);

    try {
      const provider = await this.providerRepository.getByOwnerId(userId);
      if (!provider) return Result.fail(NOT_ALLOW);

      const location = await this.locationRepository.create({
        providerId: provider.id,
        name,
        address,
      });

      return Result.ok<LocationResult>(location);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
