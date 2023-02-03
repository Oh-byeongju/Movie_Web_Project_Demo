export const initalState = {
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
};

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

//영화ID + AREA로 극장 검색
export const SELECT_MOVIETHEATER_REQUEST = "SELECT_MOVIETHEATER_REQUEST";
export const SELECT_MOVIETHEATER_SUCCESS = "SELECT_MOVIETHEATER_SUCCESS";
export const SELECT_MOVIETHEATER_FAILURE = "SELECT_MOVIETHEATER_FAILURE";

const ticket = (state = initalState, action) => {
  switch (action.type) {
    //영화에 대한 지역을 찾기 위한 리듀서
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

    //검색한 영화 검색
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

    //영화 id로 극장 검색하기
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
        selectTheater: action.data,
      };
    case SELECT_THEATER_FAILURE:
      return {
        ...state,
        select_theater_loading: false,
        select_theater_done: false,
        select_theater_error: action.error,
      };

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
        selectMovieTheater: action.data,
      };
    case SELECT_MOVIETHEATER_FAILURE:
      return {
        ...state,
        select_MovieTheater_loading: false,
        select_MovieTheater_done: false,
        select_MovieTheater_error: action.error,
      };
    default:
      return state;
  }
};
export default ticket;
