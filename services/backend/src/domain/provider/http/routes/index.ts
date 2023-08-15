import { Router } from 'express';
import { deleteLocationUseCase } from '~backend/domain/provider/use-case/delete-location';
const router = Router();
router.get('/provider/location', async (req, res) => {
  await deleteLocationUseCase.execute({ id: 1, userId: 1 });
  res.send('Hello World!');
});

export default router;
