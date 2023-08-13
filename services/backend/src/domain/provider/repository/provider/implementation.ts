import type { Provider } from '~backend/domain/provider/entity';
import type { IProviderRepository } from './abstract';
import { dataSource } from '~backend/data-source';
import { Provider as DBProvider } from '~backend/domain/provider/infra/db/provider';
import { CreateProviderDTO } from '~backend/domain/provider/dto';

const providerRepository = dataSource.getRepository(DBProvider);

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

  async deleteById(id: Provider['id']): Promise<boolean> {
    const provider = await providerRepository.softDelete({ id });
    console.log(provider);
    return Boolean(provider);
  }
}
