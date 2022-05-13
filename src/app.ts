import path from 'path';
import dotenv from 'dotenv';
import express, { Application } from 'express';

import { RATES_CACHE_UPDATE_TIME_IN_MINUTES } from './constants';

dotenv.config({
  path: path.resolve('.env'),
});

(async () => {
  // Helpers
  const { setRates } = await import('./helpers');

  // Utills
  const { isProduction: isProductionMode } = await import('./utills');

  const init = async (): Promise<void> => {
    try {
      const isProduction = isProductionMode();

      type Options = {
        doCacheRates?: boolean;
        setRatesFromCache?: boolean;
        ratesCacheUpdateTimeInMinutes?: number;
      };

      const options: Options = {};

      if (!isProduction) {
        options.doCacheRates = true;
        options.setRatesFromCache = true;
        options.ratesCacheUpdateTimeInMinutes =
          RATES_CACHE_UPDATE_TIME_IN_MINUTES;
      }

      console.info('Rates are set...');
      await setRates(options);
      console.info('Rates have been set');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

  await init();

  const app: Application = express();

  app.disable('x-powered-by');

  // Routes
  const exchangeRatesRouter = await import('./routes/exchangeRatesRouter').then(
    (module) => module.default
  );

  app.use('/', exchangeRatesRouter);

  // Middlewares
  const [notFoundHandlerMiddleware, errorHandlerMiddleware] = await Promise.all(
    [
      import('./middlewares/notFoundHandlerMiddleware').then(
        (module) => module.default
      ),
      import('./middlewares/errorHandlerMiddleware').then(
        (module) => module.default
      ),
    ]
  );

  // 404
  app.use(notFoundHandlerMiddleware());

  // Errors
  app.use(errorHandlerMiddleware());

  const PORT: number = process.env.PORT ? +process.env.PORT : 3000;

  app.listen(PORT, () => {
    console.info(`🚀 Server is running on PORT ${PORT} 🚀`);
  });
})();
