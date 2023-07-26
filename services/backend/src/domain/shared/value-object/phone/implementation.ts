import type { IResult } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { IValueObject } from '~backend/domain/shared/value-object/abstract';
// import { isPhone } from './utils';

type Input = string;
type Output = IResult<Input>;

export const ERROR_MESSAGE = 'Invalid phone number';

export class PhoneValueObject implements IValueObject<Input, Output> {
  static clearSpacesPhoneNumber(phone: Input) {
    return phone.replace(/\s|-/g, '');
  }
  execute(phone: Input): Output {
    const cleanPhone = PhoneValueObject.clearSpacesPhoneNumber(phone);
    // if (!isPhone(cleanPhone)) return Result.fail(ERROR_MESSAGE);
    return Result.ok(cleanPhone);
  }
}
