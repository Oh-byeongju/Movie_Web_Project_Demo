/*
 23-03-17 마이페이지 영화 함수들 구현(오병주)
*/
export const USER_MOVIE_POSSIBLE_REQUEST = "USER_MOVIE_POSSIBLE_REQUEST"
export const USER_MOVIE_POSSIBLE_SUCCESS = "USER_MOVIE_POSSIBLE_SUCCESS"
export const USER_MOVIE_POSSIBLE_FAILURE = "USER_MOVIE_POSSIBLE_FAILURE"
export const USER_MY_COMMENT_WRITE_REQUEST = "USER_MY_COMMENT_WRITE_REQUEST"
export const USER_MY_COMMENT_WRITE_SUCCESS = "USER_MY_COMMENT_WRITE_SUCCESS"
export const USER_MY_COMMENT_WRITE_FAILURE = "USER_MY_COMMENT_WRITE_FAILURE"
export const USER_MY_COMMENT_SEARCH_REQUEST = "USER_MY_COMMENT_SEARCH_REQUEST"
export const USER_MY_COMMENT_SEARCH_SUCCESS = "USER_MY_COMMENT_SEARCH_SUCCESS"
export const USER_MY_COMMENT_SEARCH_FAILURE = "USER_MY_COMMENT_SEARCH_FAILURE"
// 마이페이지 영화 관람평 좋아요 리스트
export const USER_MY_COMMENT_LIKE_REQUEST = "USER_MY_COMMENT_LIKE_REQUEST"
export const USER_MY_COMMENT_LIKE_SUCCESS = "USER_MY_COMMENT_LIKE_SUCCESS"
export const USER_MY_COMMENT_LIKE_FAILURE = "USER_MY_COMMENT_LIKE_FAILURE"

const initalState = {
  MOVIE_POSSIBLE_loading: false,
  MOVIE_POSSIBLE_done: false,
  MOVIE_POSSIBLE_error: false,
	possibleMovie: [],
	MY_COMMENT_WRITE_loading: false,
  MY_COMMENT_WRITE_done: false,
  MY_COMMENT_WRITE_error: false,
	MY_COMMENT_status: '',
	MY_COMMENT_SEARCH_loading: false,
  MY_COMMENT_SEARCH_done: false,
  MY_COMMENT_SEARCH_error: false,
	MY_COMMENT_List: [],
	MY_COMMENT_LIKE_loading: false,
  MY_COMMENT_LIKE_done: false,
  MY_COMMENT_LIKE_error: false,
};

const R_mypage_movie = (state = initalState, action) => {
	switch (action.type) {
		// 관람평 작성 가능 영화 조회 케이스들
		case USER_MOVIE_POSSIBLE_REQUEST:
			return {
				...state,
				MOVIE_POSSIBLE_loading: true,
				MOVIE_POSSIBLE_done: false,
				MOVIE_POSSIBLE_error: false
			};
		case USER_MOVIE_POSSIBLE_SUCCESS:
			return {
				...state,
				MOVIE_POSSIBLE_loading: false,
				MOVIE_POSSIBLE_done: true,
				MOVIE_POSSIBLE_error: false,
				possibleMovie: action.data
			};
		case USER_MOVIE_POSSIBLE_FAILURE:
			return {
				...state,
				MOVIE_POSSIBLE_loading: false,
				MOVIE_POSSIBLE_done: false,
				MOVIE_POSSIBLE_error: true,
				possibleMovie: []
			};
		// 관람평 작성 케이스들
		case USER_MY_COMMENT_WRITE_REQUEST:
			return {
				...state,
				MY_COMMENT_WRITE_loading: true,
				MY_COMMENT_WRITE_done: false,
				MY_COMMENT_WRITE_error: false
			};
		case USER_MY_COMMENT_WRITE_SUCCESS:
			return {
				...state,
				MY_COMMENT_WRITE_loading: false,
				MY_COMMENT_WRITE_done: true,
				MY_COMMENT_WRITE_error: false,
				MY_COMMENT_status: action.data
			};
		case USER_MY_COMMENT_WRITE_FAILURE:
			return {
				...state,
				MY_COMMENT_WRITE_loading: false,
				MY_COMMENT_WRITE_done: false,
				MY_COMMENT_WRITE_error: true,
				MY_COMMENT_status: action.data
			};
		// 작성한 관람평 조회 케이스들
		case USER_MY_COMMENT_SEARCH_REQUEST:
			return {
				...state,
				MY_COMMENT_SEARCH_loading: true,
				MY_COMMENT_SEARCH_done: false,
				MY_COMMENT_SEARCH_error: false
			};
		case USER_MY_COMMENT_SEARCH_SUCCESS:
			return {
				...state,
				MY_COMMENT_SEARCH_loading: false,
				MY_COMMENT_SEARCH_done: true,
				MY_COMMENT_SEARCH_error: false,
				MY_COMMENT_List: action.data
			};
		case USER_MY_COMMENT_SEARCH_FAILURE:
			return {
				...state,
				MY_COMMENT_SEARCH_loading: false,
				MY_COMMENT_SEARCH_done: false,
				MY_COMMENT_SEARCH_error: true,
			};
		// 작성한 관람평 좋아요 케이스들
		case USER_MY_COMMENT_LIKE_REQUEST:
			return {
				...state,
				MY_COMMENT_LIKE_loading: true,
				MY_COMMENT_LIKE_done: false,
				MY_COMMENT_LIKE_error: false
			};
		case USER_MY_COMMENT_LIKE_SUCCESS:
			return {
				...state,
				MY_COMMENT_List: state.MY_COMMENT_List.map(comment => 
          comment.umid === action.data.umid ? {...comment, like: action.data.like, upcnt: action.data.upcnt} : comment
        ),
				MY_COMMENT_LIKE_loading: false,
				MY_COMMENT_LIKE_done: true,
				MY_COMMENT_LIKE_error: false,
			};
		case USER_MY_COMMENT_LIKE_FAILURE:
			return {
				...state,
				MY_COMMENT_LIKE_loading: false,
				MY_COMMENT_LIKE_done: false,
				MY_COMMENT_LIKE_error: action.data.umid
			};
		default:
      return state;
	}
}

export default R_mypage_movie;