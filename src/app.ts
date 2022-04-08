import path from 'path';
import dotenv from 'dotenv';
import express from 'express';

// Routers
import exchangeRatesRouter from './routes/exchangeRatesRouter';

// Middlewares
import notFoundHandlerMiddleware from './middlewares/notFoundHandlerMiddleware';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';

// Libs
import { cron } from './libs';

// Helpers
import { shouldUpdateRates, setRates } from './helpers';

dotenv.config({
  path: path.resolve('.env'),
});

const app = express();

// Routes
app.use('/', exchangeRatesRouter);

// 404
app.use(notFoundHandlerMiddleware());

// Errors
app.use(errorHandlerMiddleware());

const PORT: number = process.env.PORT ? +process.env.PORT : 3000;

const start = async () => {
  try {
    const shouldUpdate = await shouldUpdateRates();

    if (shouldUpdate) {
      console.info('Rates are updating...');
      await setRates();
      console.info('Rates have been updated');
    }

    cron();

    app.listen(PORT, () => {
      console.info(`🚀 Server is running on PORT ${PORT} 🚀`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
