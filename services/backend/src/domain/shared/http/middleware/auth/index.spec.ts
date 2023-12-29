import * as token from './token';
import { auth, authSilent } from './index';

jest.mock('./token');

let req = { user: null };
const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
const next = jest.fn();

const user = { id: 1 };
const mockToken = 'token';

const getTokenByReq = token.getTokenByReq as jest.Mock;
const findUserByToken = token.findUserByToken as jest.Mock;

describe('auth', () => {
  beforeEach(() => {
    req = { user: null };
    jest.clearAllMocks();
  });

  it('auth authenticates user and call next', async () => {
    getTokenByReq.mockReturnValueOnce(mockToken);
    findUserByToken.mockResolvedValueOnce(user);
    await auth(req, res, next);

    expect(req.user).toEqual(user);
    expect(getTokenByReq).toHaveBeenCalledWith(req);
    expect(findUserByToken).toHaveBeenCalledWith(mockToken);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('auth responds with 401 when authentication fails', async () => {
    getTokenByReq.mockReturnValueOnce('');
    await auth(req, res, next);

    expect(req.user).toBeNull();
    expect(getTokenByReq).toHaveBeenCalledWith(req);
    expect(findUserByToken).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalled();
  });
});

describe('authSilent', () => {
  beforeEach(() => {
    req = { user: null };
    jest.clearAllMocks();
  });

  it('authSilent authenticates user silently and call next', async () => {
    getTokenByReq.mockReturnValueOnce(mockToken);
    findUserByToken.mockResolvedValue(user);

    await authSilent(req, res, next);
    expect(req.user).toEqual(user);
    expect(getTokenByReq).toHaveBeenCalledWith(req);
    expect(findUserByToken).toHaveBeenCalledWith(mockToken);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });

  it('authSilent responds with 401 when authentication fails', async () => {
    getTokenByReq.mockReturnValueOnce('');
    findUserByToken.mockResolvedValueOnce(null);

    await authSilent(req, res, next);

    expect(getTokenByReq).toHaveBeenCalledWith(req);
    expect(findUserByToken).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalledWith(401);
    expect(res.send).not.toHaveBeenCalled();
  });
});
