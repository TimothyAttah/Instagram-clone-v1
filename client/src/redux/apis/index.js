import axios from 'axios';

export const baseURL = 'http://localhost:5000/api';

const API = axios.create( { baseURL: baseURL } );

API.interceptors.request.use( req => {
  if ( localStorage.getItem( 'jwt' ) ) {
    req.headers[ 'Authorization' ] = `Bearer ${ localStorage.getItem( 'jwt' ) }`;
  }
  return req;
} )

export const signupUser = ( userData ) => API.post( '/auth/signup', userData );
export const signinUser = ( userData ) => API.post( '/auth/signin', userData );

export const getAllUsers = () => API.get( '/users' );
