import { renderHook, act } from '@testing-library/react-hooks';
import useFetch from '~frontend/shared/hooks/use-fetch';
import useProfile from './index';

jest.mock('~frontend/shared/hooks/use-fetch');

describe('useProfile', () => {
  it('sets the profile and error states correctly', async () => {
    const mockProfile = { name: 'John Doe', email: 'john.doe@example.com' };
    const mockError = { message: 'An error occurred' };

    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      fetcher: jest.fn().mockImplementation(({ onSuccess, onError }) => {
        onSuccess(mockProfile);
        onError(mockError);
      }),
    });

    const { result, waitForNextUpdate } = renderHook(() => useProfile());

    act(() => {
      waitForNextUpdate();
    });

    expect(result.current.profile).toEqual(mockProfile);
    expect(result.current.error).toEqual(mockError);
  });
});
