import type { State, Field } from '~backend/domain/order/entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BeforeSoftRemove,
} from 'typeorm';
import { STATES } from '~backend/domain/order/entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column('simple-array')
  queueDateTime: Date[];

  @Column()
  attendee: number;

  @Column()
  startAt: Date;

  @Column('simple-json')
  field: Field;

  @Column({
    type: 'enum',
    enum: STATES,
  })
  state: State;

  @Column()
  note: string;

  @Index()
  @Column()
  serviceId: number;

  @Index()
  @Column()
  serviceHistoryId: number;

  @Index()
  @Column()
  providerId: number;

  @Index()
  @Column()
  userId: number;

  @Column()
  noteUpdatedAt: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.noteUpdatedAt = new Date();
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date();
  }

  @BeforeSoftRemove()
  insertSoftRemoved() {
    this.deletedAt = new Date();
  }
}
