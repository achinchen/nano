import type { FetchError } from '~frontend/utils/fetcher';
import { useEffect, useState } from 'react';
import useFetch from '~frontend/shared/hooks/use-fetch';

type Me = {
  role: string;
  id: string;
  studio?: {
    avatarUrl: string;
    name: string;
    SNSId: string;
  };
};

export default function useMe() {
  const [me, setMe] = useState<Me | null>(null);
  const [error, setError] = useState<FetchError | null>(null);

  const { loading, fetcher } = useFetch<Me>();

  useEffect(() => {
    fetcher({
      fetchArgs: {
        path: '/users/me',
        options: { method: 'GET' },
      },
      onSuccess: (response) => {
        setMe(response);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }, [fetcher]);
  return { loading, me, error };
}
