// isPhone.test.js
import validator from 'validator/lib/isMobilePhone';
import { isPhone } from '.';

jest.mock('validator/lib/isMobilePhone');

describe('isPhone function', () => {
  beforeEach(() => {
    validator.mockClear();
  });

  test.each([
    ['1234567890', true],
    ['+1 123 456 7890', true],
    ['abc', false],
    ['123', false],
    ['123-456-7890', false],
  ])(
    'should return %p when the validator function returns %p',
    (phoneNumber, expected) => {
      validator.mockReturnValue(expected);

      const result = isPhone(phoneNumber);
      expect(result).toBe(expected);

      expect(validator).toHaveBeenCalledWith(phoneNumber);
    }
  );
});
