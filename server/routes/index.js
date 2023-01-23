import { Router } from 'express';
import auth from './auth.js'
import completion from './completion.js'

const router = Router();

router.use('/completion', completion);
router.use('/auth', auth);

export default router;