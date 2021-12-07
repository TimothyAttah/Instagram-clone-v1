import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { createPost, listPosts } from '../../redux/actions/posts';

export const PostCreate = () => {
  const dispatch = useDispatch();
  const [ body, setBody ] = useState( '' );

  useEffect( () => {
    dispatch( listPosts() )
  }, [ dispatch ] )
  
   const { posts } = useSelector(state => state.posts);
		console.log('This is posts>>>>>>', posts);


  const handleSubmit = ( e ) => {
    e.preventDefault();
    const newPost = {
			_id: v4(),
			photo: '',
      likes: [],
      comments: [],
			body,
			createdAt: 'June 15 2020',
			postedBy: {
				_id: '76b2f840-7b74-4ca3-a9cf-6f98b661cd77',
				username: 'Trisha Nick',
			},
		};
    dispatch( createPost( newPost ) );
    console.log('New Post!!!!!', newPost);
  }
  return (
    <div>
      <h1>Post create</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='body'
          value={ body }
          onChange={e=> setBody(e.target.value)}
        />
        <button type='submit'>Create Post</button>
      </form>
    </div>
  )
}
