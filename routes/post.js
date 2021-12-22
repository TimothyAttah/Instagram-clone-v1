const postRouter = require('express').Router();
const { postControllers } = require('../controllers/post');
const { auth } = require('../middlewares/auth');


postRouter.post('/create', auth, postControllers.createPost);
postRouter.get('/', postControllers.getAllPosts);
postRouter.get('/my-posts', auth, postControllers.getMyPosts);
postRouter.put('/:postId/like', auth, postControllers.likePost);
postRouter.put('/comment', auth, postControllers.postComment);
postRouter.delete('/delete/:postId', auth, postControllers.deletePost);
postRouter.delete(
	'/delete/:id/:comment_id',
	auth,
	postControllers.deleteComment
);

module.exports = postRouter;

