import * as api from '../apis';
import { postTypes } from '../types';
import { toast } from 'react-toastify';
import { history } from '../../history';


export const createPost = (postData) => async dispatch =>{
  try {
    const { data } = await api.createPost( postData );
    dispatch({
			type: postTypes.CREATE_POST,
			payload: data.post
		});
    toast.success( data.message );
    console.log('New post action>>>>>>>>>>>>', data);
		history.push('/');
  } catch (err) {
    if (err.response && err.response.data) {
			toast.error(err.response.data.error);
		}
  }
}
export const listPosts = () => async dispatch => {
  try {
    const { data } = await api.getAllPost();
    dispatch({
			type: postTypes.LIST_POSTS,
			payload: data.posts,
    } );
    // console.log('All Posts action>>>>>>', data.posts);
  } catch (err) {
    if ( err.response && err.response.data ) {
      toast.error( err.response.data.error );
    }
  }
};
export const getMyPosts = () => async dispatch => {
  try {
    const { data } = await api.getMyPosts();
    dispatch( {
      type: postTypes.LIST_POST,
      payload: data.myPosts
    } )
    console.log('My posts action', data.myPosts);
  } catch (err) {
     if (err.response && err.response.data) {
				toast.error(err.response.data.error);
			}
  }
}
// export const listPost = (post, _id) => async dispatch =>{
//   dispatch( {
//     type: postTypes.CREATE_POST,
//     payload: {post, _id}
//   })
// }
export const deletePost = ( _id ) => async dispatch => {
  const { data } = await api.deletePost( _id );
  dispatch( {
    type: postTypes.DELETE_POST,
    payload: _id
  } )
  toast.success( data.message );
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
export const unlikePost = ( postId, userId ) => async dispatch => {
  const { data } = await api.likeUnlikePost(postId, userId);
  dispatch( {
    type: postTypes.UNLIKE_POST,
    payload: {postId, userId}
  } )
  toast.success(data.message);
}
export const likeAndUnlikePost = (postId, userId) => async dispatch => {
	const { data } = await api.likeUnlikePost(postId, userId);
	dispatch({
		type: postTypes.LIKE_POST,
		payload: data
	});
	toast.success(data.message);
};

export const createCommentPost = ( _id, text ) => async dispatch => {
  const { data } = await api.commentPost( text );
  dispatch({
		type: postTypes.CRATE_COMMENT_POST,
		payload: { _id, text },
	});
  toast.success( data.message );
  console.log( 'post comment action<<<>>>>>', data.posts );
  window.location.reload();
}
export const deleteCommentPost = ( _id, commentId ) => async dispatch => {
  try {
    const { data } = await api.deleteCommentPost(_id, commentId);
		dispatch({
			type: postTypes.DELETE_COMMENT_POST,
			payload: { _id, commentId },
		});
		toast.success(data.message);
  } catch (err) {
    if (err.response && err.response.data) {
			toast.error(err.response.data.error);
		}
  }
}