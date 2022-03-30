import { Router } from 'express';

import { rates } from '../controllers/exchangeRatesController';

const router = Router();

router.get('/ecb/latest', rates);
router.get('/ecb/:date', rates);
router.get('/ecb/timeseries', rates);

export default router;
