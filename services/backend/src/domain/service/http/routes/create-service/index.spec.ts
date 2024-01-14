import { createServiceUseCase } from '~backend/domain/service/use-case/create-service';

jest.mock('~backend/domain/service/use-case/create-service', () => ({
  createServiceUseCase: {
    execute: jest.fn(),
  },
}));

import create from '.';

const mockCreateServiceUseCase = createServiceUseCase as jest.Mocked<
  typeof createServiceUseCase
>;

const req = {
  body: {
    name: 'Service Name',
  },
};

const res = {
  json: jest.fn(),
};

describe('create', () => {
  it('creates a service and return the result', async () => {
    const result = {
      id: '1',
      name: 'Service Name',
    } as unknown as Awaited<
      ReturnType<(typeof createServiceUseCase)['execute']>
    >[1];

    mockCreateServiceUseCase.execute.mockResolvedValue([null, result]);
    await create(req, res);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  it('should throw an error if the service creation fails', async () => {
    const json = jest.fn();
    const mockError = 'Service creation failed';

    mockCreateServiceUseCase.execute.mockResolvedValue([mockError]);
    await create(req, res).catch(() => {
      /* */
    });
    expect(json).not.toHaveBeenCalled();
  });
});
