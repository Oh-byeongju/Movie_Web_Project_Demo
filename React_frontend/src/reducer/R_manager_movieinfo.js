/*
	23-04-03 관리자 페이지 상영정보관리 구현(오병주)
*/
// 영화 목록 조회 리스트
export const MANAGER_MOVIEINFO_MOVIE_LIST_REQUEST = "MANAGER_MOVIEINFO_MOVIE_LIST_REQUEST";
export const MANAGER_MOVIEINFO_MOVIE_LIST_SUCCESS = "MANAGER_MOVIEINFO_MOVIE_LIST_SUCCESS";
export const MANAGER_MOVIEINFO_MOVIE_LIST_FAILURE = "MANAGER_MOVIEINFO_MOVIE_LIST_FAILURE";

// 극장 목록 조회 리스트
export const MANAGER_MOVIEINFO_THEATER_LIST_REQUEST = "MANAGER_MOVIEINFO_THEATER_LIST_REQUEST";
export const MANAGER_MOVIEINFO_THEATER_LIST_SUCCESS = "MANAGER_MOVIEINFO_THEATER_LIST_SUCCESS";
export const MANAGER_MOVIEINFO_THEATER_LIST_FAILURE = "MANAGER_MOVIEINFO_THEATER_LIST_FAILURE";

// 상영관 목록 조회 리스트
export const MANAGER_MOVIEINFO_CINEMA_LIST_REQUEST = "MANAGER_MOVIEINFO_CINEMA_LIST_REQUEST";
export const MANAGER_MOVIEINFO_CINEMA_LIST_SUCCESS = "MANAGER_MOVIEINFO_CINEMA_LIST_SUCCESS";
export const MANAGER_MOVIEINFO_CINEMA_LIST_FAILURE = "MANAGER_MOVIEINFO_CINEMA_LIST_FAILURE";

// 상영정보 조회 리스트
export const MANAGER_MOVIEINFO_LIST_REQUEST = "MANAGER_MOVIEINFO_LIST_REQUEST";
export const MANAGER_MOVIEINFO_LIST_SUCCESS = "MANAGER_MOVIEINFO_LIST_SUCCESS";
export const MANAGER_MOVIEINFO_LIST_FAILURE = "MANAGER_MOVIEINFO_LIST_FAILURE";

const initalState = {
  MOVIEINFO_MOVIE_LIST_loading: false,
  MOVIEINFO_MOVIE_LIST_done: false,
  MOVIEINFO_MOVIE_LIST_error: false,
	MOVIEINFO_MOVIE_LIST: [],
	MOVIEINFO_THEATER_LIST_loading: false,
  MOVIEINFO_THEATER_LIST_done: false,
  MOVIEINFO_THEATER_LIST_error: false,
	MOVIEINFO_THEATER_LIST: [],
  MOVIEINFO_CINEMA_LIST_loading: false,
  MOVIEINFO_CINEMA_LIST_done: false,
  MOVIEINFO_CINEMA_LIST_error: false,
	MOVIEINFO_CINEMA_LIST: [],
	MOVIEINFO_LIST_loading: false,
  MOVIEINFO_LIST_done: false,
  MOVIEINFO_LIST_error: false,
	MOVIEINFO_LIST: []
};

const R_manager_movieinfo = (state = initalState, action) => {
  switch (action.type) {
    // 영화 목록 조회 케이스들
    case MANAGER_MOVIEINFO_MOVIE_LIST_REQUEST:
      return {
        ...state,
        MOVIEINFO_MOVIE_LIST_loading: true,
        MOVIEINFO_MOVIE_LIST_done: false,
        MOVIEINFO_MOVIE_LIST_error: false,
      };
    case MANAGER_MOVIEINFO_MOVIE_LIST_SUCCESS:
      return {
        ...state,
        MOVIEINFO_MOVIE_LIST_loading: false,
        MOVIEINFO_MOVIE_LIST_done: true,
        MOVIEINFO_MOVIE_LIST_error: false,
        MOVIEINFO_MOVIE_LIST: action.data
      };
    case MANAGER_MOVIEINFO_MOVIE_LIST_FAILURE:
      return {
        ...state,
        MOVIEINFO_MOVIE_LIST_loading: false,
        MOVIEINFO_MOVIE_LIST_done: false,
        MOVIEINFO_MOVIE_LIST_error: true,
      };
		// 극장 목록 조회 케이스들
    case MANAGER_MOVIEINFO_THEATER_LIST_REQUEST:
      return {
        ...state,
        MOVIEINFO_THEATER_LIST_loading: true,
        MOVIEINFO_THEATER_LIST_done: false,
        MOVIEINFO_THEATER_LIST_error: false,
      };
    case MANAGER_MOVIEINFO_THEATER_LIST_SUCCESS:
      return {
        ...state,
        MOVIEINFO_THEATER_LIST_loading: false,
        MOVIEINFO_THEATER_LIST_done: true,
        MOVIEINFO_THEATER_LIST_error: false,
        MOVIEINFO_THEATER_LIST: action.data
      };
    case MANAGER_MOVIEINFO_THEATER_LIST_FAILURE:
      return {
        ...state,
        MOVIEINFO_THEATER_LIST_loading: false,
        MOVIEINFO_THEATER_LIST_done: false,
        MOVIEINFO_THEATER_LIST_error: true,
      };
    // 상영관 목록 조회 케이스들
    case MANAGER_MOVIEINFO_CINEMA_LIST_REQUEST:
      return {
        ...state,
        MOVIEINFO_CINEMA_LIST_loading: true,
        MOVIEINFO_CINEMA_LIST_done: false,
        MOVIEINFO_CINEMA_LIST_error: false,
      };
    case MANAGER_MOVIEINFO_CINEMA_LIST_SUCCESS:
      return {
        ...state,
        MOVIEINFO_CINEMA_LIST_loading: false,
        MOVIEINFO_CINEMA_LIST_done: true,
        MOVIEINFO_CINEMA_LIST_error: false,
        MOVIEINFO_CINEMA_LIST: action.data
      };
    case MANAGER_MOVIEINFO_CINEMA_LIST_FAILURE:
      return {
        ...state,
        MOVIEINFO_CINEMA_LIST_loading: false,
        MOVIEINFO_CINEMA_LIST_done: false,
        MOVIEINFO_CINEMA_LIST_error: true,
      };
		// 상영정보 조회 케이스들
    case MANAGER_MOVIEINFO_LIST_REQUEST:
      return {
        ...state,
        MOVIEINFO_LIST_loading: true,
        MOVIEINFO_LIST_done: false,
        MOVIEINFO_LIST_error: false,
      };
    case MANAGER_MOVIEINFO_LIST_SUCCESS:
      return {
        ...state,
        MOVIEINFO_LIST_loading: false,
        MOVIEINFO_LIST_done: true,
        MOVIEINFO_LIST_error: false,
        MOVIEINFO_LIST: action.data
      };
    case MANAGER_MOVIEINFO_LIST_FAILURE:
      return {
        ...state,
        MOVIEINFO_LIST_loading: false,
        MOVIEINFO_LIST_done: false,
        MOVIEINFO_LIST_error: true,
      };
    default:
      return state;
  }
};

export default R_manager_movieinfo;
