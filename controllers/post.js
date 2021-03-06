const Post = require('../models/post');

const postControllers = {
	createPost: async (req, res) => {
		const postData = req.body;
		const { body, photo } = postData;
		try {
			if (!body || !photo)
				return res.status(422).json({ error: 'Enter text and pic' });
			req.user.password = undefined;
			const post = await new Post({
				body,
				photo,
				postedBy: req.user,
			});
			await post.save();
			res.status(200).json({ message: 'New post created.', post });
		} catch (err) {
			console.log(err.message);
			res.status(500).json({ error: err.message });
		}
	},
	getAllPosts: async (req, res) => {
		try {
			const posts = await Post.find()
				.populate('postedBy', '_id username pic followers following')
				.populate('comments.postedBy', '_id username')
				.sort('-createdAt');
			res.status(200).json({ posts });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	getMyPosts: async (req, res) => {
		try {
			const myPosts = await Post.find({ postedBy: req.user._id })
				.populate('postedBy', '_id username name pic followers following')
				.populate('comments.postedBy', '_id username name')
				.populate('comments.postedBy', '_id username pic name')
				.populate('postedBy', '_id username name pic')
				.sort('-createdAt');
			res.status(200).json({ myPosts });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	likePost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.postId);
			if (!post.likes.includes(req.body.userId)) {
				await post
					.updateOne({ $push: { likes: req.body.userId } })
					.populate('postedBy', '_id username pic')
					.populate('comments.postedBy', '_id username pic');
				res.status(200).json({ message: 'You like this post.' });
			} else {
				await post.updateOne({ $pull: { likes: req.body.userId } });
				res.status(200).json({ message: 'You dislike this post.' });
			}
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: err });
		}
	},
	postComment: async (req, res) => {
		const comment = {
			text: req.body.text,
			postedBy: req.user._id,
		};
		try {
			const posts = await Post.findByIdAndUpdate(
				req.body.postId,
				{
					$push: { comments: comment },
				},
				{ new: true }
			)
				.populate('comments.postedBy', '_id username photo')
				.populate('postedBy', '_id username pic');
			res.status(201).json({ message: 'You post a comment', posts });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	deletePost: async (req, res) => {
		const _id = req.params.postId;
		try {
			//  Post.findOne({ _id: req.params.postId })
			// 	// .populate('postedBy', '_id username pic')
			// 	.exec((err, post) => {
			// 		if (err || !post) {
			// 			return res.status(422).json({ error: err });
			// 		}
			// 		if (post.postedBy._id.toString() === req.user._id.toString()) {
			// 			post
			// 				.remove()
			// 				.then(result => {
			// 					res.json({ message: 'Post deleted successfully.', result });
			// 				})
			// 				.catch(err => {
			// 					console.log(err);
			// 				});
			// 		}
			// 	});
			//  Post.findOne({ _id })
			// 		.populate('postedBy', '_id username pic')
			// 		.exec(async (err, post) => {
			// 			if (err, !post) {
			// 				return res.status(404).json({ error: err });
			// 			}
			// 			if (post.postedBy._id.toString() === req.user._id.toString()) {
			// 				const deletedNote = await post.remove();
			// 				return res
			// 					.status(200)
			// 					.json({ message: 'Post deleted successfully', deletedNote });
			// 			}
			// 		});
			const deletedPost = await Post.findByIdAndDelete(_id);
			res
				.status(200)
				.json({ message: 'Post deleted successfully', deletedPost });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
	deleteComment: async (req, res) => {
		try {
			const comment = { _id: req.params.comment_id };
			Post.findByIdAndUpdate(
				req.params.id,
				{
					$pull: { comments: comment },
				},
				{
					new: true,
				}
			)
				.populate('comments.postedBy', '_id username pic')
				.populate('postedBy', '_id username pic')
				.exec((err, postComment) => {
					if (err || !postComment) {
						return res.status(422).json({ error: err });
					} else {
						const result = postComment;
						res.status(200).json({ message: 'Comment deleted', result });
					}
				});
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
};


module.exports = { postControllers };
