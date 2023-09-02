import type { Failed } from '~backend/domain/shared/result';
import { Result } from '~backend/domain/shared/result';
import { logger } from '~backend/domain/shared/logger';

export type AppErrorUnexpected = Failed<{
  message: string;
  error: Error;
}>;

export class AppError {
  static Unexpected(error: Error): AppErrorUnexpected {
    logger.error('App Error', error.stack);
    return Result.fail({
      message: 'An unexpected error occurred.',
      error: error,
    });
  }
}
