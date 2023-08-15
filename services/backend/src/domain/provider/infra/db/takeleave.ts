import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Takeleave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startAt: Date;

  @Column()
  endAt: Date;

  @Column()
  providerId: number;

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
