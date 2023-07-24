import { IValueObject } from '~backend/domain/shared/value-object/abstract';
import { isPhone } from './utils';

type Input = string;
type Output = [Input] | [Input, Error];

export const ERROR_MESSAGE = 'Invalid phone number';

export class PhoneValueObject implements IValueObject<Input, Output> {
  static clearSpacesPhoneNumber(phone: Input) {
    return phone.replace(/\s|-/g, '');
  }
  execute(phone: Input): Output {
    const cleanPhone = PhoneValueObject.clearSpacesPhoneNumber(phone);
    let error: Error;
    if (!isPhone(cleanPhone)) error = new Error(ERROR_MESSAGE);
    return [cleanPhone, error];
  }
}
