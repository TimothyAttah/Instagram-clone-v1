import { Avatar } from '@material-ui/core'
import { Delete, DeleteOutlined, Favorite, ThumbDown, ThumbUp } from '@material-ui/icons'
import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'

export const PostListItem = ({post}) => {
  return (
		<>
			<div className='postItems'>
				<div className='postItemTop'>
					<Link to='/profile'>
						<Avatar />
						{post?.postedBy.username}
					</Link>
					<div>
						<Delete />
					</div>
        </div>
        <div className="postItemCenter">
          <img src={ post?.photo } alt="" />
          <div className="postItemCounter">
            <Favorite />
            <>
              <ThumbUp />
              <ThumbDown />
            </>
          </div>
          <h6>
            { post?.like.length } likes &nbsp;
            {post.comments.length} comments
          </h6>
        </div>
        <div className="postItemBottom">
          <h6>
            <Link to='/profile'>
              {post?.postedBy.username}
            </Link>
            {post.body}
          </h6>
        </div>
        { post.comments.length === 0 ? (
          <h6>
            No comments yet...
          </h6>
        ) : post.comments.length === 1 ? (
            <h6>
              View 1 comment
          </h6>
        ): (
              <h6>
                View all {post.comments.length} comments
              </h6>
            )
        }
        <div className="postCommentsContainer">
          { post.comments.map( comment => (
            <div key={comment._id}>
              <span>
                <Link to='/profile'>
                  { comment.postedBy.username }
                </Link>
              </span>
              <div className="commentCenter">
                {comment.text}
              </div>
              <DeleteOutlined />
            </div>
          ))}
        </div>
        <div className="commentsFormContainer">
          <form onSubmit={ e => {
            e.preventDefault()
            e.target[0].value = ''
          }}>
            <input type="text" placeholder='add a comment' />
          </form>
        </div>
        <p>
          Posted on {moment(post.createdAt).format('MMMM Do YYYY')}
        </p>
			</div>
		</>
	);
}
