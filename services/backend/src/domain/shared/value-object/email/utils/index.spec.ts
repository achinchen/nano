import validatorIsEmail from 'validator/lib/isEmail';
import { isEmail } from './index';

jest.mock('validator/lib/isEmail');

describe('isEmail', () => {
  beforeEach(() => {
    validatorIsEmail.mockReset();
  });

  test.each([
    ['test@example.com', true],
    ['invalid-email', false],
    ['another@example.com', true],
  ])('should return %p for email: %p', (email, expectedResult) => {
    validatorIsEmail.mockReturnValue(expectedResult);

    const result = isEmail(email);

    expect(result).toBe(expectedResult);
    expect(validatorIsEmail).toHaveBeenCalledWith(email);
  });
});
