import { userTypes } from "../types";

const initialState = {
  user: []
}

export const user = ( state = initialState, action ) => {
  switch ( action.type ) {
    case userTypes.GET_ALL_USERS:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}