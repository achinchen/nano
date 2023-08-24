import valid from 'semver/functions/valid';
import greater from 'semver/functions/gt';
import increment from 'semver/functions/inc';
import { cleanVersion, isVersion, isGreater, bumpVersion } from './index';

jest.mock('semver/functions/valid');
jest.mock('semver/functions/gt');
jest.mock('semver/functions/inc');

const mockValid = valid as jest.MockedFunction<typeof valid>;
const mockGreater = greater as jest.MockedFunction<typeof greater>;
const mockIncrement = increment as jest.MockedFunction<typeof increment>;

describe('isVersion', () => {
  beforeEach(() => {
    mockValid.mockReset();
  });

  test.each([
    ['0.0.1', '0.0.1'],
    ['invalid-version', null],
    ['1.12.3', '1.12.3'],
  ])('should return %p for version: %p', (version, expectedResult) => {
    mockValid.mockReturnValue(expectedResult);

    const result = isVersion(version);

    expect(result).toBe(Boolean(expectedResult));
    expect(mockValid).toHaveBeenCalledWith(version);
  });
});

describe('cleanVersion', () => {
  beforeEach(() => {
    mockValid.mockReset();
  });

  test.each([
    [' 0.0.1', '0.0.1'],
    ['0. 1.1', '0.1.1'],
  ])('should return %p for version: %p', (version, expectedResult) => {
    mockValid.mockReturnValue(expectedResult);

    const result = cleanVersion(version);

    expect(result).toBe(expectedResult);
    expect(mockValid).toHaveBeenCalledWith(version);
  });
});

describe('isGreater', () => {
  beforeEach(() => {
    mockGreater.mockReset();
  });

  test.each([
    [['0.2.1', '0.1.2'], true],
    [['0.0.1', '0.0.5'], false],
    [['1.12.3', '1.12.3'], false],
  ])(
    'should return %p for version: %p',
    ([versionA, versionB], expectedResult) => {
      mockGreater.mockReturnValue(expectedResult);

      const result = isGreater(versionA, versionB);

      expect(result).toBe(expectedResult);
      expect(mockGreater).toHaveBeenCalledWith(versionA, versionB);
    }
  );
});

describe('bumpVersion', () => {
  beforeEach(() => {
    mockGreater.mockReset();
  });

  test.each([
    [['0.2.1', 'major'], '1.0.0'],
    [['0.3.2', 'patch'], '0.3.3'],
    [['1.12.3', '1.13.0'], '1.13.0'],
  ])(
    'should return %p for version: %p',
    ([version, release], expectedResult) => {
      mockIncrement.mockReturnValue(expectedResult);

      type release = Parameters<typeof bumpVersion>[1];
      const result = bumpVersion(version, release as release);

      expect(result).toBe(expectedResult);
      expect(mockIncrement).toHaveBeenCalledWith(version, release);
    }
  );
});
