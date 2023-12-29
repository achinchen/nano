import { providerRepository } from '~backend/domain/provider/repository/provider';

export enum Role {
  guest,
  consumer,
  provider,
}

export const me = async (req, res) => {
  try {
    const id = req.user?.id;
    if (!id) return res.json({ role: Role.guest });

    const provider = await providerRepository.getByOwnerId(id);
    if (!provider) return res.json({ id, role: Role.consumer });

    return res.json({ id, role: Role.provider });
  } catch {
    return res.status(500).send();
  }
};
