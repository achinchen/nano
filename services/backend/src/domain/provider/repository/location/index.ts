import { LocationRepository } from './implementation';

export type { ILocationRepository } from './abstract';

export const locationRepository = new LocationRepository();
