import valid from 'semver/functions/valid';
import greater from 'semver/functions/gt';
import increment from 'semver/functions/inc';

export const isVersion = (version: string) => Boolean(valid(version));

export const cleanVersion = (version: string) => valid(version);

export const isGreater = (a: string, b: string) => greater(a, b);

export const bumpVersion = (
  version: string,
  release: 'major' | 'minor' | 'patch'
) => increment(version, release);
