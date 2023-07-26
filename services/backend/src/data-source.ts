import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { app } from './app';
import { User } from './domain/user/infra/db/user';
import { UserFederatedCredential } from './domain/user/infra/db/user-federated-credential';

config();

export const dataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  driver: {},
  synchronize: app.get('env') === 'development',
  logging: false,
  entities: [User, UserFederatedCredential],
  migrations: [],
  subscribers: [],
});
