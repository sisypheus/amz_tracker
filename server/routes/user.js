import express from 'express';

import { signup, signin, googlesignup } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/googlesignup', googlesignup);

export default router;