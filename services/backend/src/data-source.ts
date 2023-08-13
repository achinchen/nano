import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './domain/user/infra/db/user';
import { UserFederatedCredential } from './domain/user/infra/db/user-federated-credential';
import { Provider } from './domain/provider/infra/db/provider';

config();

export const dataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  driver: {},
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
  entities: [User, UserFederatedCredential, Provider],
  migrations: [],
  subscribers: [],
});
