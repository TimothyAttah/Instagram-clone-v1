import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { keys } from '../config/keys.js';

export const auth = async ( req, res, next ) => {
  try {
    const { authorization } = req.headers;
    if ( !authorization )
      return res.status( 401 ).json( { error: 'Unauthorized user, permission denied.' } );

    const token = authorization.replace( 'Bearer ', '' );

    jwt.verify( token, keys.JWT_SECRET, async ( err, payload ) => {
      if ( err )
        return res.status( 403 ).json( { error: 'Invalid token. Permission denied.' } );

      const { _id } = payload;
      const userData = await User.findById( _id );
      req.user = userData;
      next();
    })
  } catch (err) {
    console.log( err.message );
    res.status( 500 ).json( { error: err.message } );
  }
}
