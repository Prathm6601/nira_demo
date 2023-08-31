import express, { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import { origin } from './config';

import {sequelizeConnection} from '../src/utils/connectDB';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// Middleware

// 1. Body Parser
app.use(express.json({ limit: '10kb' }));

// 2. Cookie Parser
app.use(cookieParser());

// 3. Logger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// 4. Cors
app.use(
  cors({
    origin:origin,
    credentials: true,
  })
);


app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// UnKnown Routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.listen(port, host, () => {
  sequelizeConnection;
  console.log(`[ ready ] http://${host}:${port}`);
});
