import type { User } from '~backend/domain/user/entity';
import type { Provider } from '~backend/domain/provider/entity';
import type { CreateProviderDTO } from '~backend/domain/provider/dto';
import type { IUserRepository } from '~backend/domain/user/repository/user/abstract';
import type { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW } from '~backend/domain/provider/error';

type ProviderResult = Provider;
export type Payload = Omit<CreateProviderDTO, 'ownerId'> & {
  userId: User['id'];
};
type Return = IResult<ProviderResult> | AppErrorUnexpected;

export class CreateProviderUseCase
  implements UseCase<Payload, Promise<Return>>
{
  private userRepository: IUserRepository;
  private providerRepository: IProviderRepository;

  constructor(
    userRepository: IUserRepository,
    providerRepository: IProviderRepository
  ) {
    this.userRepository = userRepository;
    this.providerRepository = providerRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    if (!payload.userId) return Result.fail(NOT_ALLOW);

    const { userId, description, name, slug } = payload;
    try {
      const isExist = await this.userRepository.getById(userId);
      if (!isExist) return Result.fail(NOT_ALLOW);

      const provider = await this.providerRepository.create({
        description,
        name,
        slug,
        ownerId: userId,
      });

      return Result.ok<ProviderResult>(provider);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
