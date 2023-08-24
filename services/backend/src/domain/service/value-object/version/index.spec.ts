/* eslint-disable jest/no-conditional-expect */
import { Result } from '~backend/domain/shared/result';
import * as utils from './utils';
import { ERROR_MESSAGE, VersionValueObject } from './implementation';
import versionValueObject from '.';

jest.mock('./utils');
const mockCleanVersion = utils.cleanVersion as jest.MockedFunction<
  typeof utils.cleanVersion
>;
const mockIsGetter = utils.isGreater as jest.MockedFunction<
  typeof utils.isGreater
>;
const mockBumpVersion = utils.bumpVersion as jest.MockedFunction<
  typeof utils.bumpVersion
>;

describe('VersionValueObject.execute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    ['1.1.2', Result.ok('1.1.2')],
    [' 1.2.3 ', Result.ok('1.2.3')],
    ['invalid-version', Result.fail(ERROR_MESSAGE)],
  ])(
    'should return %p when execute function returns %p',
    (input, [expectedError, expectedValue]) => {
      mockCleanVersion.mockReturnValue(expectedValue);
      const [error, result] = versionValueObject.execute(input);
      if (!error) {
        expect(result).toBe(expectedValue);
      } else {
        expect(error).toBe(expectedError);
      }

      expect(utils.cleanVersion).toHaveBeenCalledWith(input);
    }
  );
});

describe('VersionValueObject.isGetter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [['1.3.2', '1.2.3'], true],
    [['2.2.1', '3.3.1'], false],
  ])(
    'should return %p when isGetter function returns %p',
    ([a, b], expectedValue) => {
      mockIsGetter.mockReturnValue(expectedValue);
      const result = versionValueObject.isGetter(a, b);
      expect(result).toBe(expectedValue);
      expect(utils.isGreater).toHaveBeenCalledWith(a, b);
    }
  );
});


describe('VersionValueObject.bump*', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each([
    [['1.1.1', 'bumpPatch', 'patch'], '1.1.2'],
    [['1.1.1', 'bumpMinor', 'minor'], '1.2.0'],
    [['1.1.1', 'bumpMajor', 'major'], '2.0.0'],
  ])(
    'should return %p when isEmail function returns %p',
    ([version, method, release], expectedValue) => {
      mockBumpVersion.mockReturnValue(expectedValue);
      const result = versionValueObject[method](version, release);
      expect(result).toBe(expectedValue);
      expect(utils.bumpVersion).toHaveBeenCalledWith(version, release);
    }
  );
});