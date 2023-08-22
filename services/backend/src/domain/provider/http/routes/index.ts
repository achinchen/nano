import { Router } from 'express';
// import { deleteLocationUseCase } from '~backend/domain/provider/use-case/delete-location';
import { serviceRepository } from '~backend/domain/service/repository/service';
const router = Router();
router.get('/provider/location', async (req, res) => {
  await serviceRepository.getInfoByIdAndProviderId(3, 1);
  res.send('Hello World!');
});

export default router;
