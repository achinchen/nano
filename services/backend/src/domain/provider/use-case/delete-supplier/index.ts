import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { supplierRepository } from '~backend/domain/provider/repository/supplier/index';
import { DeleteSupplierUseCase } from './implementation';
export const deleteSupplierUseCase = new DeleteSupplierUseCase(
  providerRepository,
  supplierRepository
);
