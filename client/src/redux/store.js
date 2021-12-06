import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducer'

const middleware = [ thunk ];
const initialState = {};

export const store = createStore( reducers, initialState, compose( applyMiddleware( ...middleware ) ) );
