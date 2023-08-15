import type { User } from '~backend/domain/user/entity';
import type { Supplier } from '~backend/domain/provider/entity';
import type { CreateSupplierDTO } from '~backend/domain/provider/dto';
import type { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import type { ISupplierRepository } from '~backend/domain/provider/repository/supplier/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW, INVALID } from '~backend/domain/provider/error';

type SupplierResult = Supplier;
export type Payload = Omit<CreateSupplierDTO, 'providerId'> & {
  userId: User['id'];
};
type Return = IResult<SupplierResult> | AppErrorUnexpected;

export class CreateSupplierUseCase
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

    const { userId, name, avatarUrl } = payload;
    if (!name) return Result.fail(INVALID);

    try {
      const provider = await this.providerRepository.getByOwnerId(userId);
      if (!provider) return Result.fail(NOT_ALLOW);

      const supplier = await this.supplierRepository.create({
        providerId: provider.id,
        name,
        avatarUrl,
      });

      return Result.ok<SupplierResult>(supplier);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
