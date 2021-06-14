import express from 'express';

import { getTitle } from '../controllers/title.js';

const router = express.Router();

router.get('/', getTitle);

export default router;