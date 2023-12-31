import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { TOKEN_COOKIE_NAME } from '~backend/domain/shared/http/middleware/auth/constants';

jest.mock('crypto');
jest.mock('jsonwebtoken');

const mockUserRepository = {
  save: jest.fn(),
  findOneBy: jest.fn(),
};

jest.mock('~backend/data-source', () => ({
  dataSource: {
    getRepository: jest.fn().mockReturnValueOnce(mockUserRepository),
  },
}));

import {
  ALGORITHM,
  generateNewSession,
  getJWT,
  findUserByToken,
  getTokenByReq,
  updateSessionIdentifierAndGetToken,
} from '.';
import * as utils from '.';

const jwtSecret = process.env.JWT_SECRET;

describe('Token Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generateNewSession returns a new session', async () => {
    const mockRandomBytes = 'random';
    crypto.randomBytes = jest.fn().mockResolvedValueOnce(mockRandomBytes);
    const session = await generateNewSession();
    expect(session).toBe(mockRandomBytes);
  });

  it('getJWT returns a JWT', () => {
    const mockJWTToken = 'jwt';
    const payload = { id: 1, sessionIdentifier: 'session' };
    jwt.sign = jest.fn().mockReturnValueOnce(mockJWTToken);
    const token = getJWT(payload);
    expect(token).toBe(mockJWTToken);
    expect(jwt.sign).toHaveBeenCalledWith(payload, jwtSecret, {
      algorithm: ALGORITHM,
      expiresIn: '30 days',
    });
  });

  it('findUserByToken returns a user by token', async () => {
    const payload = { id: 1, sessionIdentifier: 'session' };
    const token = 'token';
    jwt.verify = jest.fn().mockReturnValueOnce(payload);

    mockUserRepository.findOneBy.mockResolvedValueOnce({ id: payload.id });

    const user = await findUserByToken(token);
    expect(jwt.verify).toHaveBeenCalledWith(token, jwtSecret, {
      algorithm: [ALGORITHM],
    });
    expect(user).toEqual({ id: payload.id });
    expect(mockUserRepository.findOneBy).toHaveBeenCalledWith(payload);
  });

  it('updateSessionIdentifierAndGetToken updates session and return a token', async () => {
    const JWT = 'jwt';
    const sessionIdentifier = 'session';
    const id = 1;
    jest
      .spyOn(utils, 'generateNewSession')
      .mockResolvedValueOnce(sessionIdentifier);
    jest
      .spyOn(utils, 'updateSessionIdentifier')
      .mockResolvedValueOnce(undefined);
    jest.spyOn(utils, 'getJWT').mockReturnValueOnce(JWT);

    const token = await updateSessionIdentifierAndGetToken(id);
    expect(utils.generateNewSession).toHaveBeenCalled();
    expect(utils.updateSessionIdentifier).toHaveBeenCalledWith({
      id,
      sessionIdentifier,
    });
    expect(utils.getJWT).toHaveBeenCalledWith({ id, sessionIdentifier });
    expect(token).toBe(JWT);
  });

  it('getTokenByReq returns a token by request', () => {
    const cookieToken = 'cookieToken';
    const req = { cookies: { [TOKEN_COOKIE_NAME]: cookieToken } };
    const token = getTokenByReq(req);
    expect(token).toBe(cookieToken);
  });
});
