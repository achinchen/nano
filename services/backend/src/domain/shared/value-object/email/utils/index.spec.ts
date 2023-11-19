import validatorIsEmail from 'validator/lib/isEmail';
import { isEmail } from './index';

jest.mock('validator/lib/isEmail');

const mockValidatorIsEmail = validatorIsEmail as jest.Mock;

describe('isEmail', () => {
  beforeEach(() => {
    mockValidatorIsEmail.mockReset();
  });

  test.each([
    ['test@example.com', true],
    ['invalid-email', false],
    ['another@example.com', true],
  ])('should return %p for email: %p', (email, expectedResult) => {
    mockValidatorIsEmail.mockReturnValue(expectedResult);

    const result = isEmail(email);

    expect(result).toBe(expectedResult);
    expect(validatorIsEmail).toHaveBeenCalledWith(email);
  });
});
