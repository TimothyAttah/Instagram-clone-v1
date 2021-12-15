import * as api from '../apis';
import { userTypes } from '../types';
import { toast } from 'react-toastify';

export const getAllUsers = () => async dispatch => {
 try {
    const { data } = await api.getAllUsers();
   dispatch( {
     type: userTypes.GET_ALL_USERS,
     payload: data
   } )
   console.log('All users >>>>>>', data)
 } catch (err) {
   if ( err.response && err.response.data ) {
     toast.error( err.response.data.error );
   }
 }
}

export const getUser = ( userId ) => async dispatch => {
  try {
    const { data } = await api.getAUser( userId );
    dispatch( {
      type: userTypes.GET_A_USER,
      payload: data
    } )
    console.log('My posts<<>>>>>>', data);
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast.error( err.response.data.error );
    }
  }
}