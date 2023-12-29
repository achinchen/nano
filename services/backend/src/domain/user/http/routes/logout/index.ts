import { updateSessionIdentifierAndGetToken } from '~backend/domain/shared/http/middleware/auth/token';

export const logout = async (req, res, next) => {
  try {
    if (!req.user) throw new Error('User not found');
    await updateSessionIdentifierAndGetToken(req.user.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
