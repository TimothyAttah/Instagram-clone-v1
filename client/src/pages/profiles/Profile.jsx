import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { listPosts } from '../../redux/actions/posts';

export const ProfileContainer = styled.div`
	max-width: 60rem;
	width: 100%;
  margin: 0 auto;
`;

export const ProfileTop = styled.div`
  width: 100%;
  margin: 3rem auto 1rem;
  display: flex;
  justify-content: space-around;
`;

export const ProfileTopLeft = styled.div`
  /* border: 2px solid yellow; */
  width: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .MuiAvatar-root{
    width: 13rem;
    height: 13rem;
  }
  form {
    width: 80%;
    margin: 1rem 0;
    margin-top: 5rem;
    label{
      font-size: 1.8rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      cursor: pointer;
      border-bottom: 1px solid var(--gray);
    }
  }
`;

export const ProfileTopRight = styled.div`
	width: 35rem;
	/* border: 2px solid darkblue; */
	text-align: center;
`;
export const ProfileTopNameWrapper = styled.div`
	margin: 0 0 1rem;
	h4 {
		font-size: 2.5rem;
		padding-bottom: 1rem;
	}
	h2 {
		font-size: 3rem;
		padding-bottom: 1rem;
	}
`;
export const ProfileTopButtonWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 2rem;
  button{
    padding: 1rem;
    background-color: #127cff;
    color: var(--text-white);
    border-radius: 0.5rem;
    box-shadow: var(--outer-shadow);
  }
`;

export const ProfileTopInfoWrapper = styled.div`
	width: 32rem;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;

	div {
		width: 10rem;
		position: relative;
		font-size: 1.5rem;
		color: var(--gray);
		margin-top: 2rem;
    padding-bottom: 1rem;
		span {
			margin-right: 1rem;
			font-weight: 700;
			color: var(--text-black);
		}
	}
`;

export const ProfileBottomContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
`;
export const ProfileBottomButtonWrapper = styled.div`
	width: 20rem;
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 3rem;
	margin-left: 3rem;
	button {
		padding: 1rem;
		width: 9rem;
		background-color: transparent;
		font-size: 1.5rem;
	}
`;
// export const ProfileBottomContainer = styled.div`

// `;
// export const ProfileBottomContainer = styled.div`

// `;



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
                  <div></div>
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
