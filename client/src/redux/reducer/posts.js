import { postTypes } from '../types';
import { v4 } from 'uuid';

const initialState = {
  posts: [
    {
      _id: v4(),
      photo: '',
      like: ['1', '2'],
      comments: [
        {
          _id: v4(),
          text: 'Comments one...',
          postedBy: {
            _id: v4(),
            username: 'Jane Doe'
          }
        },
        {
          _id: v4(),
          text: 'Comments Two...',
          postedBy: {
            _id: v4(),
            username: 'Trisha Nick'
          }
        }
      ],
      body: 'This is post one...',
      createdAt: 'Feb 10 2020',
      postedBy: {
        _id: v4(),
        username: 'Jane Doe'
      }
    },
    {
      _id: v4(),
      photo: '',
      like: ['1', '2', '3'],
      comments: [
        {
          _id: v4(),
          text: 'This is a test...',
          postedBy: {
            _id: v4(),
            username: 'Trisha Nick'
          }
        },
        {
          _id: v4(),
          text: 'This is another test...',
          postedBy: {
            _id: v4(),
            username: 'Trisha Nick'
          }
        },
        {
          _id: v4(),
          text: 'Comments Three...',
          postedBy: {
            _id: v4(),
            username: 'John Doe'
          }
        }
      ],
      body: 'This is post two body note...',
      createdAt: 'June 15 2020',
      postedBy: {
        _id: v4(),
        username: 'Trisha Nick'
      }
    },
    {
      _id: v4(),
      photo: '',
      like: [],
      comments: [],
      body: 'This is post three...',
      createdAt: 'Dec 20 2020',
      postedBy: {
        _id: v4(),
        username: 'John Doe'
      }
    }
  ]
}

export const posts = ( state = initialState, action ) => {
  switch ( action.type ) {
    case postTypes.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case postTypes.LIST_POST:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload.post : post)
      }
    case postTypes.LIST_POSTS:
      return {
        ...state,
        posts: action.payload
      }
    case postTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      }
    case postTypes.EDIT_POST:
      return {
        ...state,
        posts: state.posts.map(post => post._id === action.payload._id ? action.payload.post : post)
      }
    default:
      return state
  }
}