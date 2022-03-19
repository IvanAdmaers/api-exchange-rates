import path from 'path';
import dotenv from 'dotenv';
import express from 'express';

// Routers
import exchangeRatesRouter from './routes/exchangeRatesRouter.js';

// Middlewares
import notFoundHandlerMiddleware from './middlewares/notFoundHandlerMiddleware.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

dotenv.config({
  path: path.resolve('./.env'),
});

const app = express();

// App middlewares
app.use(express.static(path.resolve('./public')));

// Routes
app.use('/api', exchangeRatesRouter);

// 404
app.use(notFoundHandlerMiddleware());

// Errors
app.use(errorHandlerMiddleware());

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT ${PORT} 🚀`);
});
