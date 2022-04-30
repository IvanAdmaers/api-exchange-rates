import { Router } from 'express';

import { rates } from '../controllers/exchangeRatesController';
import cacheMiddleware from '../middlewares/cacheMiddleware';

const router = Router();

const cacheTime = 15 * 1000 * 60;

router.get('/ecb/latest', cacheMiddleware(cacheTime), rates);
router.get('/ecb/:date', cacheMiddleware(cacheTime), rates);
router.get('/ecb/timeseries', cacheMiddleware(cacheTime), rates);

export default router;
