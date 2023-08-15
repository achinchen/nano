import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { supplierRepository } from '~backend/domain/provider/repository/supplier/index';
import { UpdateSupplierUseCase } from './implementation';
export const updateSupplierUseCase = new UpdateSupplierUseCase(
  providerRepository,
  supplierRepository
);
