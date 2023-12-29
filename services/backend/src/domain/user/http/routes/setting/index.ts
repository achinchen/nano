import { userRepository } from '~backend/domain/user/repository/user';

export const setting = async (req, res) => {
  try {
    const id = req.user.id;
    const profile = await userRepository.getById(id);
    if (!profile) return res.status(403).send();
    return res.json(profile);
  } catch {
    return res.status(500).send();
  }
};
