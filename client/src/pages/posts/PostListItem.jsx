import { Avatar } from '@material-ui/core'
import { Delete,  Favorite, ThumbDown, ThumbUp,  DeleteForeverRounded } from '@material-ui/icons'
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { user } from '../../components/user';
import {
	deletePost, deleteCommentPost,
	createCommentPost,
	likeAndUnlikePost,
} from '../../redux/actions/posts';
import { ReadMore } from '../../components/ReadMore';

import {
	PostCommentFormContainer,
	PostCommentOptions,
	PostItemBottom,
	PostItemCenter,
	PostItemCounter,
	PostItemTop,
	PostItems,
	PostCommentItem,
	PostCommentItems,
	Form
} from './PostListItemStyles';

export const PostListItem = ( { post } ) => {
  const dispatch = useDispatch();
  const [ text, setText ] = useState( '' );
  const [ like, setLike ] = useState( post?.likes.length )
	const [ isLiked, setIsLiked ] = useState( false );
	

  useEffect( () => {
    setIsLiked(post.likes?.includes(user._id))
  }, [ setIsLiked, post.likes ] )
  

  const handleLike = async ( postId, userId ) => {
    dispatch( likeAndUnlikePost( postId, userId ) )

    setLike( isLiked > 0 ? like - 1 : like + 1 )
    setIsLiked(!isLiked)
  }

  const handleDeletePost = ( id ) => {
    dispatch( deletePost( id ) );
  }

  const handleDeleteCommentPost = ( id, commentId ) => {
    dispatch( deleteCommentPost(id, commentId) );
  }

  const handleCreateComment = async ( e ) => {
    e.preventDefault();
		const newComment = {
			postId:post?._id,
			text
		};
    dispatch(createCommentPost({postId: post?._id}, newComment));
		setText( '' );
	}
	

	// const makeComment = (text, postId) => {
	// 	fetch('/posts/comment', {
	// 		method: 'put',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Authorization: 'Bearer ' + localStorage.getItem('jwt'),
	// 		},
	// 		body: JSON.stringify({
	// 			postId,
	// 			text,
	// 		}),
	// 	})
	// 		.then(res => res.json())
	// 		.then(result => {
	// 			console.log(result);
	// 			const newData = data.map(item => {
	// 				if (item._id === result._id) {
	// 					return result;
	// 				} else {
	// 					return item;
	// 				}
	// 			});
	// 			setData(newData);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		});
	// };
  return (
		<>
			<PostItems>
				<PostItemTop>
					<Link
						to={
							post.postedBy?._id !== user._id
								? '/users/profile/' + post.postedBy._id
								: '/users/profile'
						}
					>
						<Avatar />
						<span>{post?.postedBy.username}</span>
					</Link>
					<>
						{post.postedBy._id === user._id && (
							<Delete onClick={() => handleDeletePost(post._id)} />
						)}
					</>
				</PostItemTop>
				<PostItemCenter>
					<img src={`/uploads/${post.photo}`} alt='' />
					<PostItemCounter>
						<Favorite />
						<>
							{isLiked ? (
								<ThumbDown
									onClick={() => handleLike(post._id, { userId: user._id })}
								/>
							) : (
								<ThumbUp
									onClick={() => handleLike(post._id, { userId: user._id })}
								/>
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
								post.postedBy._id !== user._id
									? '/users/profile/' + post.postedBy._id
									: '/users/profile'
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
				<PostCommentItems>
					{post.comments?.map(comment => (
						<PostCommentItem key={comment?._id}>
							<div>
								<Link
									to={
										comment?.postedBy?._id !== user._id
											? '/users/profile/' + comment?.postedBy?._id
											: '/users/profile'
									}
								>
									{comment?.postedBy?.username}:
								</Link>
								<span>{comment?.text}</span>
							</div>
							{comment.postedBy._id === user._id && (
								<DeleteForeverRounded
									onClick={() => handleDeleteCommentPost(post._id, comment._id)}
								/>
							)}
						</PostCommentItem>
					))}
				</PostCommentItems>
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

					{/* <Form
						onSubmit={e => {
							e.preventDefault();
							makeComment(e.target[0].value, post._id);
							e.target[0].value = '';
						}}
					>
						<input type='text' placeholder='add a comment' />
					</Form> */}
				</PostCommentFormContainer>
				<p>Posted on {moment(post.createdAt).format('MMMM Do YYYY')}</p>
			</PostItems>
		</>
	);
}
