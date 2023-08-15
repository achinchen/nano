import type { Provider, Location } from '~backend/domain/provider/entity';
import type { ILocationRepository } from './abstract';
import { dataSource } from '~backend/data-source';
import { Location as DBLocation } from '~backend/domain/provider/infra/db/location';
import { CreateLocationDTO } from '~backend/domain/provider/dto';

const locationRepository = dataSource.getRepository(DBLocation);

export class LocationRepository implements ILocationRepository {
  async create(payload: CreateLocationDTO): Promise<Location> {
    const locationPayload = locationRepository.create(payload);
    const location = await locationRepository.save(locationPayload);
    return location;
  }

  async getById(id: Location['id']): Promise<Location> {
    const location = await locationRepository.findOneBy({ id });
    return location;
  }

  async getAllByProviderId(providerId: Provider['id']): Promise<Location[]> {
    const locations = await locationRepository.find({
      where: { providerId },
    });
    return locations;
  }

  async deleteById(id: Location['id']): Promise<boolean> {
    const location = await locationRepository.softDelete({ id });
    return Boolean(location);
  }
}
