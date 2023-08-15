import type { Provider } from '~backend/domain/provider/entity';
import type { IProviderRepository } from '~backend/domain/provider/repository/provider/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import { NOT_ALLOW } from '~backend/domain/provider/error';

type ProviderResult = Provider;
export type Payload = {
  id: Provider['id'];
};
type Return = IResult<ProviderResult> | AppErrorUnexpected;

export class GetProviderUseCase implements UseCase<Payload, Promise<Return>> {
  private providerRepository: IProviderRepository;

  constructor(providerRepository: IProviderRepository) {
    this.providerRepository = providerRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    if (!payload.id) return Result.fail(NOT_ALLOW);

    try {
      const provider = await this.providerRepository.getById(payload.id);
      return Result.ok<ProviderResult>(provider);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
