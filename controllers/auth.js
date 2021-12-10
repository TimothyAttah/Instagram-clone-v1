import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { keys } from '../config/keys.js';


export const authControllers = {
  signupUser: async ( req, res ) => {
    const userData = req.body;
    const { username, name, email, password, pic } = userData;
    try {
      if ( !username || !name || !email || !password )
        return res.status( 422 ).json( { error: 'Please fill in all fields.' } );
      if (username.length < 6) {
				return res.status(422).json({
					error: `Your username must be having 6 or more characters. You have entered only ${username.length} characters.`,
				});
			}
			if (username.length > 30) {
				return res.status(422).json({
					error: `Your username must not be having more than 30 characters. You have entered ${username.length} characters.`,
				});
			}
			if (name.length > 30) {
				return res.status(422).json({
					error: `Your name must not be having more than 30 characters. You have entered ${name.length} characters.`,
				});
      }
      const savedUser = await User.findOne({ username });
			if (savedUser) {
				return res.status(422).json({ error: 'Username already taken' });
			}
      const user = await User.findOne( { email } )
      if ( user ) return res.status( 400 ).json( { error: 'User with this email already exists.' } );
      const hashedPassword = await bcrypt.hash( password, 12 );
      const newUser = await new User( {
        username,
        name,
        email,
        password: hashedPassword,
        pic
      } );
      await newUser.save();
      res.status( 201 ).json( { message: 'Signup successfully.' } );
    } catch (err) {
      res.status(500).json({error: err.message})
    }
  },
  signinUser: async ( req, res ) => {
    const userData = req.body;
    const { email, password } = userData;
    try {
      if ( !email || !password )
        return res.status( 422 ).json( { error: 'Please fill in all required fields.' } );
      const user = await User.findOne( { email } );
      if ( !user ) return res.status(422).json({ error: 'Email or password is incorrect.' });
      const comparePassword = await bcrypt.compare( password, user.password );
      if ( !comparePassword ) return res.status( 422 ).json( { error: 'Password or email is incorrect.' } );
      const token = jwt.sign( { _id: user._id }, keys.JWT_SECRET, { expiresIn: '1d' } );
      user.password = undefined;

      res.status(200).json({message: 'Signin successfully.', user, token})
    } catch ( err ) {
      console.log(`Error: ${err}`);
       res.status(500).json({ error: err.message });
    }
  }
}