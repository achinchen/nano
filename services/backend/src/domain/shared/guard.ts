import { IResult, Result } from './result';

export interface IGuardArgument {
  argument: unknown;
  argumentName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GuardResponse = string | any;

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static greaterThan(
    min: number,
    value: number
  ): IResult<GuardResponse> {
    return value > min
      ? Result.ok(value)
      : Result.fail(`Number given {${value}} is not greater than {${min}}`);
  }

  public static atLeast(count: number, text: string): IResult<GuardResponse> {
    return text.length >= count
      ? Result.ok(text)
      : Result.fail(`Text is not at least ${count} chars.`);
  }

  public static atMost(count: number, text: string): IResult<GuardResponse> {
    return text.length <= count
      ? Result.ok(text)
      : Result.fail(`Text is greater than ${count} chars.`);
  }

  public static notNullOrUndefined(
    argument: unknown,
    argumentName: string
  ): IResult<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Result.fail(`${argumentName} is null or undefined`);
    } else {
      return Result.ok(argument);
    }
  }

  public static notNullOrUndefinedOrEmptyString(
    argument: unknown,
    argumentName: string
  ): IResult<GuardResponse> {
    if (argument === null || argument === undefined || argument === '') {
      return Result.fail(
        `${argumentName} is one of null, undefined,  empty string`
      );
    } else {
      return Result.ok(argument);
    }
  }

  public static notNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): IResult<GuardResponse> {
    for (const arg of args) {
      const result = this.notNullOrUndefined(arg.argument, arg.argumentName);
      if (result[0]) return result;
    }

    return Result.ok<GuardResponse>(args);
  }

  public static notNullOrUndefinedOrEmptyStringBulk(
    args: GuardArgumentCollection
  ): IResult<GuardResponse> {
    for (const arg of args) {
      const result = this.notNullOrUndefinedOrEmptyString(
        arg.argument,
        arg.argumentName
      );
      if (result[0]) return result;
    }

    return Result.ok<GuardResponse>(args);
  }

  public static isOneOf(
    value: unknown,
    validValues: unknown[],
    argumentName: string
  ): IResult<GuardResponse> {
    let isValid = false;
    for (const validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return Result.ok<GuardResponse>(value);
    } else {
      return Result.fail(
        `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
          validValues
        )}. Got "${value}".`
      );
    }
  }

  public static inRange(
    value: number,
    min: number,
    max: number,
    argumentName: string
  ): IResult<GuardResponse> {
    const isInRange = value >= min && value <= max;
    if (!isInRange) {
      return Result.fail(
        `${argumentName} is not within range ${min} to ${max}.`
      );
    } else {
      return Result.ok(value);
    }
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string
  ): IResult<GuardResponse> {
    let failingResult: IResult<GuardResponse> = null;

    for (const num of numbers) {
      const numIsInRangeResult = this.inRange(num, min, max, argumentName);
      if (!numIsInRangeResult[0]) failingResult = numIsInRangeResult;
    }

    if (failingResult) {
      return Result.fail(`${argumentName} is not within the range.`);
    } else {
      return Result.ok(numbers);
    }
  }
}
