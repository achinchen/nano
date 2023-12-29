import { providerRepository } from '~backend/domain/provider/repository/provider';

export enum Role {
  guest,
  consumer,
  provider,
}

export const me = async (req, res, next) => {
  try {
    const id = req.user?.id;
    if (!id) return res.json({ role: Role.guest });

    const provider = await providerRepository.getByOwnerId(id);
    return res.json({ id, role: provider ? Role.provider : Role.consumer });
  } catch {
    next();
  }
};
