/* eslint-disable jest/no-conditional-expect */
import { Result } from '~backend/domain/shared/result';
import * as utils from './utils';
import { ERROR_MESSAGE, EmailValueObject } from './implementation';
import emailValueObject from '.';

jest.spyOn(utils, 'isEmail');

describe('EmailValueObject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    ['test@example.com', Result.ok('test@example.com')],
    [' test@example.com ', Result.ok('test@example.com')],
    ['abc', Result.fail(ERROR_MESSAGE)],
    ['123', Result.fail(ERROR_MESSAGE)],
    ['invalid-email', Result.fail(ERROR_MESSAGE)],
  ])(
    'should return %p when isEmail function returns %p',
    (input, [expectedError, expectedValue]) => {
      const [error, result] = emailValueObject.execute(input);
      if (!error) {
        expect(result).toBe(expectedValue);
      } else {
        expect(error).toBe(expectedError);
      }

      expect(utils.isEmail).toHaveBeenCalledWith(
        EmailValueObject.clearSpacesEmail(input)
      );
    }
  );
});
