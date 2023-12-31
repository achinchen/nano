import { updateSessionIdentifierAndGetToken } from '~backend/domain/shared/http/middleware/auth/token';
import { logout } from '.';

jest.mock('~backend/domain/shared/http/middleware/auth/token', () => {
  return {
    updateSessionIdentifierAndGetToken: jest.fn(),
  };
});

const next = jest.fn();

describe('Logout', () => {
  beforeEach(() => {
    (updateSessionIdentifierAndGetToken as jest.Mock).mockClear();
  });

  it('calls req.logout and redirect to / on successful logout', async () => {
    const req = {
      user: { id: 123 },
    };

    const res = {
      redirect: jest.fn((url) => {
        expect(url).toBe('/');
      }),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };

    await logout(req, res, next);

    expect(updateSessionIdentifierAndGetToken).toHaveBeenCalledWith(
      req.user.id
    );
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next middleware with an error if logout encounters an error', () => {
    const req = {};

    const res = {
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    const next = jest.fn((err) => {
      expect(err).toBeInstanceOf(Error);
    });

    logout(req, res, next);

    expect(updateSessionIdentifierAndGetToken).not.toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
