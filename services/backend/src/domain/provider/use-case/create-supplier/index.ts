import { providerRepository } from '~backend/domain/provider/repository/provider/index';
import { supplierRepository } from '~backend/domain/provider/repository/supplier/index';
import { CreateSupplierUseCase } from './implementation';
export const createSupplierUseCase = new CreateSupplierUseCase(
  providerRepository,
  supplierRepository
);
