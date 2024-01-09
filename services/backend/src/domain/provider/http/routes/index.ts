import { Router } from 'express';
import { auth } from '~backend/domain/shared/http/middleware/auth';
import { middleware as transactionMiddleware } from '~backend/domain/shared/http/middleware/transaction';
import setting from './setting';

const router = Router();
router.use(transactionMiddleware('provider'));

router.get('/studio/setting', auth, setting);

export default router;
