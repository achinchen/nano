import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

config();

export const dataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  driver: {},
  synchronize: true,
  logging: false,
  entities: ['**/domain/*/infra/db/*.ts'],
  migrations: [],
  subscribers: [],
});
