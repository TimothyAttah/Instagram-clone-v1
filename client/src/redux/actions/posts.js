import { postTypes } from '../types';

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
  })
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
  })
}
export const editPost = (post, _id) => async dispatch =>{
  dispatch( {
    type: postTypes.EDIT_POST,
    payload: {_id, post}
  })
}
export const likePost = (_id, userId) => async dispatch =>{
  dispatch( {
    type: postTypes.LIKE_POST,
    payload: {_id, userId}
  })
}
export const unlikePost = (_id, userId) => async dispatch =>{
  dispatch( {
    type: postTypes.UNLIKE_POST,
    payload: {_id, userId}
  })
}