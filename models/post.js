import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const PostSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true,
	},
	photo: {
		type: String,
		required: true,
	},
	likes: [{ type: ObjectId, ref: 'User' }],
	comments: [
		{
			text: String,
			postedBy: { type: ObjectId, ref: 'User' },
		},
	],
	postedBy: {
		type: ObjectId,
		ref: 'User',
	},
	date: {
		type: Date,
		default: Date.now(),
	},
}, { timestamps: true } );

export default mongoose.model( 'posts', PostSchema );
