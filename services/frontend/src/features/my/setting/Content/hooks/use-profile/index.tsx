import type { Profile } from '~frontend/features/my/setting/Content/types';
import type { FetchError } from '~frontend/utils/fetcher';
import { useEffect, useState } from 'react';
import useFetch from '~frontend/shared/hooks/use-fetch';

export default function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<FetchError | null>(null);

  const { loading, fetcher } = useFetch<Profile>();

  useEffect(() => {
    fetcher({
      fetchArgs: {
        path: `/users/setting`,
        options: { method: 'GET' },
      },
      onSuccess: (response) => {
        setProfile(response);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }, [fetcher]);
  return { loading, profile, error };
}
