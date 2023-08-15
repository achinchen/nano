import type { User } from '~backend/domain/user/entity';
import type { Takeleave } from '~backend/domain/provider/entity';
import type { CreateTakeleaveDTO } from '~backend/domain/provider/dto';
import type { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import type { ITakeleaveRepository } from '~backend/domain/provider/repository/takeleave/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW, INVALID } from '~backend/domain/provider/error';

type TakeleaveResult = Takeleave;
export type Payload = Omit<CreateTakeleaveDTO, 'providerId'> & {
  userId: User['id'];
};
type Return = IResult<TakeleaveResult> | AppErrorUnexpected;

export class CreateTakeleaveUseCase
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

    const { userId, endAt, startAt } = payload;
    try {
      const provider = await this.providerRepository.getByOwnerId(userId);
      if (!provider) return Result.fail(NOT_ALLOW);

      const isValid = endAt > startAt;
      if (!isValid) return Result.fail(INVALID);

      const takeleave = await this.takeleaveRepository.create({
        providerId: provider.id,
        endAt,
        startAt,
      });

      return Result.ok<TakeleaveResult>(takeleave);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
