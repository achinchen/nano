export const logout = () => (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(204).end();
  });
};
