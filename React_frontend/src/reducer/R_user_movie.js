/*
 23-01-19 유저 좋아요 toggle 구현(오병주)
 23-02-12 유저 관람평 작성 구현(오병주)
*/
export const USER_MLIKE_REQUEST = "USER_MLIKE_REQUEST"
export const USER_MLIKE_SUCCESS = "USER_MLIKE_SUCCESS"
export const USER_MLIKE_FAILURE = "USER_MLIKE_FAILURE"
export const USER_COMMENT_REQUEST = "USER_COMMENT_REQUEST"
export const USER_COMMENT_SUCCESS = "USER_COMMENT_SUCCESS"
export const USER_COMMENT_FAILURE = "USER_COMMENT_FAILURE"

const initalState = {
  MLIKE_loading: false,
  MLIKE_done: false,
  MLIKE_error: null,
	COMMENT_loading: false,
  COMMENT_done: false,
  COMMENT_error: null
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
		// 영화 관람평 작성 케이스들
		case USER_COMMENT_REQUEST:
			return {
				...state,
				COMMENT_loading: true,
				COMMENT_done: false,
				COMMENT_error: null
			};
		case USER_COMMENT_SUCCESS:
			return {
				...state,
				COMMENT_loading: false,
				COMMENT_done: true,
				COMMENT_error: null,
			};
		case USER_COMMENT_FAILURE:
			return {
				...state,
				COMMENT_loading: false,
				COMMENT_done: false,
				COMMENT_error: action.data,
			};
		default:
      return state;
	}
}

export default R_user_movie;