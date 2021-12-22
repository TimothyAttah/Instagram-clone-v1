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
    // console.log('Get My posts <<>>>>>>', data);
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast.error( err.response.data.error );
    }
  }
}

export const followUser = ( userId ) => async dispatch => {
  try {
    const { data } = await api.followUser( userId );
    dispatch( {
      type: userTypes.FOLLOW_USER,
      payload: data.result
    } )
    toast.success( data.message );
    console.log('Get Follow user data <<>>>>>>', data);
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast.error( err.response.data.error );
    }
  }
}

export const unfollowUser = ( userId ) => async dispatch => {
  try {
    const { data } = await api.unfollowUser( userId );
    dispatch( {
      type: userTypes.UNFOLLOW_USER,
      payload: data
    } )
    toast.success(data.message);
    console.log('Get Unfollow user data <<>>>>>>', data);
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast.error( err.response.data.error );
    }
  }
}