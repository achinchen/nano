import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  nickname: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 30, unique: true })
  phone: string;
}
