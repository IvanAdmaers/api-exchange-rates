import { Router } from 'express';
import cors from 'cors';

import { rates } from '../controllers/exchangeRatesController';
import cacheMiddleware from '../middlewares/cacheMiddleware';
import validatorMiddleware from '../middlewares/validatorMiddleware';

const router = Router();

router.use(cors());

const cacheTime: number = 15 * 1000 * 60;

router.use(validatorMiddleware());
router.use(cacheMiddleware(cacheTime));

router.get('/ecb/latest', rates);
router.get('/ecb/:date', rates);
router.get('/ecb/timeseries', rates);

export default router;
