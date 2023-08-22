import { ServiceHistory } from '~backend/domain/service/entity';
import { IServiceRepository } from '~backend/domain/service/repository/service/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/service/error';
import { ServiceAggregateRoot } from '~backend/domain/service/aggregate-root/service';
import versionValueObject from '~backend/domain/service/value-object/version';

jest.mock('~backend/domain/service/aggregate-root/service', () => ({
  ServiceAggregateRoot: {
    updateService: jest.fn(),
  },
}));

type Payload = Parameters<UpdateServiceUseCase['execute']>[0];

const mockServiceRepository = {
  getInfoByIdAndProviderId: jest.fn(),
  update: jest.fn(),
} as unknown as jest.Mocked<IServiceRepository>;

const mockServiceAggregateRoot = {
  updateService: ServiceAggregateRoot.updateService,
} as unknown as jest.Mocked<typeof ServiceAggregateRoot>;

import { UpdateServiceUseCase } from './implementation';

const updateServiceUseCase = new UpdateServiceUseCase(mockServiceRepository);

describe('UpdateServiceUseCase', () => {
  const id = 12;
  const providerId = 1;
  const version = '1.0.0';
  const targetVersion = versionValueObject.bumpMajor(version);
  const updatedPayload = {
    name: 'updated-service-name',
  };

  it('should return an error if the provider ID is missing', async () => {
    const payload = {
      id,
      ...updatedPayload,
    };

    const result = await updateServiceUseCase.execute(payload as Payload);

    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return an error if the service does not exist', async () => {
    mockServiceRepository.getInfoByIdAndProviderId.mockResolvedValue(null);

    const result = await updateServiceUseCase.execute({
      id,
      providerId,
      ...updatedPayload,
    });

    expect(result).toEqual(Result.fail(NOT_ALLOW));
    expect(mockServiceRepository.getInfoByIdAndProviderId).toHaveBeenCalledWith(
      id,
      providerId
    );
  });

  it('should return Result object with an error if there is an error creating the service', async () => {
    mockServiceRepository.getInfoByIdAndProviderId.mockResolvedValue({
      id,
      version,
    } as ServiceHistory);

    const errorMessage = 'Error updating service';

    mockServiceAggregateRoot.updateService.mockReturnValue(
      Result.fail(errorMessage)
    );

    const [error] = await updateServiceUseCase.execute({
      id,
      providerId,
      ...updatedPayload,
    });

    expect(error).toBe(errorMessage);
  });

  it('should update the service with the new version and payload', async () => {
    mockServiceRepository.getInfoByIdAndProviderId.mockResolvedValue({
      id,
      version,
    } as ServiceHistory);

    mockServiceAggregateRoot.updateService.mockReturnValue(
      Result.ok({
        version: targetVersion,
        ...updatedPayload,
      })
    );

    const [error] = await updateServiceUseCase.execute({
      id,
      providerId,
      ...updatedPayload,
    });

    expect(error).toBe(null);
    expect(mockServiceAggregateRoot.updateService).toHaveBeenCalledWith({
      version: targetVersion,
      ...updatedPayload,
    });
    expect(mockServiceRepository.update).toHaveBeenCalledWith({
      id,
      version: targetVersion,
      ...updatedPayload,
    });
  });
});
