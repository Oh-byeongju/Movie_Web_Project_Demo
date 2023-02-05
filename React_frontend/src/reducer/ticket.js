export const initalState = {
  t_allMovie_loading: false,
  t_allMovie_done: false,
  t_allMovie_error: null,
  t_allMovie: [],

  allArea_loading: false,
  allArea_done: false,
  allArea_error: null,
  allArea: [],

  allTheater_loading: false,
  allTheater_done: false,
  allTheater_error: null,
  allTheater: [],

  select_theater_loading: false,
  select_theater_done: false,
  select_theater_error: null,
  selectTheater: [],

  select_MovieTheater_loading: false,
  select_MovieTheater_done: false,
  select_MovieTheater_error: null,
  selectMovieTheater: [],

  select_TheaterToMovie_loading: false,
  select_TheaterToMovie_done: false,
  select_TheaterToMovie_error: null,
  selectTheaterToMovie: [],
};

export const T_ALLMOVIE_REQUEST = "T_ALLMOVIE_REQUEST";
export const T_ALLMOVIE_SUCCESS = "T_ALLMOVIE_SUCCESS";
export const T_ALLMOVIE_FAILURE = "T_ALLMOVIE_FAILURE";

//지역 검색
export const ALLAREA_REQUEST = "ALLAREA_REQUEST";
export const ALLAREA_SUCCESS = "ALLAREA_SUCCESS";
export const ALLAREA_FAILURE = "ALLAREA_FAILURE";

//지역에 따른
export const ALLTHEATER_REQUEST = "ALLTHEATER_REQUEST";
export const ALLTHEATER_SUCCESS = "ALLTHEATER_SUCCESS";
export const ALLTHEATER_FAILURE = "ALLTHEATER_FAILURE";

//영화 아이디로 지역 검색
export const SELECT_THEATER_REQUEST = "SELECT_THEATER_REQUEST";
export const SELECT_THEATER_SUCCESS = "SELECT_THEATER_SUCCESS";
export const SELECT_THEATER_FAILURE = "SELECT_THEATER_FAILURE";

//극장으로 영화 검색
export const SELECT_THEATER_TO_MOVIE_REQUEST =
  "SELECT_THEATER_TO_MOVIE_REQUEST";
export const SELECT_THEATER_TO_MOVIE_SUCCESS =
  "SELECT_THEATER_TO_MOVIE_SUCCESS";
export const SELECT_THEATER_TO_MOVIE_FAILURE =
  "SELECT_THEATER_TO_MOVIE_FAILURE";

//영화ID + AREA로 극장 검색
export const SELECT_MOVIETHEATER_REQUEST = "SELECT_MOVIETHEATER_REQUEST";
export const SELECT_MOVIETHEATER_SUCCESS = "SELECT_MOVIETHEATER_SUCCESS";
export const SELECT_MOVIETHEATER_FAILURE = "SELECT_MOVIETHEATER_FAILURE";

const ticket = (state = initalState, action) => {
  switch (action.type) {
    //전체 영화 검색 movie reduecer 의 값 변경이 안되서 새로 만듬

    case T_ALLMOVIE_REQUEST:
      return {
        ...state, //불변성 때문에 ...state case 추가할 시 무조건 첫줄에 추가해야 됨
        t_allMovie_loading: true,
        t_allMovie_done: false,
        t_allMovie_error: null,
      };

    case T_ALLMOVIE_SUCCESS:
      return {
        ...state,
        t_allMovie_loading: false,
        t_allMovie_done: true,
        t_allMovie_error: null,
        t_allMovie: action.data,
      };

    case T_ALLMOVIE_FAILURE:
      return {
        ...state,
        t_allMovie_loading: false,
        t_allMovie_done: false,
        t_allMovie_error: action.error,
      };

    // 전체 지역 SELECT
    case ALLAREA_REQUEST:
      return {
        ...state, //불변성 때문에 ...state case 추가할 시 무조건 첫줄에 추가해야 됨
        allArea_loading: true,
        allArea_done: false,
        allArea_error: null,
      };

    case ALLAREA_SUCCESS:
      return {
        ...state,
        allArea_loading: false,
        allArea_done: true,
        allArea_error: null,
        allArea: action.data,
      };

    case ALLAREA_FAILURE:
      return {
        ...state,
        allArea_loading: false,
        allArea_done: false,
        allArea_error: null,
      };

    //검색한 극장에 대한 지역 SELECT
    case ALLTHEATER_REQUEST:
      return {
        ...state,
        allTheater_loading: true,
        allTheater_done: false,
        allTheater_error: null,
      };

    case ALLTHEATER_SUCCESS:
      return {
        ...state,
        allTheater_loading: false,
        allTheater_done: true,
        allTheater_error: null,
        allTheater: action.data,
      };
    case ALLTHEATER_FAILURE:
      return {
        ...state,
        allTheater_loading: false,
        allTheater_done: false,
        allTheater_error: action.error,
      };

    //영화 클릭 시 영화id로 지역 검색
    case SELECT_THEATER_REQUEST:
      return {
        ...state,
        select_theater_loading: true,
        select_theater_done: false,
        select_theater_error: null,
      };

    case SELECT_THEATER_SUCCESS:
      return {
        ...state,
        select_theater_loading: false,
        select_theater_done: true,
        select_theater_error: null,
        allArea: action.data,
      };
    case SELECT_THEATER_FAILURE:
      return {
        ...state,
        select_theater_loading: false,
        select_theater_done: false,
        select_theater_error: action.error,
      };

    //영화 클릭 시 영화id로 지역 검색
    case SELECT_MOVIETHEATER_REQUEST:
      return {
        ...state,
        select_MovieTheater_loading: true,
        select_MovieTheater_done: false,
        select_MovieTheater_error: null,
      };
    case SELECT_MOVIETHEATER_SUCCESS:
      return {
        ...state,
        select_MovieTheater_loading: false,
        select_MovieTheater_done: true,
        select_MovieTheater_error: null,
        allTheater: action.data,
      };
    case SELECT_MOVIETHEATER_FAILURE:
      return {
        ...state,
        select_MovieTheater_loading: false,
        select_MovieTheater_done: false,
        select_MovieTheater_error: action.error,
        allTheater: [],
      };

    //지역에 따른 영화 SELECT
    case SELECT_THEATER_TO_MOVIE_REQUEST:
      return {
        ...state,
        select_TheaterToMovie_loading: true,
        select_TheaterToMovie_done: false,
        select_TheaterToMovie_error: null,
      };
    case SELECT_THEATER_TO_MOVIE_SUCCESS:
      return {
        ...state,
        select_TheaterToMovie_loading: false,
        select_TheaterToMovie_done: true,
        select_TheaterToMovie_error: null,
        t_allMovie: action.data,
      };
    case SELECT_THEATER_TO_MOVIE_FAILURE:
      return {
        ...state,
        select_TheaterToMovie_loading: false,
        select_TheaterToMovie_done: false,
        select_TheaterToMovie_error: action.error,
      };
    default:
      return state;
  }
};
export default ticket;
