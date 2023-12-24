import type {
  FetcherBaseUrl,
  FetcherPath,
  FetcherOptions,
  Fetcher,
  FetcherPromise,
} from './types';

export class FetchError extends Error {
  constructor(public status: Response['status'], message?: string) {
    super(message);
  }
}

const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const fetcher = async (
  baseUrl: FetcherBaseUrl,
  path: FetcherPath,
  { method = 'GET', headers = {}, payload }: FetcherOptions = {}
): FetcherPromise => {
  const urlInstance = new URL(`${baseUrl}${path}`);
  const isGETorHEADMethod = ['GET', 'HEAD'].includes(method);
  if (isGETorHEADMethod && payload)
    urlInstance.search = String(
      new URLSearchParams(payload as { [key: string]: string })
    );
  const response = await fetch(String(urlInstance), {
    method,
    headers: {
      ...HEADERS,
      ...headers,
    },
    body: !isGETorHEADMethod && payload ? JSON.stringify(payload) : undefined,
  });

  if (response.status === 204) return;

  const result = await response.json();

  if (response.ok) {
    return result;
  } else {
    throw new FetchError(response.status, result.message);
  }
};

export const initFetcher = (baseUrl: FetcherBaseUrl): Fetcher => {
  return (path, options = {}) => fetcher(baseUrl, path, options);
};
