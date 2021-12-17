import { Avatar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser, followUser, unfollowUser } from '../../redux/actions/user';
import { API } from '../../redux/apis';
import { PostGallery } from '../posts/PostGallery';
import { ProfilePostList } from './ProfilePostList';
import { user } from '../../components/user';
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
	GalleryContainer
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
  
  const handleFollowUser = (id) => {
		setFollow( true );
		dispatch( followUser( id) );
  }
  const handleUnfollowUser = (id) => {
		setFollow( false );
		dispatch(unfollowUser(id))
	}


		const [showFollow, setShowFollow] = useState(
			user && user.results ? !user.results.following.includes(userId) : true
		);

	

	const followUser = () => {
		fetch(`/users/follow`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({ followId: userId }),
		})
			.then(res => res.json())
			.then(data => {
				console.log('user follow data INFO<<>>>>>', data);
				localStorage.setItem('user', JSON.stringify(data.user));
				setUserProfile(prevState => {
					return {
						...prevState,
						user: {
							...prevState.user,
							followers: [...prevState.user.followers, data._id],
						},
					};
				});
				setShowFollow(false);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const unFollowUser = () => {
		fetch(`/users/unfollow`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({ unfollowId: userId }),
		})
			.then(res => res.json())
			.then( data => {
				console.log('user UNfollow data INFO<<>>>>>', data);
				localStorage.setItem('user', JSON.stringify(data.user));
				setUserProfile(prevState => {
					const newFollower = prevState.user.followers.filter(
						item => item !== data._id
					);
					return {
						...prevState,
						user: {
							...prevState.user,
							followers: newFollower,
						},
					};
				});
				setShowFollow(true);
				//  window.location.reload( false );
			})
			.catch(err => {
				console.log(err);
			});
	};


	

	// console.log( 'My Posts>>>>>>', userProfile?.posts );
// console.log('this is user profile', userProfile?.user);
	
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
						{/* {showFollow ? (
							<button
								onClick={() => unFollowUser()}
								// onClick={() => handleUnfollowUser({ unfollowId: user._id })}
							>
								Unfollow
							</button>
						) : (
							<button onClick={() => followUser()}>
								Follow
							</button>
						)} */}

						{showFollow ? (
							<Button
								variant='contained'
								color='primary'
								onClick={() => followUser()}
							>
								Follow
							</Button>
						) : (
							<Button
								variant='contained'
								color='primary'
								onClick={() => unFollowUser()}
							>
								Unfollow
							</Button>
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
					<GalleryContainer>
						{userProfile?.posts.length ? (
							userProfile?.posts.map(post => (
								<div key={post._id}>
									<PostGallery post={post} />
								</div>
							))
						) : (
							<h2>No posts published yet...</h2>
						)}
					</GalleryContainer>
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
