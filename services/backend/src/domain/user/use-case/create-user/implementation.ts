import type { User } from '~backend/domain/user/entity';
import type {
  CreateUserDTO,
  CreateUserFederatedCredentialDTO,
} from '~backend/domain/user/dto';
import type { IUserRepository } from '~backend/domain/user/repository/user/abstract';
import type { IUserFederatedCredentialRepository } from '~backend/domain/user/repository/user-federated-credential/abstract';
import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { AppError, AppErrorUnexpected } from '~backend/domain/shared/error';
import { UseCase } from '~backend/domain/shared/use-case';
import phoneValueObject from '~backend/domain/shared/value-object/phone';
import emailValueObject from '~backend/domain/shared/value-object/email';
import { EXISTED_EMAIL } from '~backend/domain/user/error';

type UserResult = User;
type Payload = CreateUserDTO & Omit<CreateUserFederatedCredentialDTO, 'userId'>;
type Return = IResult<UserResult> | AppErrorUnexpected;

export class CreateUserUseCase implements UseCase<Payload, Promise<Return>> {
  private userRepository: IUserRepository;
  private userFederatedCredentialRepository: IUserFederatedCredentialRepository;

  constructor(
    userRepository: IUserRepository,
    userFederatedCredentialRepository: IUserFederatedCredentialRepository
  ) {
    this.userRepository = userRepository;
    this.userFederatedCredentialRepository = userFederatedCredentialRepository;
  }

  async execute(payload?: Payload): Promise<Return> {
    const [emailError, email] = emailValueObject.execute(payload.email);
    const [phoneError, phone] = phoneValueObject.execute(payload.phone);

    if (emailError || phoneError) return Result.fail(emailError || phoneError);

    try {
      const isExist = await this.userRepository.exist(email);
      if (isExist) return Result.fail(EXISTED_EMAIL);

      const user = await this.userRepository.create({
        nickname: payload.nickname,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: email,
        phone: phone,
      });

      await this.userFederatedCredentialRepository.create({
        userId: user.id,
        provider: payload.provider,
        subject: payload.subject,
      });

      return Result.ok<UserResult>(user);
    } catch (error) {
      return AppError.Unexpected(error);
    }
  }
}
