import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './domain/user/infra/db/user';
import { UserFederatedCredential } from './domain/user/infra/db/user-federated-credential';
import { Provider } from './domain/provider/infra/db/provider';
import { Takeleave } from './domain/provider/infra/db/takeleave';
import { Location } from './domain/provider/infra/db/location';
import { Supplier } from './domain/provider/infra/db/supplier';
import { Service } from './domain/service/infra/db/service';
import { ServiceHistory } from './domain/service/infra/db/service-history';
import { Order } from './domain/order/infra/db/order';

config();

export const dataSource = new DataSource({
  type: 'mysql',
  url: process.env.DB_URL,
  driver: {},
  logging: false,
  entities: [
    User,
    UserFederatedCredential,
    Provider,
    Takeleave,
    Location,
    Supplier,
    Service,
    ServiceHistory,
    Order,
  ],
  // migrations: ['./migrations/**{.js}'],
  // migrationsTableName: '_migrations',
  // migrationsRun: true,
  // synchronize: process.env.NODE_ENV === 'development',
  synchronize: true,
  subscribers: [],
});
