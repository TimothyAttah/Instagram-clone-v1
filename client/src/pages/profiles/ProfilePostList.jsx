import React, { useEffect, useState } from 'react';
import {
	listPosts,
	deletePost,
	deleteCommentPost,
	createCommentPost,
	likeAndUnlikePost,
} from '../../redux/actions/posts';
import {
	Delete,
	Favorite,
	ThumbDown,
	ThumbUp,
	DeleteForeverRounded,
} from '@material-ui/icons';
import moment from 'moment';
import { user } from '../../components/user';
import { useDispatch } from 'react-redux';
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
	Form,
} from '../posts/PostListItemStyles';
import { ReadMore } from '../../components/ReadMore';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

export const ProfilePostList = ( { post } ) => {
  const dispatch = useDispatch();
	const [ text, setText ] = useState( '' );
	const [like, setLike] = useState(post?.likes.length);
	const [isLiked, setIsLiked] = useState(false);
	
	useEffect(() => {
		setIsLiked(post.likes?.includes(user._id));
	}, [ setIsLiked, post.likes ] );

	useEffect(() => {
		dispatch(listPosts())
	}, [ dispatch ] );
	
	const handleLike = async (postId, userId) => {
		dispatch(likeAndUnlikePost(postId, userId));

		setLike(isLiked > 0 ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	const handleDeletePost = id => {
		dispatch(deletePost(id));
	};

const handleDeleteCommentPost = (id, commentId) => {
	dispatch(deleteCommentPost(id, commentId));
};

	const handleCreateComment = async e => {
		e.preventDefault();
		const newComment = {
			postId: post?._id,
			text,
		};
		dispatch(createCommentPost({ postId: post?._id }, newComment));
		setText('');
	};

  return (
		<div>
			<PostItems>
				<PostItemTop>
					<Link
						to={
							post?.postedBy?._id !== user._id
								? '/users/profile/' + post?.postedBy._id
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
					<img src={`/uploads/${post?.photo}`} alt='' />
					<PostItemCounter>
						<Favorite />
						<>
							{isLiked ? (
								<ThumbDown onClick={() => handleLike(post._id, user._id)} />
							) : (
								<ThumbUp onClick={() => handleLike(post._id, user._id)} />
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
								<ReadMore>{comment?.text}</ReadMore>
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
				</PostCommentFormContainer>
				<p>Posted on {moment(post.createdAt).format('MMMM Do YYYY')}</p>
			</PostItems>
		</div>
	);
}
