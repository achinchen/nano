import type { FederatedCredentialProvider } from '~backend/domain/user/entity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { FEDERATED_CREDENTIALS } from '~backend/domain/user/entity';

@Entity()
export class UserFederatedCredential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: FEDERATED_CREDENTIALS,
  })
  provider: FederatedCredentialProvider;

  @Column()
  subject: string;

  @Column()
  userId: number;
}
