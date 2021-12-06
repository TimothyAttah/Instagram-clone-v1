import { postTypes } from '../types';
import { toast } from 'react-toastify';

export const listPosts = (posts) => async dispatch =>{
  dispatch( {
    type: postTypes.LIST_POSTS,
    payload: posts
  })
}
export const createPost = (post) => async dispatch =>{
  dispatch( {
    type: postTypes.CREATE_POST,
    payload: post
  } )
  toast.success( 'New post created' );
}
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
export const likePost = (_id, userId) => async dispatch =>{
  dispatch( {
    type: postTypes.LIKE_POST,
    payload: {_id, userId}
  } )
  toast.success('You like this post');
}
export const unlikePost = (_id, userId) => async dispatch =>{
  dispatch( {
    type: postTypes.UNLIKE_POST,
    payload: {_id, userId}
  } )
  toast.success('You unlike this post');
}
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