import { logout as originLogout } from './logout';

const logout = originLogout();

describe('Logout', () => {
  it('calls req.logout and redirect to / on successful logout', () => {
    const req = {
      logout: jest.fn((cb) => cb(null)),
    };

    const res = {
      redirect: jest.fn((url) => {
        expect(url).toBe('/');
      }),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };

    const next = jest.fn();

    logout(req, res, next);

    expect(req.logout).toHaveBeenCalled();
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
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
