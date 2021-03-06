import path from 'path';
import express from 'express';
import morgan from 'morgan';
import db from './db';

const app = express();

app.use(morgan('combined'));

const publicPath = path.resolve(process.cwd(), 'dist', 'web');

const wait = (): Promise<void> => {
  const timeout = Boolean(Math.random() < 0.5) ? 300 : 500;
  return new Promise((resolve, reject) => setTimeout(resolve, timeout));
};

app.use('/web/', express.static(publicPath, { index: false }));

app.use('/api/employees', async (req, res) => {
  await wait();

  res.set('Content-Type', 'application/json');
  res.end(JSON.stringify(db));
});

app.listen(3000, () => {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`API_URL: ${process.env.API_URL}`);
});

export default app;
