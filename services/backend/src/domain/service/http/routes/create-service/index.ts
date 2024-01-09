import { createServiceUseCase } from '~backend/domain/service/use-case/create-service';

export default async function create(req, res) {
  const [error, result] = await createServiceUseCase.execute(req.body);
  if (error) throw error;
  res.json(result);
}
