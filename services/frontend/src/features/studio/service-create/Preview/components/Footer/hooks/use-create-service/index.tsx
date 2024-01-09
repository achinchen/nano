import type { ServiceCreateResponse, ServiceCreatePayload } from './types';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { ERROR_MESSAGE } from '~frontend/shared/constants/message/error';
import { useMessage } from '~frontend/components/Message';
import useFetch from '~frontend/shared/hooks/use-fetch';
import i from './i.json';

export default function useSetting() {
  const navigate = useNavigate();
  const { addMessage } = useMessage();
  const { loading, fetcher } = useFetch<ServiceCreateResponse>();

  const createService = useCallback(
    (payload: ServiceCreatePayload) =>
      new Promise((resolve, reject) => {
        fetcher({
          fetchArgs: {
            path: '/service/create',
            options: { method: 'POST', payload },
          },
          onSuccess: (response) => {
            const { id, name } = response;
            navigate(`/studio/services/${id}`);
            addMessage({
              severity: 'success',
              title: `${name} ${i.title}`,
              children: i.content,
            });
          },
          onError: (error) => {
            addMessage(ERROR_MESSAGE);
          },
        });
      }),
    [fetcher, addMessage, navigate]
  );

  return { loading, createService };
}
