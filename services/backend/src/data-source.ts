import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User, UserFederatedCredentials } from './domain/user/infra/db';

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  driver: {},
  synchronize: true,
  logging: false,
  entities: [User, UserFederatedCredentials],
  migrations: [],
  subscribers: [],
});
