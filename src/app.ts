import path from 'path';
import dotenv from 'dotenv';
import express from 'express';

// Routers
import exchangeRatesRouter from './routes/exchangeRatesRouter';

// Middlewares
import notFoundHandlerMiddleware from './middlewares/notFoundHandlerMiddleware';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

// Helpers
import { shouldUpdateRates } from './helpers';

dotenv.config({
  path: path.resolve('../.env'),
});

const app = express();

// Routes
app.use('/api', exchangeRatesRouter);

// 404
app.use(notFoundHandlerMiddleware());

// Errors
app.use(errorHandlerMiddleware());

const PORT = process.env.PORT ?? 3000;

const updateRates = async () => {
  await Promise.resolve();

  return true;
};

const start = async () => {
  try {
    const shouldUpdate = await shouldUpdateRates();
  
    if (shouldUpdate) {
      await updateRates();
    }
  
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on PORT ${PORT} 🚀`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
