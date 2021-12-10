import User from '../models/user.js';

export const userControllers = {
	getAllUsers: async (req, res) => {
		try {
			const allUsers = await User.find().select('-password');
			res.status(200).json(allUsers);
		} catch (err) {
			console.log(`Error: ${err.message}`);
			res.status(500).json({ error: err.message });
		}
	},
	getAUser: async (req, res) => {
		const _id = req.params.userId;
		try {
			const user = await User.findOne({ _id }).select('-password');
			if (!user)
				return res
					.status(404)
					.json({ error: 'This account is not yours. Access denied.' });
			res.status(200).json({ user });
		} catch (err) {
			console.log(`Error: ${err.message}`);
			res.status(500).json({ error: err.message });
		}
	},
	updateUser: async (req, res) => {
		const { username, name, email } = req.body;
		const newUsername = req.body.username;
		const newName = req.body.name;
		const id = req.params.id;

		try {
			const savedUser = User.findOne({ username });
			const savedUsername = User.findOne({ name });
			if (savedUser)
				return res.status(422).json({
					error: 'This username is already taken. Please try a different one',
				});
			if (savedUsername) {
				return res.status(422).json({
					error: 'This name is already taken. Please try a different one',
				});
			}
			const user = User.findOne({ email });
			if (!user) return res.status(422).json({ error: 'Invalid Credentials' });
			if (newUsername.length < 6) {
				return res.status(422).json({
					error: `Your username must be having 6 or more characters. You have entered only ${newUsername.length} characters.`,
				});
			}
			if (newUsername.length > 30) {
				return res.status(422).json({
					error: `Your username must not be having more than 30 characters. You have entered ${newUsername.length} characters.`,
				});
			}
			if (newName.length > 30) {
				return res.status(422).json({
					error: `Your name must not be having more than 30 characters. You have entered ${newName.length} characters.`,
				});
			}
			user.username = newUsername;
			await user.save();
			res.status(200).json({ message: 'Username changed successfully.' });
			user.name = newName;
			await user.save();
			res.status(200).json({ message: 'Name changed successfully.' });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},
};