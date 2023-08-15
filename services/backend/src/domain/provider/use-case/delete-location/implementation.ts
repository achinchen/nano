import type { User } from '~backend/domain/user/entity';
import type { Location } from '~backend/domain/provider/entity';
import type { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import type { ILocationRepository } from '~backend/domain/provider/repository/location/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW } from '~backend/domain/provider/error';

type DeleteLocationResult = boolean;
export type Payload = {
  id: Location['id'];
  userId: User['id'];
};
type Return = IResult<DeleteLocationResult> | AppErrorUnexpected;

export class DeleteLocationUseCase
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

    const { userId, id } = payload;
    try {
      const provider = await this.providerRepository.getByOwnerId(userId);
      if (!provider) return Result.fail(NOT_ALLOW);

      const location = await this.locationRepository.getById(id);
      if (location?.providerId !== provider.id) return Result.fail(NOT_ALLOW);

      const result = await this.locationRepository.deleteById(id);
      return Result.ok<DeleteLocationResult>(result);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
