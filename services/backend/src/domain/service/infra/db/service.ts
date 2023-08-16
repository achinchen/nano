import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  BeforeSoftRemove,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastHistoryId: number;

  @Column()
  providerId: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
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
