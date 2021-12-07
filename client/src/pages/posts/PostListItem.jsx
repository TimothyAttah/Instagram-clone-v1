import { Avatar } from '@material-ui/core'
import { Delete,  Favorite, ThumbDown, ThumbUp,  DeleteForeverRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { user } from '../../components/user';
import {
	likePost,
  unlikePost, deletePost, deleteCommentPost,
  createCommentPost
} from '../../redux/actions/posts';
import { v4 } from 'uuid';
import { ReadMore } from '../../components/ReadMore';

import {
	PostCommentContainer,
	PostCommentFormContainer,
	PostCommentOptions,
	PostItemBottom,
	PostItemCenter,
	PostItemCounter,
	PostItemTop,
	PostItems,
	Form
} from './PostListItemStyles';

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
