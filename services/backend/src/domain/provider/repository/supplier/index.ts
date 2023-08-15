import { SupplierRepository } from './implementation';

export type { ISupplierRepository } from './abstract';

export const supplierRepository = new SupplierRepository();
