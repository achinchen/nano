import type { Provider, Supplier } from '~backend/domain/provider/entity';
import type { ISupplierRepository } from './abstract';
import { dataSource } from '~backend/data-source';
import { Supplier as DBSupplier } from '~backend/domain/provider/infra/db/supplier';
import {
  CreateSupplierDTO,
  UpdateProviderDTO,
} from '~backend/domain/provider/dto';

const supplierRepository = dataSource.getRepository(DBSupplier);

export class SupplierRepository implements ISupplierRepository {
  async create(payload: CreateSupplierDTO): Promise<Supplier> {
    const supplierPayload = supplierRepository.create(payload);
    const supplier = await supplierRepository.save(supplierPayload);
    return supplier;
  }

  async getById(id: Supplier['id']): Promise<Supplier> {
    const supplier = await supplierRepository.findOneBy({ id });
    return supplier;
  }

  async update({ id, ...payload }: UpdateProviderDTO): Promise<boolean> {
    const supplier = {};
    Object.entries(payload).forEach(([key, value]) => {
      if (value) supplier[key] = value;
    });

    const result = await supplierRepository.update(
      {
        id,
      },
      payload
    );

    return Boolean(result);
  }

  async getAllByProviderId(providerId: Provider['id']): Promise<Supplier[]> {
    const suppliers = await supplierRepository.find({
      where: { providerId },
    });
    return suppliers;
  }

  async deleteById(id: Supplier['id']): Promise<boolean> {
    const supplier = await supplierRepository.softDelete({ id });
    return Boolean(supplier);
  }
}
