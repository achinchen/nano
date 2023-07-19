import {
  JoinColumn,
  OneToOne,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { User } from './user';

export const FEDERATED_CREDENTIALS = ['google', 'facebook', 'apple'];
export type Provider = (typeof FEDERATED_CREDENTIALS)[number];

@Entity()
export class UserFederatedCredentials {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: FEDERATED_CREDENTIALS,
  })
  provider: Provider;

  @Column()
  subject: string;
}
