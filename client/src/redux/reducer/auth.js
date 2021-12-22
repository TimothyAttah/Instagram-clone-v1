import { authTypes } from "../types";

const initialState = {
  auth: [],
}

export const auth = ( state = initialState, action ) => {
  switch ( action.type ) {
    case authTypes.SIGN_UP:
    case authTypes.SIGN_IN:
      return {
        ...state,
        auth: [action.payload, ...state.auth]
      }
    case authTypes.SIGN_OUT:
      return {
        ...state,
        auth: action.payload
      }
    default:
      return state;
  }
}