import {
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Column,
  Index,
  BeforeInsert,
  BeforeUpdate,
  BeforeSoftRemove,
} from 'typeorm';

@Entity()
@Index(['lastHistoryId', 'providerId'], { unique: true })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
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
