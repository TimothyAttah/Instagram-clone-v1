import User from '../models/user.js';

export const userControllers = {
  getAllUsers: async ( req, res ) => {
    try {
      const allUsers = await User.find().select('-password');
      res.status( 200 ).json( allUsers );
    } catch (err) {
      console.log( `Error: ${ err.message }` );
      res.status(500).json({error: err.message})
    }
  }
}