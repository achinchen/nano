import type { StudioSetting } from '~frontend/features/studio/setting/components/Content/types';
import type { FetchError } from '~frontend/utils/fetcher';
import { useEffect, useState } from 'react';
import useFetch from '~frontend/shared/hooks/use-fetch';

export default function useSetting() {
  const [setting, setSetting] = useState<StudioSetting | null>(null);
  const [error, setError] = useState<FetchError | null>(null);

  const { loading, fetcher } = useFetch<StudioSetting>();

  useEffect(() => {
    fetcher({
      fetchArgs: {
        path: '/studio/setting',
        options: { method: 'GET' },
      },
      onSuccess: (response) => {
        setSetting(response);
      },
      onError: (error) => {
        setError(error);
      },
    });
  }, [fetcher]);
  return { loading, setting, error };
}
