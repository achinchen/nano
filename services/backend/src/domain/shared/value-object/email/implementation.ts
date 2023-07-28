import type { IResult } from '~backend/domain/shared/result';
import { IValueObject } from '~backend/domain/shared/value-object/abstract';
import { Result } from '~backend/domain/shared/result';
import { isEmail } from './utils';

type Input = string;
type Output = IResult<Input>;

export const ERROR_MESSAGE = 'Invalid email';

export class EmailValueObject implements IValueObject<Input, Output> {
  static clearSpacesEmail(email: Input) {
    return email.trim();
  }
  execute(email: Input): Output {
    const cleanEmail = EmailValueObject.clearSpacesEmail(email);
    if (!isEmail(cleanEmail)) return Result.fail(ERROR_MESSAGE);
    return Result.ok<Input>(cleanEmail);
  }
}
