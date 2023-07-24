/* eslint-disable jest/no-conditional-expect */
import * as utils from './utils';
import { ERROR_MESSAGE, EmailValueObject } from './implementation';
import emailValueObject from '.';

jest.spyOn(utils, 'isEmail');

describe('EmailValueObject', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    ['test@example.com', ['test@example.com']],
    [' test@example.com ', ['test@example.com']],
    ['abc', ['abc', new Error(ERROR_MESSAGE)]],
    ['123', ['123', new Error(ERROR_MESSAGE)]],
    ['invalid-email', ['invalid-email', new Error(ERROR_MESSAGE)]],
  ])('should return %p when isEmail function returns %p', (input, expected) => {
    let result;

    try {
      result = emailValueObject.execute(input);
    } catch (error) {
      result = error;
    }

    if (expected instanceof Error) {
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe(expected.message);
    } else {
      expect(result).toEqual(expected);
    }

    expect(utils.isEmail).toHaveBeenCalledWith(
      EmailValueObject.clearSpacesEmail(input)
    );
  });
});
