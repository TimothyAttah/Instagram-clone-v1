import mongoose from 'mongoose';

// mongoose.Types.ObjectId;
import { ObjectId  } from 'mongoose.Schema.Types';

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	pic: {
		type: String,
		default:
			'https://res.cloudinary.com/dnvtlgaf6/image/upload/v1609263625/blank-profile-picture-973460_1280_an4pwc.png',
	},
  followers: [ { type: ObjectId, ref: 'User'}],
  following: [ { type: ObjectId, ref: 'User' } ],
  date: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true } );

export default mongoose.model( 'User', UserSchema );
