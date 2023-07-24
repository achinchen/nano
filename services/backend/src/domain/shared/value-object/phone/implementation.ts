import { IValueObject } from '~backend/domain/shared/value-object/abstract';
import { isPhone } from './utils';

type Input = string;
type Output = Error | string;

export const ERROR_MESSAGE = 'Invalid phone number';

export class PhoneValueObject implements IValueObject<Input, Output> {
  static clearSpacesPhoneNumber(phone: Input) {
    return phone.replace(/\s|-/g, '');
  }
  execute(phone: Input) {
    const cleanPhone = PhoneValueObject.clearSpacesPhoneNumber(phone);
    if (!isPhone(cleanPhone)) throw new Error(ERROR_MESSAGE);
    return cleanPhone;
  }
}
