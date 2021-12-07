import { Avatar } from '@material-ui/core'
import { Delete,  Favorite, ThumbDown, ThumbUp,  DeleteForeverRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { user } from '../../components/user';
import {
  likePost,
  unlikePost, deletePost, deleteCommentPost,
  createCommentPost
} from '../../redux/actions/posts';
import { v4 } from 'uuid';
import { ReadMore } from '../../components/ReadMore';

export const PostItems = styled.div`
	max-width: 35rem;
	width: 100%;
	box-shadow: var(--outer-shadow);
	padding: 1rem;
	margin: 2rem 0;
	margin-left: 2rem;
  p{
    font-size: 1.8rem;
    text-align: center;
    font-weight: 600;
    padding-bottom: 1rem;
  }
`;

export const PostItemTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
  margin-bottom: 1rem;
	a {
		display: flex;
		align-items: center;
		.MuiAvatar-root {
			height: 7rem;
			width: 7rem;
		}
		span {
			margin-left: 1rem;
			font-size: 2rem;
		}
	}
	.MuiSvgIcon-root {
		font-size: 2rem;
    cursor: pointer;
	}
`;

export const PostItemCenter = styled.div`
	img {
		width: 20rem;
		vertical-align: middle;
		margin-bottom: 3rem;
	}
	h6 {
		font-size: 1.5rem;
    font-weight: 500;
	}
`;

export const PostItemCounter = styled.div`
	display: flex;
	align-items: center;
  margin-bottom: 0.8rem;
	.MuiSvgIcon-root {
		display: flex;
		align-items: center;
		font-size: 2rem;
		cursor: pointer;
		color: #1895e9;
		:first-child {
			color: red;
			margin-right: 0.8rem;
		}
	}
`;

export const PostItemBottom = styled.div`
  margin: 1rem 0;
  h6{
    font-size: 1.5rem;
    font-weight: normal;
    a {
      font-weight: bold;
      margin-right: 1rem;
    }
  }
`;

export const PostCommentOptions = styled.div`
  h6{
    font-size: 1.2rem;
  }
`;
export const PostCommentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0.5rem 0;
	font-size: 1.2rem;
	div {
		display: flex;
    width: 100%;
		a {
			font-weight: bold;
			margin-right: 0.7rem;
		}
		div {
			display: inline-block;
			max-width: 22rem;
			width: 100%;
		}
	}
`;

export const PostCommentFormContainer = styled.div`
 
`;

export const Form = styled.form`
  margin: 2rem 0;
  input{
    border: none;
    border-bottom: 1px solid gray;
    width: 100%;
    padding: 1rem;
  }
`;

export const PostListItem = ( { post } ) => {
  const dispatch = useDispatch();
  const [ text, setText ] = useState( '' );
  const [ like, setLike ] = useState( post?.likes.length )
  const [ isLiked, setIsLiked ] = useState( false );

  useEffect( () => {
    setIsLiked(post.likes?.includes(user.user_id))
  }, [ setIsLiked, post.likes ] )
  
  const handleLike = ( id, userId ) => {
    dispatch( likePost( id, userId ) )
    setLike( isLiked > 0 ? like - 1 : like + 1 )
    setIsLiked(!isLiked)
  }

  const handleUnlike = ( id, userId ) => {
    dispatch( unlikePost( id, userId ) )
    setLike(isLiked > 0 ? like - 1 : like + 1);
		setIsLiked(!isLiked);
  }

  const handleDeletePost = ( id ) => {
    dispatch( deletePost( id ) );
  }

  const handleDeleteCommentPost = ( id, commentId ) => {
    dispatch( deleteCommentPost(id, commentId) );
  }

  const handleCreateComment = ( e ) => {
    e.preventDefault();
    const newComment = {
			_id: v4(),
			text,
			postedBy: {
				_id: '48b7ddb4-4da2-4fac-9b50-0546f21aeb72',
				username: 'John Doe',
			},
		};
    dispatch(createCommentPost(post?._id, newComment))
    console.log( 'This is comment>>>>', newComment );
    setText( '' );
  }
  return (
		<>
			<PostItems>
				<PostItemTop>
					<Link
						to={
							post.postedBy?._id !== user.user_id
								? '/profile' + post.postedBy._id
								: '/profile'
						}
					>
						<Avatar />
						<span>{post?.postedBy.username}</span>
					</Link>
					<>
						{post.postedBy._id === user.user_id && (
							<Delete onClick={() => handleDeletePost(post._id)} />
						)}
					</>
				</PostItemTop>
				<PostItemCenter>
					<img src={post?.photo} alt='' />
					<PostItemCounter>
						<Favorite />
						<>
							{isLiked ? (
								<ThumbDown
									onClick={() => handleUnlike(post._id, user.user_id)}
								/>
							) : (
								<ThumbUp onClick={() => handleLike(post._id, user.user_id)} />
							)}
						</>
					</PostItemCounter>
					<h6>
						{like} likes &nbsp;
						{post.comments.length} comments
					</h6>
				</PostItemCenter>
				<PostItemBottom>
					<h6>
						<Link
							to={
								post.postedBy._id !== user.user_id
									? '/profile' + post.postedBy._id
									: '/profile'
							}
						>
							{post?.postedBy.username}
						</Link>
						<ReadMore>{post.body}</ReadMore>
					</h6>
				</PostItemBottom>
				<PostCommentOptions>
					{post.comments.length === 0 ? (
						<h6>No comments yet...</h6>
					) : post.comments.length === 1 ? (
						<h6>View 1 comment</h6>
					) : (
						<h6>View all {post.comments.length} comments</h6>
					)}
				</PostCommentOptions>
				<>
					{post.comments?.map(comment => (
						<PostCommentContainer key={comment?._id}>
							<div>
								<Link
									to={
										comment?.postedBy?._id !== user.user_id
											? '/profile/' + comment?.postedBy?._id
											: '/profile'
									}
								>
									{comment?.postedBy?.username}:
								</Link>
								<ReadMore>{comment?.text}</ReadMore>
							</div>
							{comment.postedBy._id === user.user_id && (
								<DeleteForeverRounded
									onClick={() => handleDeleteCommentPost(post._id, comment._id)}
								/>
							)}
						</PostCommentContainer>
					))}
				</>
				<PostCommentFormContainer className='commentsFormContainer'>
					<Form onSubmit={handleCreateComment}>
						<input
							type='text'
							placeholder='add a comment'
							value={text}
							name='text'
							onChange={e => setText(e.target.value)}
						/>
					</Form>
				</PostCommentFormContainer>
				<p>Posted on {moment(post.createdAt).format('MMMM Do YYYY')}</p>
			</PostItems>
		</>
	);
}
