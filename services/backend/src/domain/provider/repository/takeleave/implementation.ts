import type { Provider, Takeleave } from '~backend/domain/provider/entity';
import type { ITakeleaveRepository } from './abstract';
import { dataSource } from '~backend/data-source';
import { Takeleave as DBTakeleave } from '~backend/domain/provider/infra/db/takeleave';
import { CreateTakeleaveDTO } from '~backend/domain/provider/dto';

const takeleaveRepository = dataSource.getRepository(DBTakeleave);

export class TakeleaveRepository implements ITakeleaveRepository {
  async create(payload: CreateTakeleaveDTO): Promise<Takeleave> {
    const takeleavePayload = takeleaveRepository.create(payload);
    const takeleave = await takeleaveRepository.save(takeleavePayload);
    return takeleave;
  }

  async getById(id: Takeleave['id']): Promise<Takeleave> {
    const takeleave = await takeleaveRepository.findOneBy({ id });
    return takeleave;
  }

  async getAllByProviderId(providerId: Provider['id']): Promise<Takeleave[]> {
    const takeleaveList = await takeleaveRepository.find({
      where: { providerId },
    });
    return takeleaveList;
  }

  async deleteById(id: Takeleave['id']): Promise<boolean> {
    const takeleave = await takeleaveRepository.softDelete({ id });
    return Boolean(takeleave);
  }
}
