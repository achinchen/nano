import { CreateTakeleaveDTO } from '~backend/domain/provider/dto';

const mockDBTakeleaveRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOneBy: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest.fn().mockReturnValue(mockDBTakeleaveRepository),
  },
}));

import { TakeleaveRepository } from './implementation';

describe('TakeleaveRepository', () => {
  const takeleaveRepository = new TakeleaveRepository();
  const payload: CreateTakeleaveDTO = {
    providerId: 456,
    startAt: new Date('2023/04/05'),
    endAt: new Date('2023/04/10'),
  };

  const takeleave = { ...payload, id: 1 };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a takeleave', async () => {
    mockDBTakeleaveRepository.create.mockReturnValueOnce(payload);
    mockDBTakeleaveRepository.save.mockResolvedValueOnce(takeleave);

    const result = await takeleaveRepository.create(payload);

    expect(mockDBTakeleaveRepository.create).toHaveBeenCalledWith(payload);
    expect(mockDBTakeleaveRepository.save).toHaveBeenCalledWith(payload);
    expect(result).toEqual(takeleave);
  });

  it('should get a takeleave by id', async () => {
    mockDBTakeleaveRepository.findOneBy.mockResolvedValueOnce(takeleave);

    const result = await takeleaveRepository.getById(takeleave.id);

    expect(mockDBTakeleaveRepository.findOneBy).toHaveBeenCalledWith({
      id: takeleave.id,
    });
    expect(result).toEqual(takeleave);
  });

  it('should get all takeleaveList by provider id', async () => {
    const takeleaveList = [takeleave, { ...takeleave, id: 2 }];
    mockDBTakeleaveRepository.find.mockResolvedValueOnce(takeleaveList);

    const result = await takeleaveRepository.getAllByProviderId(
      payload.providerId
    );

    expect(mockDBTakeleaveRepository.find).toHaveBeenCalledWith({
      where: { providerId: payload.providerId },
    });
    expect(result).toEqual(takeleaveList);
  });

  it('should delete a takeleave by id', async () => {
    mockDBTakeleaveRepository.delete.mockResolvedValueOnce(takeleave);

    const result = await takeleaveRepository.deleteById(takeleave.id);

    expect(mockDBTakeleaveRepository.delete).toHaveBeenCalledWith({
      id: takeleave.id,
    });
    expect(result).toBe(true);
  });
});
