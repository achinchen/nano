import { CreateSupplierDTO } from '~backend/domain/provider/dto';

const mockDBSupplierRepository = {
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findOneBy: jest.fn(),
  softDelete: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest.fn().mockReturnValue(mockDBSupplierRepository),
  },
}));

import { SupplierRepository } from './implementation';

describe('SupplierRepository', () => {
  const supplierRepository = new SupplierRepository();
  const payload: CreateSupplierDTO = {
    providerId: 456,
    name: 'John Doe',
    avatarUrl: 'https://example.com/avatar.png',
  };

  const supplier = { ...payload, id: 1 };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a supplier', async () => {
    mockDBSupplierRepository.create.mockReturnValueOnce(payload);
    mockDBSupplierRepository.save.mockResolvedValueOnce(supplier);

    const result = await supplierRepository.create(payload);

    expect(mockDBSupplierRepository.create).toHaveBeenCalledWith(payload);
    expect(mockDBSupplierRepository.save).toHaveBeenCalledWith(payload);
    expect(result).toEqual(supplier);
  });

  it('should get a supplier by id', async () => {
    mockDBSupplierRepository.findOneBy.mockResolvedValueOnce(supplier);

    const result = await supplierRepository.getById(supplier.id);

    expect(mockDBSupplierRepository.findOneBy).toHaveBeenCalledWith({
      id: supplier.id,
    });
    expect(result).toEqual(supplier);
  });

  it('should update a supplier', async () => {
    const name = 'Jane Doe';
    const newSupplier = { ...supplier, name };
    mockDBSupplierRepository.update.mockResolvedValueOnce(newSupplier);

    const result = await supplierRepository.update(newSupplier);

    expect(mockDBSupplierRepository.update).toHaveBeenCalledWith(
      {
        id: newSupplier.id,
      },
      {
        name: newSupplier.name,
        avatarUrl: newSupplier.avatarUrl,
        providerId: newSupplier.providerId,
      }
    );
    expect(result).toEqual(true);
  });

  it('should get all suppliers by provider id', async () => {
    const suppliers = [supplier, { ...supplier, id: 2 }];
    mockDBSupplierRepository.find.mockResolvedValueOnce(suppliers);

    const result = await supplierRepository.getAllByProviderId(
      payload.providerId
    );

    expect(mockDBSupplierRepository.find).toHaveBeenCalledWith({
      where: { providerId: payload.providerId },
    });
    expect(result).toEqual(suppliers);
  });

  it('should delete a supplier by id', async () => {
    mockDBSupplierRepository.softDelete.mockResolvedValueOnce(supplier);

    const result = await supplierRepository.deleteById(supplier.id);

    expect(mockDBSupplierRepository.softDelete).toHaveBeenCalledWith({
      id: supplier.id,
    });
    expect(result).toBe(true);
  });
});
