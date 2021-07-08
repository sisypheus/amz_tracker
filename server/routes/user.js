import express from 'express';

import { signup, signin, googlesignup, users } from '../controllers/user.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/googlesignup', googlesignup);
router.get('/users', users);

export default router;