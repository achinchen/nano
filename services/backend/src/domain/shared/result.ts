type Ok<T> = [null, T];
type Failed<T> = [T];

export class Result {
  static ok<T>(input: T): Ok<T> {
    return [null, input];
  }

  static fail<T>(errorMessage: T): Failed<T> {
    return [errorMessage];
  }
}

export type IResult<T, FailedT = string> = Ok<T> | Failed<FailedT>;
