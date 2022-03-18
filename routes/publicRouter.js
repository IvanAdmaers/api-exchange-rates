import { Router } from 'express';

// Controllers
import { mainPage } from '../controllers/publicController.js';

const router = Router();

router.get('/', mainPage);

export default router;
