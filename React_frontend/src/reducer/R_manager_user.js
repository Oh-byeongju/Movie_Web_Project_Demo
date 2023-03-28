/*
	23-03-27 관리자 페이지 회원관리 구현(오병주)
  23-03-28 관리자 페이지 예매기록조회 구현(오병주)
*/
// 사용자 계정 조회 리스트
export const MANAGER_USER_LIST_REQUEST = "MANAGER_USER_LIST_REQUEST";
export const MANAGER_USER_LIST_SUCCESS = "MANAGER_USER_LIST_SUCCESS";
export const MANAGER_USER_LIST_FAILURE = "MANAGER_USER_LIST_FAILURE";

// 사용자 계정 삭제 리스트
export const MANAGER_USER_DROP_REQUEST = "MANAGER_USER_DROP_REQUEST";
export const MANAGER_USER_DROP_SUCCESS = "MANAGER_USER_DROP_SUCCESS";
export const MANAGER_USER_DROP_FAILURE = "MANAGER_USER_DROP_FAILURE";

// 영화 목록 조회 리스트
export const MANAGER_MOVIE_LIST_REQUEST = "MANAGER_MOVIE_LIST_REQUEST";
export const MANAGER_MOVIE_LIST_SUCCESS = "MANAGER_MOVIE_LIST_SUCCESS";
export const MANAGER_MOVIE_LIST_FAILURE = "MANAGER_MOVIE_LIST_FAILURE";
export const MANAGER_MOVIE_SELECT = "MANAGER_MOVIE_SELECT";

const initalState = {
  USER_LIST_loading: false,
  USER_LIST_done: false,
  USER_LIST_error: false,
	USER_LIST: [],
	USER_DROP_loading: false,
  USER_DROP_done: false,
  USER_DROP_error: false,
  MOVIE_LIST_loading: false,
  MOVIE_LIST_done: false,
  MOVIE_LIST_error: false,
	MOVIE_LIST: [],
  MOVIE: ''
};

const R_manager_user = (state = initalState, action) => {
  switch (action.type) {
    // 회원 조회 케이스들
    case MANAGER_USER_LIST_REQUEST:
      return {
        ...state,
        USER_LIST_loading: true,
        USER_LIST_done: false,
        USER_LIST_error: false,
      };
    case MANAGER_USER_LIST_SUCCESS:
      return {
        ...state,
        USER_LIST_loading: false,
        USER_LIST_done: true,
        USER_LIST_error: false,
        USER_LIST: action.data
      };
    case MANAGER_USER_LIST_FAILURE:
      return {
        ...state,
        USER_LIST_loading: false,
        USER_LIST_done: false,
        USER_LIST_error: true,
      };
		// 회원 추방 케이스들
    case MANAGER_USER_DROP_REQUEST:
      return {
        ...state,
        USER_DROP_loading: true,
        USER_DROP_done: false,
        USER_DROP_error: false,
      };
    case MANAGER_USER_DROP_SUCCESS:
      return {
        ...state,
        USER_DROP_loading: false,
        USER_DROP_done: true,
        USER_DROP_error: false,
        USER_LIST: state.USER_LIST.filter(user => user.uid !== action.data)
      };
    case MANAGER_USER_DROP_FAILURE:
      return {
        ...state,
        USER_DROP_loading: false,
        USER_DROP_done: false,
        USER_DROP_error: true,
      };
    // 영화 조회 케이스들
    case MANAGER_MOVIE_LIST_REQUEST:
      return {
        ...state,
        MOVIE_LIST_loading: true,
        MOVIE_LIST_done: false,
        MOVIE_LIST_error: false,
      };
    case MANAGER_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        MOVIE_LIST_loading: false,
        MOVIE_LIST_done: true,
        MOVIE_LIST_error: false,
        MOVIE_LIST: action.data,
        MOVIE: action.data[0]
      };
    case MANAGER_MOVIE_LIST_FAILURE:
      return {
        ...state,
        MOVIE_LIST_loading: false,
        MOVIE_LIST_done: false,
        MOVIE_LIST_error: true,
      };
    case MANAGER_MOVIE_SELECT:
      return {
        ...state,
        MOVIE: action.data
      };
    default:
      return state;
  }
};

export default R_manager_user;
