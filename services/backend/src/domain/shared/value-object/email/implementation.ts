import { IValueObject } from '~backend/domain/shared/value-object/abstract';
import { isEmail } from './utils';

type Input = string;
type Output = Error | string;

export const ERROR_MESSAGE = 'Invalid email';

export class EmailValueObject implements IValueObject<Input, Output> {
  static clearSpacesEmail(email: Input) {
    return email.trim();
  }
  execute(email: Input) {
    const cleanEmail = EmailValueObject.clearSpacesEmail(email);
    if (!isEmail(cleanEmail)) throw new Error(ERROR_MESSAGE);
    return cleanEmail;
  }
}
