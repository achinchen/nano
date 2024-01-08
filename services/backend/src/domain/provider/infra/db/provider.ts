import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 40 })
  slug: string;

  @Column({ length: 256 })
  description: string;

  @Column({ length: 800 })
  avatarUrl: string;

  @Column({ length: 100 })
  SNSId: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  ownerId: number;

  @Column()
  openAt: Date;

  @Column()
  openDuration: number;

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
