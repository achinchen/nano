import { logout } from './logout';

const logoutMiddleware = logout();

describe('Logout', () => {
  it('calls req.logout and redirect to / on successful logout', () => {
    const req = {
      logout: jest.fn((cb) => cb(null)),
    };

    const res = {
      redirect: jest.fn((url) => {
        expect(url).toBe('/');
      }),
    };

    const next = jest.fn();

    logoutMiddleware(req, res, next);

    expect(req.logout).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next middleware with an error if logout encounters an error', () => {
    const req = {
      logout: jest.fn((cb) => cb(new Error('Logout Error'))),
    };
    const res = {
      redirect: jest.fn(),
    };
    const next = jest.fn((err) => {
      expect(err).toBeInstanceOf(Error);
    });

    logoutMiddleware(req, res, next);

    expect(req.logout).toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
