import axios from 'axios';

// export const baseURL = 'https://instagram-clone-app-v1.herokuapp.com';
// export const baseURL = 'http://localhost:5000/api';
export const baseURL = process.env.REACT_APP_BACKEND_API;

export const API = axios.create( { baseURL: baseURL } );

API.interceptors.request.use( req => {
  if ( localStorage.getItem( 'jwt' ) ) {
    req.headers[ 'Authorization' ] = `Bearer ${ localStorage.getItem( 'jwt' ) }`;
  }
  return req;
} )

export const signupUser = ( userData ) => API.post( '/auth/signup', userData );
export const signinUser = ( userData ) => API.post( '/auth/signin', userData );

export const getAllUsers = () => API.get( '/users' );
export const getAUser = (userId) => API.get( `/users/user/${userId}` );
export const followUser = (userId) => API.put( '/users/follow', userId );
export const unfollowUser = (userId) => API.put( '/users/unfollow', userId );



export const createPost = ( postData ) => API.post( '/posts/create', postData );
export const getAllPost = () => API.get( '/posts' );
export const getMyPosts = () => API.get( '/posts/my-posts' );
export const likeUnlikePost = ( postId, userId ) => API.put( `/posts/${ postId }/like`, userId );
export const deletePost = ( postId ) => API.delete( `/posts/delete/${ postId }` );
export const commentPost = ( comment ) => API.put( `/posts/comment`, comment );
export const deleteCommentPost = ( id, commentId ) => API.delete( `/posts/delete/${ id }/${ commentId }` );
