export type FetcherBaseUrl = string;

export type FetcherPath = string;

export type FetcherOptions = {
  payload?: unknown;
} & RequestInit;

/* eslint-disable @typescript-eslint/no-explicit-any */
export type FetcherPromise = Promise<any>;

export type Fetcher = (
  path: FetcherPath,
  options?: FetcherOptions
) => FetcherPromise;

export type FetchArgs = {
  path: string;
  options?: FetcherOptions;
};
