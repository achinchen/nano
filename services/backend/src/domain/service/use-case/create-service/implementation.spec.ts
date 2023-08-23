import { IServiceRepository } from '~backend/domain/service/repository/service/abstract';
import { Result } from '~backend/domain/shared/result';
import { NOT_ALLOW } from '~backend/domain/service/error';
import { ServiceAggregateRoot } from '~backend/domain/service/aggregate-root';

jest.mock('~backend/domain/service/aggregate-root', () => ({
  ServiceAggregateRoot: {
    createService: jest.fn(),
  },
}));

type Payload = Parameters<CreateServiceUseCase['execute']>[0];

const mockServiceRepository = {
  create: jest.fn(),
} as unknown as jest.Mocked<IServiceRepository>;

const mockServiceAggregateRoot = {
  createService: ServiceAggregateRoot.createService,
} as unknown as jest.Mocked<typeof ServiceAggregateRoot>;

import { CreateServiceUseCase } from './implementation';

const createServiceUseCase = new CreateServiceUseCase(mockServiceRepository);

describe('CreateServiceUseCase', () => {
  const payload: Payload = {
    providerId: 1,
    supplierId: 1,
    locationId: 1,
    fields: ['name', 'phone'],
    note: '',
    name: '提拉米蘇蛋糕',
    attendee: 10,
    allday: false,
    startAt: new Date('2021-09-01T10:00:00'),
    endAt: new Date('2021-09-30T11:00:00'),
    duration: new Date(),
    description: 'DIY提拉米蘇蛋糕',
  };

  const aggregateRootResult = {
    ...payload,
    version: '1.0.0',
  };

  const serviceHistory = {
    ...aggregateRootResult,
    serviceId: 1,
    id: 1,
  };

  it('should return a Result.fail if the payload does not have a providerId', async () => {
    const { providerId: _, ...payloadWithoutProviderId } = payload;
    const result = await createServiceUseCase.execute(
      payloadWithoutProviderId as Payload
    );
    expect(result).toEqual(Result.fail(NOT_ALLOW));
  });

  it('should return a Result object with an error if there is an error creating the service', async () => {
    const errorMessage = 'Error creating service';
    mockServiceAggregateRoot.createService.mockReturnValueOnce(
      Result.fail(errorMessage)
    );
    const [error] = await createServiceUseCase.execute(payload);
    expect(error).toBe(errorMessage);
  });

  it('should return a Result object with the service history if the service is created successfully', async () => {
    mockServiceAggregateRoot.createService.mockReturnValueOnce(
      Result.ok(aggregateRootResult)
    );
    mockServiceRepository.create.mockResolvedValueOnce(serviceHistory);
    const [error, result] = await createServiceUseCase.execute(payload);
    expect(error).toBe(null);
    expect(result).toEqual(serviceHistory);
  });
});
