import type {
  User,
  UserFederatedCredential,
} from '~backend/domain/user/entity';

export type CreateUserDTO = Omit<User, 'id'>;

export type CreateUserFederatedCredentialDTO = Omit<
  UserFederatedCredential,
  'id'
>;
