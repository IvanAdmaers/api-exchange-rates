import { Router } from 'express';

import { latest } from '../controllers/exchangeRatesController.js';

const router = Router();

router.get('/latest', latest);

export default router;
