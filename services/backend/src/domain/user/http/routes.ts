import { Router } from 'express';

const router = Router();

router.get('/login/federated/facebook', function (req, res) {
  res.send('Hello, World from federated/facebook!');
});

export default router;
