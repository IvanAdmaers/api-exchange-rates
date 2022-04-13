import path from 'path';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config({
  path: path.resolve('.env'),
});

(async () => {
  // Helpers
  const { setRates } = await import('./helpers');

  const init = async (): Promise<void> => {
    try {
      const isProduction = process.env.NODE_ENV === 'production';
      const options = { doCacheRates: false, setRatesFromCache: false };

      if (!isProduction) {
        options.doCacheRates = true;
        options.setRatesFromCache = true;
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

  const app = express();

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
