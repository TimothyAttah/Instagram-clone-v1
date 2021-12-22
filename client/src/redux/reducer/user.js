import { userTypes } from "../types";

const initialState = {
  user: []
}

export const user = ( state = initialState, action ) => {
  switch ( action.type ) {
    case userTypes.GET_ALL_USERS:
    case userTypes.GET_A_USER:
      return {
        ...state,
        user: action.payload
      }
    case userTypes.FOLLOW_USER:
      return {
				...state,
				user: action.payload
			};
    case userTypes.UNFOLLOW_USER:
      return {
				...state,
				user: action.payload
			};
    // case userTypes.FOLLOW_USER:
    //   return {
		// 		...state,
		// 		user: state.user.map(result =>
		// 			result._id
		// 				? { ...result, followers: [...result.followers, action.payload] }
		// 				: result
		// 		),
		// 	};
    default:
      return state;
  }
}