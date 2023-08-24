import { ServiceRepository } from './implementation';

export type { IServiceRepository } from './abstract';

export const serviceRepository = new ServiceRepository();
