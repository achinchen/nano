import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from '~frontend/shared/hooks/use-fetch';
import useSetting from '.';

jest.mock('~frontend/shared/hooks/use-fetch');

describe('useSetting', () => {
  it('should fetch setting on mount', async () => {
    const mockFetch = {
      loading: false,
      fetcher: jest.fn(),
    };

    (useFetch as jest.Mock).mockReturnValue(mockFetch);

    const { result, waitForNextUpdate } = renderHook(() => useSetting());

    expect(result.current.setting).toBeNull();
    expect(result.current.error).toBeNull();

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(mockFetch.fetcher).toHaveBeenCalledWith({
      fetchArgs: {
        path: '/studio/setting',
      },
    });
  });
});
