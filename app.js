import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';

// Routers
import publicRouter from './routes/publicRouter.js';
import exchangeRatesRouter from './routes/exchangeRatesRouter.js';

// Middlewares
import notFoundHandlerMiddleware from './middlewares/notFoundHandlerMiddleware.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';

dotenv.config({
  path: path.resolve('./.env'),
});

const app = express();

// App settings
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.set('layout', path.resolve('./views/layouts/main.ejs'));

// App middlewares
app.use(express.static(path.resolve('./public')));
app.use(expressLayouts);

// Routes
app.use('/', publicRouter);
app.use('/api', exchangeRatesRouter);

// 404
app.use(notFoundHandlerMiddleware());

// Errors
app.use(errorHandlerMiddleware());

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT ${PORT} 🚀`);
});
