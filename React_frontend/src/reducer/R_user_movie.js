/*
 23-01-19 유저 좋아요 toggle 구현(오병주)
*/
export const USER_MLIKE_REQUEST = "USER_MLIKE_REQUEST"
export const USER_MLIKE_SUCCESS = "USER_MLIKE_SUCCESS"
export const USER_MLIKE_FAILURE = "USER_MLIKE_FAILURE"

const initalState = {
  MLIKE_loading: false,
  MLIKE_done: false,
  MLIKE_error: null
};

const R_user_movie = (state = initalState, action) => {
	switch (action.type) {
		// 영화 좋아요 누르는 케이스들
		case USER_MLIKE_REQUEST:
			return {
				...state,
				MLIKE_loading: true,
				MLIKE_done: false,
				MLIKE_error: null
			};
		case USER_MLIKE_SUCCESS:
			return {
				...state,
				MLIKE_loading: false,
				MLIKE_done: true,
				MLIKE_error: null,
			};
		case USER_MLIKE_FAILURE:
			return {
				...state,
				MLIKE_loading: false,
				MLIKE_done: false,
				MLIKE_error: action.data,
			};
			default:
      	return state;
	}
}

export default R_user_movie;