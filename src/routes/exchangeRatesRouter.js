import { Router } from 'express';

import { rates } from '../controllers/exchangeRatesController';
import cacheMiddleware from '../middlewares/cacheMiddleware';
import validatorMiddleware from '../middlewares/validatorMiddleware';

const router = Router();

const cacheTime = 15 * 1000 * 60;

router.use(validatorMiddleware());

router.get('/ecb/latest', cacheMiddleware(cacheTime), rates);
router.get('/ecb/:date', cacheMiddleware(cacheTime), rates);
router.get('/ecb/timeseries', cacheMiddleware(cacheTime), rates);

export default router;
