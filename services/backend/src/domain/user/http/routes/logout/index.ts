import { updateSessionIdentifierAndGetToken } from '~backend/domain/shared/http/middleware/auth/token';

export const logout = (req, res, next) => {
  req.logout(async (err) => {
    if (err) return next(err);
    await updateSessionIdentifierAndGetToken(req.user.id);
    res.status(204).end();
  });
};
