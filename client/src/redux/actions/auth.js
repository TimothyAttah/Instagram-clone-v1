import * as api from '../apis';
import { authTypes } from '../types';
import { toast } from 'react-toastify';
import { history } from '../../history';

export const signupUser = (userData) => async dispatch => {
  try {
    const { data } = await api.signupUser(userData);
		dispatch({
			type: authTypes.SIGN_UP,
			payload: data,
    } );
    toast( data.message );
    history.push( '/signin' );
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast( err.response.data.error );
    }
  }
}

export const signinUser = (userData) => async dispatch => {
  try {
    const { data } = await api.signinUser(userData);
		dispatch({
			type: authTypes.SIGN_IN,
			payload: data.user,
    } );
    console.log( 'Sign in user data >>>>', data );
    localStorage.setItem( 'jwt', data.token );
    localStorage.setItem( 'user', JSON.stringify( data.user ) );
    toast( data.message );
    history.push( '/' );
    window.location.reload();
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast( err.response.data.error );
    }
  }
}

export const signOutUser = () => async dispatch => {
  dispatch( {
    type: authTypes.SIGN_OUT,
    payload: null
  } )
  localStorage.removeItem( 'user' );
  toast.success( 'Sign out successful' );
  history.push( '/signin' );
  window.location.reload();
}
