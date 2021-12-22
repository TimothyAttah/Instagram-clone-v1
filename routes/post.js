import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { postControllers } from '../controllers/post.js';

export const postRouter = Router();

postRouter.post( '/create', auth, postControllers.createPost );
postRouter.get( '/', postControllers.getAllPosts );
postRouter.get( '/my-posts', auth, postControllers.getMyPosts );
postRouter.put( '/:postId/like', auth, postControllers.likePost );
postRouter.put( '/comment', auth, postControllers.postComment );
postRouter.delete( '/delete/:postId', auth, postControllers.deletePost );
postRouter.delete('/delete/:id/:comment_id', auth, postControllers.deleteComment);
