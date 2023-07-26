type Ok<T> = [null, T];
export type Failed<T> = [T];
export type IResult<T, FailedT = string> = Ok<T> | Failed<FailedT>;

export class Result {
  static ok<T>(input: T): Ok<T> {
    return [null, input];
  }

  static fail<T>(errorMessage: T): Failed<T> {
    return [errorMessage];
  }
}
