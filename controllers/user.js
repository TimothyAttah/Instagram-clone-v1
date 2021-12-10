import User from '../models/user.js';

export const userControllers = {
  getAllUsers: async ( req, res ) => {
    try {
      const allUsers = await User.find().select('-password');
      res.status( 200 ).json( allUsers );
    } catch (err) {
      console.log( `Error: ${ err.message }` );
      res.status( 500 ).json( { error: err.message } );
    }
  },
  getAUser: async ( req, res ) => {
    const _id = req.params.userId;
    try {
      const user = await User.findOne({ _id}).select('-password');
      if ( !user )
        return res.status( 404 ).json( { error: 'This account is not yours. Access denied.' } );
      res.status( 200 ).json( { user } );
    } catch (err) {
      console.log(`Error: ${err.message}`);
			res.status(500).json({ error: err.message });
    }
  }
}