import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BeforeInsert,
  BeforeUpdate,
  BeforeSoftRemove,
} from 'typeorm';

@Entity()
@Index(['lastHistory', 'providerId'], { unique: true })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: true })
  lastHistoryId?: number;

  @Column()
  providerId: number;

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
