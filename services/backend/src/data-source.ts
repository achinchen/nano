import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './domain/user/infra/db/user';
import { UserFederatedCredential } from './domain/user/infra/db/user-federated-credential';
import { Provider } from './domain/provider/infra/db/provider';
import { Takeleave } from './domain/provider/infra/db/takeleave';
import { Location } from './domain/provider/infra/db/location';

config();

export const dataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  driver: {},
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
  entities: [User, UserFederatedCredential, Provider, Takeleave, Location],
  migrations: [],
  subscribers: [],
});
