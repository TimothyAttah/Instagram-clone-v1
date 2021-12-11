import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { postControllers } from '../controllers/post.js';

export const postRouter = Router();

postRouter.post( '/create', auth, postControllers.createPost );
postRouter.get( '/', postControllers.getAllPosts );
