import { json } from "express";
import Post from "../models/post.js";

export const postControllers = {
	createPost: async (req, res) => {
		const postData = req.body;
		const { body, pic } = postData;
		try {
			if (!body || !pic)
				return res.status(422).json({ error: 'Enter text and pic' });
			req.user.password = undefined;
			const post = await new Post({
				body,
				photo: pic,
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
};