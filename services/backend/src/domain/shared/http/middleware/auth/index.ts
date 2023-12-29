import { getTokenByReq, findUserByToken } from './token';

const getUserByReq = async (req) => {
  const token = getTokenByReq(req);
  if (!token) throw new Error();
  const user = await findUserByToken(token);
  if (!user) throw new Error();
  return user;
};

export const auth = async (req, res, next) => {
  try {
    const user = await getUserByReq(req);
    req.user = user;
    next();
  } catch {
    res.status(401).send();
  }
};

export const authSilent = async (req, res, next) => {
  try {
    const user = await getUserByReq(req);
    req.user = user;
    next();
  } catch {
    next();
  }
};
