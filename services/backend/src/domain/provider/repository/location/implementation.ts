import type { Takeleave } from '~backend/domain/provider/takeleave';
import type { IProviderRepository } from './abstract';
import { dataSource } from '~backend/data-source';
import { Takeleave as DBTakeleave } from '~backend/domain/provider/infra/db/takeleave';
import { CreateProviderDTO } from '~backend/domain/provider/dto';

const takeleaveRepository = dataSource.getRepository(DBTakeleave);

export class ProviderRepository implements IProviderRepository {
  async create(payload: CreateProviderDTO): Promise<Takeleave> {
    const takeleavePayload = takeleaveRepository.create(payload);
    const takeleave = await takeleaveRepository.save(takeleavePayload);
    return takeleave;
  }

  async getById(id: Takeleave['id']): Promise<Takeleave> {
    const takeleave = await takeleaveRepository.findOneBy({ id });
    return takeleave;
  }

  async deleteById(id: Takeleave['id']): Promise<boolean> {
    const takeleave = await takeleaveRepository.softDelete({ id });
    return Boolean(takeleave);
  }
}
