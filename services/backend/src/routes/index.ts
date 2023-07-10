import { Router } from 'express';

const entry = Router();

entry.get('/', (req, res) => {
  res.send({ message: 'Welcome to Vercel!' });
});

entry.get('/backend', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

export default entry;
