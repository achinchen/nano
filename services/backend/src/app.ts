import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to Vercel!' });
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

export default app;
