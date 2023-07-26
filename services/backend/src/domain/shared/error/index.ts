import type { Failed } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';

export type AppErrorUnexpected = Failed<{
  message: string;
  error: Error;
}>;

export class AppError {
  static Unexpected(error: Error): AppErrorUnexpected {
    console.log(`[AppError]: An unexpected error occurred`);
    console.error(error);
    return Result.fail({
      message: 'An unexpected error occurred.',
      error: error,
    });
  }
}
