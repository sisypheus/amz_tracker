import express from 'express';

import { getPosts, createPost, updatePost, deletePost } from '../controllers/posts.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;