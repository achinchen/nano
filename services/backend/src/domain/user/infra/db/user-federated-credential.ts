import type { FederatedCredentialProvider } from '~backend/domain/user/entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { FEDERATED_CREDENTIALS } from '~backend/domain/user/entity';

@Entity()
export class UserFederatedCredential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: FEDERATED_CREDENTIALS,
  })
  provider: FederatedCredentialProvider;

  @Column()
  subject: string;

  @Column()
  userId: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date();
  }
}
