import type { IResult } from '~backend/domain/shared/result';
import { IValueObject } from '~backend/domain/shared/value-object/abstract';
import { Result } from '~backend/domain/shared/result';
import { cleanVersion, isGreater, bumpVersion } from './utils';

type Input = string;
type Output = IResult<Input>;

export const ERROR_MESSAGE = 'Invalid version';

export class VersionValueObject implements IValueObject<Input, Output> {
  execute(version: Input): Output {
    const result = cleanVersion(version);
    if (!result) return Result.fail(ERROR_MESSAGE);
    return Result.ok<Input>(result);
  }

  isGetter(a: Input, b: Input) {
    return isGreater(a, b);
  }

  bumpPatch(version: Input) {
    return bumpVersion(version, 'patch');
  }

  bumpMinor(version: Input) {
    return bumpVersion(version, 'minor');
  }

  bumpMajor(version: Input) {
    return bumpVersion(version, 'major');
  }
}
