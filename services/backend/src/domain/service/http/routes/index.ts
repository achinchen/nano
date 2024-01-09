import { Router } from 'express';
import { auth } from '~backend/domain/shared/http/middleware/auth';
import { middleware as transactionMiddleware } from '~backend/domain/shared/http/middleware/transaction';
import create from './create-service';

const router = Router();
router.use(transactionMiddleware('service'));

router.post('/service/create', auth, create);

export default router;
