import type { FetcherOptions } from '~frontend/utils/fetcher/types';
import type { FetchError } from '~frontend/utils/fetcher';

export type FetchArgs = {
  path: string;
  options?: FetcherOptions;
};

export type OnError = (error: FetchError) => void;

export type OnSuccess<T = unknown> = (result: T) => void;

export type UseFetchPayload<T> = {
  fetchArgs: FetchArgs;
  onSuccess?: OnSuccess<T>;
  onError?: OnError;
};

export type Return<T> = {
  loading: boolean;
  fetcher: (payload: UseFetchPayload<T>) => Promise<void>;
};
