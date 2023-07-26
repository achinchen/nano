import { UserRepository } from './implementation';

export type { IUserRepository } from './abstract';

export const userRepository = new UserRepository();
