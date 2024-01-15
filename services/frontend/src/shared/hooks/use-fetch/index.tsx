import type { UseFetchPayload, Return } from './types';
import { useState, useCallback } from 'react';
import { FetchError, fetcher as utilsFetcher } from '~frontend/utils/fetcher';
import { getBasePath } from '~frontend/utils/env/get-base-path';

function useFetch<T>(): Return<T> {
  const [loading, setLoading] = useState(false);

  const fetcher = useCallback(
    async ({ fetchArgs, onSuccess, onError }: UseFetchPayload<T>) => {
      await (async () => {
        try {
          setLoading(true);
          const basePath = getBasePath();
          const { path, options } = fetchArgs;
          const headers = {
            ...options?.headers,
            credentials: 'same-origin',
          };
          const result = await utilsFetcher(basePath, path, {
            ...options,
            headers,
          });
          onSuccess?.(result as T);
        } catch (error) {
          const fetchError = new FetchError(
            500,
            (error as { message: string })?.message ?? ''
          );
          onError?.(error as FetchError);
          console.error(fetchError, { type: 'apiError' });
        } finally {
          setLoading(false);
        }
      })();
    },
    []
  );

  return {
    loading,
    fetcher,
  };
}

export default useFetch;
