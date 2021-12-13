import * as api from '../apis';
import { postTypes } from '../types';
import { toast } from 'react-toastify';
import { history } from '../../history';


export const createPost = (posts) => async dispatch =>{
  dispatch( {
    type: postTypes.CREATE_POST,
    payload: posts
  } )
  toast.success( 'New post created' );
  window.location.href='/'
}
export const listPosts = posts => async dispatch => {
  try {
    const { data } = await api.getAllPost();
    dispatch({
			type: postTypes.LIST_POSTS,
			payload: data.posts,
    } );
    console.log('All Posts action>>>>>>', data.posts);
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast.error( err.response.data.error );
    }
  }
};
export const listPost = (post, _id) => async dispatch =>{
  dispatch( {
    type: postTypes.CREATE_POST,
    payload: {post, _id}
  })
}
export const deletePost = ( _id) => async dispatch =>{
  dispatch( {
    type: postTypes.DELETE_POST,
    payload: _id
  } )
  toast.success('Post deleted successfully!!!')
}
export const editPost = (post, _id) => async dispatch =>{
  dispatch( {
    type: postTypes.EDIT_POST,
    payload: {_id, post}
  } )
  toast.success('Post edited successfully!!!');
}
export const likePost = ( postId, userId ) => async dispatch => {
  const {data} = await api.likeUnlikePost(postId, userId)
  dispatch( {
    type: postTypes.LIKE_POST,
    payload: {postId, userId}
  } )
  toast.success(data.message);
}
export const unlikePost = (_id, userId) => async dispatch =>{
  dispatch( {
    type: postTypes.UNLIKE_POST,
    payload: {_id, userId}
  } )
  toast.success('You unlike this post');
}
export const likeAndUnlikePost = (postId, userId) => async dispatch => {
	const { data } = await api.likeUnlikePost(postId, userId);
	dispatch({
		type: postTypes.LIKE_POST,
		payload: data
	});
	toast.success(data.message);
};

export const createCommentPost = (_id, text) => async dispatch =>{
  dispatch( {
    type: postTypes.CRATE_COMMENT_POST,
    payload: {_id, text}
  } )
  toast.success('You post a comment');
}
export const deleteCommentPost = (_id, commentId) => async dispatch =>{
  dispatch( {
    type: postTypes.DELETE_COMMENT_POST,
    payload: {_id, commentId}
  } )
  toast.success('Comment deleted successfully');
}