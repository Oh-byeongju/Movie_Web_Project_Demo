export const initalState = {
  t_allMovie_loading: false,
  t_allMovie_done: false,
  t_allMovie_error: null,
  t_allMovie: [],

  allTheater_loading: false,
  allTheater_done: false,
  allTheater_error: null,
  allTheater: [],

  allDay_loading: false,
  allDay_done: false,
  allDay_error: null,
  allDay: [],

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

  select_Day_loading: false,
  select_Day_done: false,
  select_Day_error: null,
  selectDay: [],

  select_Theater_To_Day_loading: false,
  select_Theater_To_Day_done: false,
  select_Theater_To_Day_error: null,

  select_MovieTheater_To_Day_loading: false,
  select_MovieTheater_To_Day_done: false,
  select_MovieTheater_To_Day_error: null,

  disableMovie: [],
  disableArea: [],
  disableTheater: [],
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

//영화가 존재하는 날짜 다 출력
export const ALLDAY_REQUEST = "ALLDAY_REQUEST";
export const ALLDAY_SUCCESS = "ALLDAY_SUCCESS";
export const ALLDAY_FAILURE = "ALLDAY_FAILURE";

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

//극장으로 날짜 검색
export const SELECT_DAY_REQUEST = "SELECT_DAY_REQUEST";
export const SELECT_DAY_SUCCESS = "SELECT_DAY_SUCCESS";
export const SELECT_DAY_FAILURE = "SELECT_DAY_FAILURE";

//극장으로 날짜 검색
export const SELECT_THEATER_TO_DAY_REQUEST = "SELECT_THEATER_TO_DAY_REQUEST";
export const SELECT_THEATER_TO_DAY_SUCCESS = "SELECT_THEATER_TO_DAY_SUCCESS";
export const SELECT_THEATER_TO_DAY_FAILURE = "SELECT_THEATER_TO_DAY_FAILURE";

export const SELECT_MOVIETHEATER_TO_DAY_REQUEST =
  "SELECT_MOVIETHEATER_TO_DAY_REQUEST";
export const SELECT_MOVIETHEATER_TO_DAY_SUCCESS =
  "SELECT_MOVIETHEATER_TO_DAY_SUCCESS";
export const SELECT_MOVIETHEATER_TO_DAY_FAILURE =
  "SELECT_MOVIETHEATER_TO_DAY_FAILURE";

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

    //검색한 극장에 대한 지역 SELECT
    case ALLDAY_REQUEST:
      return {
        ...state,
        allDay_loading: true,
        allDay_done: false,
        allDay_error: null,
      };

    //전체 날짜 불러오기

    case ALLDAY_SUCCESS:
      return {
        ...state,
        allDay_loading: false,
        allDay_done: true,
        allDay_error: null,
        allDay: action.data,
      };
    case ALLDAY_FAILURE:
      return {
        ...state,
        allDay_loading: false,
        allDay_done: false,
        allDay_error: action.error,
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
        allTheater: action.data,
      };
    case SELECT_THEATER_FAILURE:
      return {
        ...state,
        select_theater_loading: false,
        select_theater_done: false,
        select_theater_error: action.error,
      };

    //영화 클릭 시 영화id와 지역으로 극장 검색
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
        disableTheater: action.data,
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

    //영화에 따른 날짜 SELECT
    case SELECT_DAY_REQUEST:
      return {
        ...state,
        select_Day_loading: true,
        select_Day_done: false,
        select_Day_error: null,
      };
    case SELECT_DAY_SUCCESS:
      return {
        ...state,
        select_Day_loading: false,
        select_Day_done: true,
        select_Day_error: null,
        selectDay: action.data,
      };
    case SELECT_DAY_FAILURE:
      return {
        ...state,
        select_Day_loading: false,
        select_Day_done: false,
        select_Day_error: action.error,
      };

    //극장에 따른 날짜 SELECT
    case SELECT_THEATER_TO_DAY_REQUEST:
      return {
        ...state,
        select_Theater_To_Day_loading: true,
        select_Theater_To_Day_done: false,
        select_Theater_To_Day_error: null,
      };
    case SELECT_THEATER_TO_DAY_SUCCESS:
      return {
        ...state,
        select_Theater_To_Day_loading: false,
        select_Theater_To_Day_done: true,
        select_Theater_To_Day_error: null,
        selectDay: action.data,
      };
    case SELECT_THEATER_TO_DAY_FAILURE:
      return {
        ...state,
        select_Theater_To_Day_loading: false,
        select_Theater_To_Day_done: false,
        select_Theater_To_Day_error: action.error,
      };

    case SELECT_MOVIETHEATER_TO_DAY_REQUEST:
      return {
        ...state,
        select_MovieTheater_To_Day_loading: true,
        select_MovieTheater_To_Day_done: false,
        select_MovieTheater_To_Day_error: null,
      };
    case SELECT_MOVIETHEATER_TO_DAY_SUCCESS:
      return {
        ...state,
        select_MovieTheater_To_Day_loading: false,
        select_MovieTheater_To_Day_done: true,
        select_MovieTheater_To_Day_error: null,
        selectDay: action.data,
      };
    case SELECT_MOVIETHEATER_TO_DAY_FAILURE:
      return {
        ...state,
        select_MovieTheater_To_Day_loading: false,
        select_MovieTheater_To_Day_done: false,
        select_MovieTheater_To_Day_error: null,
      };

    default:
      return state;
  }
};
export default ticket;
