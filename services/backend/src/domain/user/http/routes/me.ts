import { userRepository } from '~backend/domain/user/repository/user';

export const me = () => async (req, res) => {
  const id = req.session.passport?.user.id;
  const profile = await userRepository.getById(id);
  if (!profile) return res.status(403).send();
  return res.json(profile);
};
