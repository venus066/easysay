import { Router } from 'express';
import completion from './completion.js';
import auth from './auth.js'

const router = Router();

router.use('/completion', completion);
router.use('/auth', auth);

export default router;