import { providerRepository } from '~backend/domain/provider/repository/provider';

export default async function setting(req, res) {
  const providers = await providerRepository.getDetailByOwnerId(req.user?.id);
  res.json(providers);
}
