import * as api from '../apis';
import { authTypes } from '../types';
import { toast } from 'react-toastify';

export const signupUser = (userData) => async dispatch => {
  try {
    const { data } = await api.signupUser(userData);
		dispatch({
			type: authTypes.SIGN_UP,
			payload: data,
    } );
    toast( data.message );
    window.location.href = '/signin';
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast( err.response.data.error );
    }
  }
}