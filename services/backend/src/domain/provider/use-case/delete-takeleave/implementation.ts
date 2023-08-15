import type { User } from '~backend/domain/user/entity';
import type { Takeleave } from '~backend/domain/provider/entity';
import type { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import type { ITakeleaveRepository } from '~backend/domain/provider/repository/takeleave/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW } from '~backend/domain/provider/error';

type DeleteTakeleaveResult = boolean;
export type Payload = {
  id: Takeleave['id'];
  userId: User['id'];
};
type Return = IResult<DeleteTakeleaveResult> | AppErrorUnexpected;

export class DeleteTakeleaveUseCase
  implements UseCase<Payload, Promise<Return>>
{
  private providerRepository: IProviderRepository;
  private takeleaveRepository: ITakeleaveRepository;

  constructor(
    providerRepository: IProviderRepository,
    takeleaveRepository: ITakeleaveRepository
  ) {
    this.providerRepository = providerRepository;
    this.takeleaveRepository = takeleaveRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    if (!payload.userId) return Result.fail(NOT_ALLOW);

    const { userId, id } = payload;
    try {
      const provider = await this.providerRepository.getByOwnerId(userId);
      if (!provider) return Result.fail(NOT_ALLOW);

      const takeleave = await this.takeleaveRepository.getById(id);
      if (takeleave?.providerId !== provider.id) return Result.fail(NOT_ALLOW);

      const result = await this.takeleaveRepository.deleteById(id);
      return Result.ok<DeleteTakeleaveResult>(result);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
