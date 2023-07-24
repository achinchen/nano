import { IValueObject } from '~backend/domain/shared/value-object/abstract';
import { isEmail } from './utils';

type Input = string;
type Output = [Input] | [Input, Error];

export const ERROR_MESSAGE = 'Invalid email';

export class EmailValueObject implements IValueObject<Input, Output> {
  static clearSpacesEmail(email: Input) {
    return email.trim();
  }
  execute(email: Input): Output {
    const cleanEmail = EmailValueObject.clearSpacesEmail(email);
    let error: Error | undefined;
    if (!isEmail(cleanEmail)) error = new Error(ERROR_MESSAGE);
    return [cleanEmail, error];
  }
}
