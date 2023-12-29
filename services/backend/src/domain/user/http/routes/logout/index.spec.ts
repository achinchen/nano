import { updateSessionIdentifierAndGetToken } from '~backend/domain/shared/http/middleware/auth/token';
import { logout } from '.';

jest.mock('~backend/domain/shared/http/middleware/auth/token', () => {
  return {
    updateSessionIdentifierAndGetToken: jest.fn(),
  };
});

describe('Logout', () => {
  beforeEach(() => {
    (updateSessionIdentifierAndGetToken as jest.Mock).mockClear();
  });

  it('calls req.logout and redirect to / on successful logout', async () => {
    const req = {
      logout: jest.fn((cb) => cb(null)),
      user: { id: 123 },
    };

    const res = {
      redirect: jest.fn((url) => {
        expect(url).toBe('/');
      }),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };

    const next = jest.fn();

    await logout(req, res, next);

    expect(req.logout).toHaveBeenCalled();
    expect(updateSessionIdentifierAndGetToken).toHaveBeenCalledWith(
      req.user.id
    );
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next middleware with an error if logout encounters an error', () => {
    const req = {
      logout: jest.fn((cb) => cb(new Error('Logout Error'))),
    };
    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn((err) => {
      expect(err).toBeInstanceOf(Error);
    });

    logout(req, res, next);

    expect(req.logout).toHaveBeenCalled();
    expect(updateSessionIdentifierAndGetToken).not.toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
