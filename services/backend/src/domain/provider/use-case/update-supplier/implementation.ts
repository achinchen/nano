import type { User } from '~backend/domain/user/entity';
import type { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import type { ISupplierRepository } from '~backend/domain/provider/repository/supplier/abstract';
import type { UpdateProviderDTO } from '~backend/domain/provider/dto';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW } from '~backend/domain/provider/error';

type UpdateSupplierResult = boolean;
export type Payload = Omit<UpdateProviderDTO, 'provideId'> & {
  userId: User['id'];
};
type Return = IResult<UpdateSupplierResult> | AppErrorUnexpected;

export class UpdateSupplierUseCase
  implements UseCase<Payload, Promise<Return>>
{
  private providerRepository: IProviderRepository;
  private supplierRepository: ISupplierRepository;

  constructor(
    providerRepository: IProviderRepository,
    supplierRepository: ISupplierRepository
  ) {
    this.providerRepository = providerRepository;
    this.supplierRepository = supplierRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    if (!payload.userId) return Result.fail(NOT_ALLOW);

    const { userId, id, name, avatarUrl } = payload;
    try {
      const provider = await this.providerRepository.getByOwnerId(userId);
      if (!provider) return Result.fail(NOT_ALLOW);

      const supplier = await this.supplierRepository.getById(id);
      if (supplier?.providerId !== provider.id) return Result.fail(NOT_ALLOW);
      const result = await this.supplierRepository.update({
        id,
        name,
        avatarUrl,
      });

      return Result.ok<UpdateSupplierResult>(result);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
