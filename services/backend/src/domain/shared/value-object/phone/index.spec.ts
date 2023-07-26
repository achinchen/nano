/* eslint-disable jest/no-conditional-expect */
import { Result } from '~backend/domain/shared/result';
import * as utils from './utils';
// import { ERROR_MESSAGE, PhoneValueObject } from './implementation';
import { PhoneValueObject } from './implementation';
import phoneValueObject from '.';

jest.spyOn(utils, 'isPhone');

describe('PhoneValueObject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    ['1234567890', Result.ok('1234567890')],
    ['+1 223 456 7890', Result.ok('+12234567890')],
    // ['abc', Result.fail(ERROR_MESSAGE)],
    // ['123', Result.fail(ERROR_MESSAGE)],
    ['123-456-7890', Result.ok('1234567890')],
  ])(
    'should return %p when isPhone function returns %p',
    (input, [expectedError, expectedValue]) => {
      const [error, result] = phoneValueObject.execute(input);

      if (error) {
        expect(error).toBe(expectedError);
      } else {
        expect(result).toBe(expectedValue);
      }

      expect(utils.isPhone).toHaveBeenCalledWith(
        PhoneValueObject.clearSpacesPhoneNumber(input)
      );
    }
  );
});
