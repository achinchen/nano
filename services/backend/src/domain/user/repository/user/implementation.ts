import type { User } from '~backend/domain/user/entity';
import type { IUserRepository } from './abstract';
import { dataSource } from '~backend/data-source';
import { User as DBUser } from '~backend/domain/user/infra/db/user';
import { CreateUserDTO } from '~backend/domain/user/dto';

const userRepository = dataSource.getRepository(DBUser);

export class UserRepository implements IUserRepository {
  async create(payload: CreateUserDTO): Promise<User> {
    const userPayload = userRepository.create(payload);
    const user = await userRepository.save(userPayload);
    return user;
  }

  async getById(id: User['id']): Promise<User> {
    const user = await userRepository.findOneBy({ id });
    return user;
  }

  async exist(email: User['email']): Promise<boolean> {
    const user = await userRepository.findOneBy({ email });
    return Boolean(user);
  }
}
