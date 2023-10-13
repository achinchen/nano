import type { Field } from '~backend/domain/service/entity';
import {
  Index,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BeforeSoftRemove,
} from 'typeorm';

@Entity()
export class ServiceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  version: string;

  @Column({ length: 30 })
  name: string;

  @Index()
  @Column()
  supplierId: number;

  @Column()
  locationId: number;

  @Column({ length: 500 })
  description: string;

  @Column('time')
  duration: Date;

  @Column()
  attendee: number;

  @Column()
  allday: boolean;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @Column('simple-array')
  fields: Field[];

  @Column()
  note: string;

  @Column()
  queue: boolean;

  @Column()
  serviceId: number;

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
