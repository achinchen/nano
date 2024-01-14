import type { Provider } from '~backend/domain/provider/entity';
import type { IProviderRepository } from '../abstract';
import { dataSource } from '~backend/data-source';
import { Provider as DBProvider } from '~backend/domain/provider/infra/db/provider';
import { Supplier as DBSupplier } from '~backend/domain/provider/infra/db/supplier';
import { Location as DBLocation } from '~backend/domain/provider/infra/db/location';
import {
  CreateProviderDTO,
  ProviderDetailDTO,
} from '~backend/domain/provider/dto';

const providerRepository = dataSource.getRepository(DBProvider);
const supplierRepository = dataSource.getRepository(DBSupplier);
const locationRepository = dataSource.getRepository(DBLocation);
export class ProviderRepository implements IProviderRepository {
  async create(payload: CreateProviderDTO): Promise<Provider> {
    const providerPayload = providerRepository.create(payload);
    const provider = await providerRepository.save(providerPayload);
    return provider;
  }

  async getById(id: Provider['id']): Promise<Provider> {
    const provider = await providerRepository.findOneBy({ id });
    return provider;
  }

  async getByOwnerId(ownerId: Provider['ownerId']): Promise<Provider> {
    const provider = await providerRepository.findOneBy({ ownerId });
    return provider;
  }

  async deleteById(id: Provider['id']): Promise<boolean> {
    const provider = await providerRepository.softDelete({ id });
    return Boolean(provider);
  }

  async getDetailByOwnerId(
    ownerId: Provider['ownerId']
  ): Promise<ProviderDetailDTO> {
    const provider = await providerRepository.findOneBy({ ownerId });
    if (!provider) return null;
    const [location, suppliers] = await Promise.all([
      locationRepository.findOne({
        where: {
          providerId: provider.id,
        },
        select: ['id', 'name', 'address'],
      }),
      supplierRepository.find({
        where: { providerId: provider.id },
        select: ['id', 'name', 'avatarUrl'],
      }),
    ]);

    return {
      id: provider.id,
      name: provider.name,
      slug: provider.slug,
      description: provider.description,
      avatarUrl: provider.avatarUrl,
      SNSId: provider.SNSId,
      email: provider.email,
      openAt: provider.openAt,
      openDuration: provider.openDuration,
      location,
      suppliers,
    };
  }

  async getDetailById(id: Provider['id']): Promise<ProviderDetailDTO> {
    const provider = await providerRepository.findOneBy({ id });
    if (!provider) return null;
    const [location, suppliers] = await Promise.all([
      locationRepository.findOne({
        where: {
          providerId: provider.id,
        },
        select: ['id', 'name', 'address'],
      }),
      supplierRepository.find({
        where: { providerId: provider.id },
        select: ['id', 'name', 'avatarUrl'],
      }),
    ]);

    return {
      id: provider.id,
      name: provider.name,
      slug: provider.slug,
      description: provider.description,
      avatarUrl: provider.avatarUrl,
      SNSId: provider.SNSId,
      email: provider.email,
      openAt: provider.openAt,
      openDuration: provider.openDuration,
      location,
      suppliers,
    };
  }
}
