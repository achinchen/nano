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

  @Column({ length: 60, unique: true })
  emailVerified: string;

  @Column()
  phone: string;
}

export class UserFederatedCredentials {
  constructor(
    public id: string,
    public userId: string,
    public provider: string,
    public subject: string
  ) {}
}
