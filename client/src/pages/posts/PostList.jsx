import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../redux/actions/posts';
import { PostListItem } from './PostListItem';

export const PostList = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector( state => state.posts );
  console.log( 'This is posts>>>>>>', posts );

  useEffect( () => {
    dispatch( listPosts() )
  }, [ dispatch ] );
  
  return (
    <div>
      { posts?.length ? (
        posts.map( post => (
          <div key={post._id}>
            <PostListItem post={ post } />
          </div>
        ))
      ): (
        <h2> No posts yet... </h2>
      )}
    </div>
  )
}
