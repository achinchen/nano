import type { Token, Payload, Id } from './types';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { dataSource } from '~backend/data-source';
import { User as DBUser } from '~backend/domain/user/infra/db/user';
import { TOKEN_COOKIE_NAME } from '~backend/domain/shared/http/middleware/auth/constants';
import * as utils from '.';

const JWT_SECRET = process.env.JWT_SECRET;
export const ALGORITHM = 'HS256';

const userRepository = dataSource.getRepository(DBUser);

export async function generateNewSession() {
  const randomBytes = await crypto.randomBytes(32);
  return randomBytes.toString('base64');
}

export async function updateSessionIdentifier({
  id,
  sessionIdentifier,
}: Payload) {
  const user = await userRepository.findOneBy({ id });
  await userRepository.save({
    ...user,
    sessionIdentifier,
  });
}

export function getJWT({ id, sessionIdentifier }: Payload) {
  return jwt.sign({ id: id, sessionIdentifier }, JWT_SECRET, {
    algorithm: ALGORITHM,
    expiresIn: '30 days',
  });
}

export async function findUserByToken(token: Token) {
  try {
    const { id, sessionIdentifier } = jwt.verify(token, JWT_SECRET, {
      algorithm: [ALGORITHM],
    }) as Payload;

    return await userRepository.findOneBy({
      id,
      sessionIdentifier,
    });
  } catch ({ message }) {
    return null;
  }
}

export async function updateSessionIdentifierAndGetToken(id: Id) {
  const sessionIdentifier = await utils.generateNewSession();
  await utils.updateSessionIdentifier({ id, sessionIdentifier });
  const token = utils.getJWT({ id, sessionIdentifier });
  return token;
}

export function getTokenByReq(req) {
  return req.cookies[TOKEN_COOKIE_NAME];
}
