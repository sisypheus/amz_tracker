import express from 'express';

import { getImageUrl } from '../controllers/image.js';

const router = express.Router();

router.get('/', getImageUrl);

export default router;