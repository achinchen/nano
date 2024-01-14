import type { ServiceCreatePayload } from './types';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { ERROR_MESSAGE } from '~frontend/shared/constants/message/error';
import i from './i.json';
import useCreateService from '.';

const mockAddMessage = jest.fn();
jest.mock('~frontend/components/Message', () => ({
  useMessage: () => ({ addMessage: mockAddMessage }),
}));

const mockFetcher = jest.fn();
jest.mock('~customer-service/hooks/use-fetch', () => () => ({
  fetcher: mockFetcher,
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const addMessage = jest.fn();
const navigate = jest.fn();

test('onSuccess callback', async () => {
  const response = { id: '1', name: 'Test' };
  mockFetcher.mockImplementationOnce(({ onSuccess }) => onSuccess(response));

  const { result } = renderHook(() => useCreateService());
  const createService = result.current.createService;
  createService({ name: 'Test' } as ServiceCreatePayload);

  await waitFor(() => {
    expect(mockFetcher).toHaveBeenCalledWith({
      fetchArgs: {
        path: `/service/create`,
        options: {
          method: 'POST',
          payload: { name: 'Test' },
        },
      },
      onSuccess: expect.any(Function),
      onError: expect.any(Function),
    });
  });

  expect(navigate).toHaveBeenCalledWith(`/studio/services/${response.id}`);
  expect(addMessage).toHaveBeenCalledWith({
    severity: 'success',
    title: `${response.name} ${i.title}`,
    children: i.content,
  });
});

test('onError callback', () => {
  mockFetcher.mockImplementationOnce(({ onError }) => onError());

  const { result } = renderHook(() => useCreateService());
  const createService = result.current.createService;
  createService({ name: 'Test' } as ServiceCreatePayload);

  expect(addMessage).toHaveBeenCalledWith(ERROR_MESSAGE);
});
