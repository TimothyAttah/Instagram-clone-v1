import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { listPosts } from '../../redux/actions/posts';
import { ProfilePostList } from './ProfilePostList';
import {
  ProfileBottomButtonWrapper,
  ProfileBottomContainer,
  ProfileContainer,
  ProfileTop,
  ProfileTopButtonWrapper,
  ProfileTopInfoWrapper,
  ProfileTopLeft,
  ProfileTopNameWrapper,
  ProfileTopRight
} from './ProfileStyles';


export const Profile = () => {
  const dispatch = useDispatch();
  const [ showGallery, setShowGallery ] = useState( false );
  const { posts } = useSelector( state => state.posts );
  useEffect( () => {
    dispatch( listPosts() )
  }, [dispatch] );

  const handleShowGallery = () => {
    setShowGallery( true );
  }

  const handleShowPosts = () => {
    setShowGallery( false );
  }


  
  console.log('My Posts>>>>>>', posts);
  return (
    <ProfileContainer>
      <ProfileTop>
        <ProfileTopLeft>
          <Avatar />
          <form>
            <label htmlFor='pic'>Update Pic</label>
            <input
              type="file"
              placeholder='Update pic'
              name='pic'
              id='pic'
              style={{display:'none'}}
            />
          </form>
        </ProfileTopLeft>
        <ProfileTopRight>
          <ProfileTopNameWrapper>
            <h4>jane_love</h4>
            <h2>Jane Beauty</h2>
          </ProfileTopNameWrapper>
          <ProfileTopButtonWrapper>
            <button>Update Email</button>
            <button>Delete My Account</button>
          </ProfileTopButtonWrapper>
          <ProfileTopInfoWrapper>
            <div>
              <span>4</span>
              posts
            </div>
            <div>
              <span>2</span>
              followers
            </div>
            <div>
              <span>100</span>
              following
            </div>
          </ProfileTopInfoWrapper>
        </ProfileTopRight>
      </ProfileTop>
      <hr />
      <ProfileBottomContainer>
        <ProfileBottomButtonWrapper>
          <button onClick={handleShowPosts}>Posts</button>
          <button onClick={handleShowGallery}>Gallery</button>
        </ProfileBottomButtonWrapper>
        { showGallery ? (
          <h1>Gallery coming soon...</h1>
        ) : (
            <div className='profileBottomPostsContainer'>
              { posts.length ? (
                posts.map( post => (
                  <div key={post._id}>
                    <ProfilePostList post={post} />
                  </div>
                ))
              ): (
                <h2>No posts published yet...</h2>
              )}
            </div>
        )}
      </ProfileBottomContainer>
    </ProfileContainer>
  )
}
