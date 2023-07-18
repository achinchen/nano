import type { User } from '~backend/domain/user/entity';

export type Payload = Omit<User, 'id'>;

export interface UserRepository {
  create(payload: Payload): Promise<User>;
  getById(id: string): Promise<User>;
}
