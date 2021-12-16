import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../redux/actions/user';
import { API } from '../../redux/apis';
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
	ProfileTopRight,
} from './ProfileStyles';

export const UserProfile = () => {
	const dispatch = useDispatch();
	const [showGallery, setShowGallery] = useState(false);
	const [ follow, setFollow] = useState(false);
	const { userId } = useParams();
	const [userProfile, setUserProfile] = useState()
	useEffect( () => {
		// dispatch( listPosts() );
		dispatch(getUser(userId));
	}, [dispatch, userId]);

	useEffect( () => {
		const getUserProfile = async () => {
			const { data } = await API.get( `/users/user/${ userId }` );
			setUserProfile(data)
		}
		getUserProfile();
	}, [userId] );


	const handleShowGallery = () => {
		setShowGallery(true);
	};

	const handleShowPosts = () => {
		setShowGallery(false);
  };
  
  const handleFollowUser = () => {
    setFollow( true );
  }
  const handleUnfollowUser = () => {
    setFollow( false );
	}
	
	

	console.log( 'My Posts>>>>>>', userProfile?.posts );
console.log('this is user profile', userProfile?.user);
	
	return (
		<ProfileContainer>
			<ProfileTop>
				<ProfileTopLeft primary>
					<Avatar />
				</ProfileTopLeft>
				<ProfileTopRight>
					<ProfileTopNameWrapper>
						<h4>{userProfile?.user.username}</h4>
						<h2>{userProfile?.user.name}</h2>
					</ProfileTopNameWrapper>

					<ProfileTopInfoWrapper>
						<div>
							<span>{userProfile?.posts.length}</span>
							posts
						</div>
						<div>
							<span>{userProfile?.user.followers?.length}</span>
							followers
						</div>
						<div>
							<span>{userProfile?.user.following?.length}</span>
							following
						</div>
					</ProfileTopInfoWrapper>
					<ProfileTopButtonWrapper primary>
						{follow ? (
							<button onClick={handleUnfollowUser}>Unfollow</button>
						) : (
							<button onClick={handleFollowUser}>Follow</button>
						)}
					</ProfileTopButtonWrapper>
				</ProfileTopRight>
			</ProfileTop>
			<hr />
			<ProfileBottomContainer>
				<ProfileBottomButtonWrapper>
					<button onClick={handleShowPosts}>Posts</button>
					<button onClick={handleShowGallery}>Gallery</button>
				</ProfileBottomButtonWrapper>
				{showGallery ? (
					<h1>Gallery coming soon...</h1>
				) : (
					<div className='profileBottomPostsContainer'>
						{userProfile?.posts.length ? (
							userProfile?.posts.map(post => (
								<div key={post._id}>
									<ProfilePostList post={post} />
								</div>
							))
						) : (
							<h2>No posts published yet...</h2>
						)}
					</div>
				)}
			</ProfileBottomContainer>
		</ProfileContainer>
	);
};
