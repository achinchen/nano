/* eslint-disable jest/no-conditional-expect */
import * as utils from './utils';
import { ERROR_MESSAGE, PhoneValueObject } from './implementation';
import phoneValueObject from '.';

jest.spyOn(utils, 'isPhone');

describe('PhoneValueObject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    ['1234567890', '1234567890'],
    ['+1 223 456 7890', '+12234567890'],
    ['abc', new Error(ERROR_MESSAGE)],
    ['123', new Error(ERROR_MESSAGE)],
    ['123-456-7890', '1234567890'],
  ])('should return %p when isPhone function returns %p', (input, expected) => {
    let result;

    try {
      result = phoneValueObject.execute(input);
    } catch (error) {
      result = error;
    }

    if (expected instanceof Error) {
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe(expected.message);
    } else {
      expect(result).toEqual(expected);
    }

    expect(utils.isPhone).toHaveBeenCalledWith(
      PhoneValueObject.clearSpacesPhoneNumber(input)
    );
  });
});
