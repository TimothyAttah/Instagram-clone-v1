import { postTypes } from '../types';
import { v4 } from 'uuid';

const initialState = {
	posts: [
		{
			_id: v4(),
			photo: '',
			followers: [],
			following: [],
			likes: ['68284ebb-f25a-463c-aa31-737a948d5cac', '2'],
			comments: [
				{
					_id: 'b166931d-c41c-401d-a017-67b965f42eb7',
					text: `
								This HTML file is a template.
								If you open it directly in the browser, you will see an empty page.
								You can add webfonts, meta tags, or analytics to this file.
								The build step will place the bundled scripts into the <body> tag.
								To begin the development, run  or yarn start.
								To create a production bundle, use npm run build or yarn build.
    					`,
					postedBy: {
						_id: '68284ebb-f25a-463c-aa31-737a948d5cac',
						username: 'Jane Doe',
					},
				},
				{
					_id: v4(),
					text: 'Comments Two...',
					postedBy: {
						_id: '76b2f840-7b74-4ca3-a9cf-6f98b661cd77',
						username: 'Trisha Nick',
					},
				},
			],
			body: `
								This HTML file is a template.
								If you open it directly in the browser, you will see an empty page.
								You can add webfonts, meta tags, or analytics to this file.
								The build step will place the bundled scripts into the <body> tag.
								To begin the development, run  or yarn start.
								To create a production bundle, use npm run build or yarn build.
    					`,
			createdAt: 'Feb 10 2020',
			postedBy: {
				_id: '68284ebb-f25a-463c-aa31-737a948d5cac',
				username: 'Jane Doe',
			},
		},
		{
			_id: v4(),
			photo: '',
			followers: [],
			following: [],
			likes: ['1', '2', '3'],
			comments: [
				{
					_id: v4(),
					text: 'This is a test...',
					postedBy: {
						_id: '76b2f840-7b74-4ca3-a9cf-6f98b661cd77',
						username: 'Trisha Nick',
					},
				},
				{
					_id: v4(),
					text: 'This is another test...',
					postedBy: {
						_id: '68284ebb-f25a-463c-aa31-737a948d5cac',
						username: 'Jane Doe',
					},
				},
				{
					_id: v4(),
					text: 'Comments Three...',
					postedBy: {
						_id: '48b7ddb4-4da2-4fac-9b50-0546f21aeb72',
						username: 'John Doe',
					},
				},
			],
			body: 'This is post two body note...',
			createdAt: 'June 15 2020',
			postedBy: {
				_id: '76b2f840-7b74-4ca3-a9cf-6f98b661cd77',
				username: 'Trisha Nick',
			},
		},
		{
			_id: v4(),
			photo: '',
			followers: [],
			following: [],
			likes: [],
			// likes: ['68284ebb-f25a-463c-aa31-737a948d5cac'],
			comments: [],
			body: 'This is post three...',
			createdAt: 'Dec 20 2020',
			postedBy: {
				_id: '48b7ddb4-4da2-4fac-9b50-0546f21aeb72',
				username: 'John Doe',
			},
		},
		{
			_id: v4(),
			photo: '',
			followers: [],
			following: [],
			likes: [],
			// likes: ['68284ebb-f25a-463c-aa31-737a948d5cac'],
			comments: [],
			body: `If you open it directly in the browser, you will see an empty page.
								You can add webfonts, meta tags, or analytics to this file.`,
			createdAt: 'Dec 20 2021',
			postedBy: {
				_id: '48b7ddb4-4da2-4fac-9b50-0546f21aeb72',
				username: 'John Doe',
			},
		},
	],
};

export const posts = ( state = initialState, action ) => {
	switch (action.type) {
		case postTypes.CREATE_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		case postTypes.LIST_POSTS:
			return {
				...state,
				posts: action.payload
			};
		case postTypes.LIST_POST:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === action.payload._id ? action.payload.post : post
				),
			};
		case postTypes.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post._id !== action.payload),
			};
		case postTypes.EDIT_POST:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === action.payload._id ? action.payload.post : post
				),
			};
		case postTypes.LIKE_POST:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === action.payload.postId
						? { ...post, likes: [...post.likes, action.payload.userId] }
						: post
				),
			};

		// return {
		// 	...state,
		// 	posts: state.posts.map(post =>
		// 		post._id === action.payload._id ? action.payload : post
		// 	),
		// };
		case postTypes.LIKE_AND_UNLIKE_POST:
			return {
				...state,
				posts: action.payload
			}
		case postTypes.UNLIKE_POST:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === action.payload._id
						? {
								...post,
								likes: post.likes.filter(
									like => like !== action.payload.userId
								),
						  }
						: post
				),
			};
		case postTypes.CRATE_COMMENT_POST:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === action.payload._id
						? { ...post, comments: [...post.comments, action.payload.text] }
						: post
				),
			};
		case postTypes.DELETE_COMMENT_POST:
			return {
				...state,
				posts: state.posts.map(post =>
					post._id === action.payload._id
						? {
								...post,
								comments: post.comments.filter(
									comment => comment._id !== action.payload.commentId
								),
						  }
						: post
				),
			};
		default:
			return state;
	}
}