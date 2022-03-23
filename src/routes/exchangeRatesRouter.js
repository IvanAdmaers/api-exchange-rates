import { Router } from 'express';

import { rates } from '../controllers/exchangeRatesController';

const router = Router();

router.get('/latest', rates);
router.get('/:date', rates);
router.get('/timeseries', rates);

export default router;
