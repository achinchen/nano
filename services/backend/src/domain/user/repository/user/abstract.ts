import type { User } from '~backend/domain/user/entity';
import type { CreateUserDTO } from '~backend/domain/user/dto';

export interface IUserRepository {
  create(payload: CreateUserDTO): Promise<User>;
  exist(email: User['email']): Promise<boolean>;
  getById(id: User['id']): Promise<User>;
}
