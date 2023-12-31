import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from '~frontend/shared/hooks/use-fetch';
import useMe from './index';

jest.mock('~frontend/shared/hooks/use-fetch');

describe('useMe', () => {
  it('sets the mme and error states correctly', async () => {
    const mockMe = { role: '1' };
    const mockError = { message: 'An error occurred' };

    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      fetcher: jest.fn().mockImplementation(({ onSuccess, onError }) => {
        onSuccess(mockMe);
        onError(mockError);
      }),
    });

    const { result, waitForNextUpdate } = renderHook(() => useMe());

    act(() => {
      waitForNextUpdate();
    });

    expect(result.current.me).toEqual(mockMe);
    expect(result.current.error).toEqual(mockError);
  });
});
