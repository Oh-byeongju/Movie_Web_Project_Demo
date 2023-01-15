export const initalState = {
  allmovie_loading: false,
  allmovie_done: false,
  allmovie_error: null,

  movie_select_loading: false,
  movie_select_done: false,
  movie_select_error: null,

  allMovie: [],
  alltheater: [],
  selectmovie: [],

  //내가 쓰려고 만든 더미 데이터
};

export const ALLMOVIE_REQUEST = "ALLMOVIE_REQUEST";
export const ALLMOVIE_SUCCESS = "ALLMOVIE_SUCCESS";
export const ALLMOVIE_FAILURE = "ALLMOVIE_FAILURE";

export const ALLTHEATER_REQUEST = "ALLTHEATER_REQUEST";
export const ALLTHEATER_SUCCESS = "ALLTHEATER_SUCCESS";
export const ALLTHEATER_FAILURE = "ALLTHEATER_FAILURE";

export const MOVIE_SELECT_REQUEST = "MOVIE_SELECT_REQUEST";
export const MOVIE_SELECT_SUCCESS = "MOVIE_SELECT_SUCCESS";
export const MOVIE_SELECT_FAILURE = "MOVIE_SELECT_FAILURE";

const ticket = (state = initalState, action) => {
  switch (action.type) {
    case ALLMOVIE_REQUEST:
      return {
        ...state, //불변성 때문에 ...state case 추가할 시 무조건 첫줄에 추가해야 됨
        allmovie_loading: true,
        allmovie_done: false,
        allmovie_error: null,
      };

    case ALLMOVIE_SUCCESS:
      return {
        ...state,
        allmovie_loading: false,
        allmovie_done: true,
        allmovie_error: null,
        allMovie: action.data,
      };

    case ALLMOVIE_FAILURE:
      return {
        ...state,
        add_ticket_loading: false,
        add_ticket_done: false,
        add_ticket_error: action.error,
      };

    case ALLTHEATER_REQUEST:
      return {
        ...state, //불변성 때문에 ...state case 추가할 시 무조건 첫줄에 추가해야 됨
        allmovie_loading: true,
        allmovie_done: false,
        allmovie_error: null,
      };

    case ALLTHEATER_SUCCESS:
      return {
        ...state,
        allmovie_loading: false,
        allmovie_done: true,
        allmovie_error: null,
        alltheater: action.data,
      };

    case ALLTHEATER_FAILURE:
      return {
        ...state,
        add_ticket_loading: false,
        add_ticket_done: false,
        add_ticket_error: action.error,
      };

    // -------------------------------------------------- 영화 검색 -------------------------------------------------
    case MOVIE_SELECT_REQUEST:
      return {
        ...state, //불변성 때문에 ...state case 추가할 시 무조건 첫줄에 추가해야 됨
        movie_select_loading: true,
        movie_select_done: false,
        movie_select_error: null,
      };

    case MOVIE_SELECT_SUCCESS:
      return {
        ...state,
        movie_select_loading: false,
        movie_select_done: true,
        movie_select_error: null,
        selectmovie: action.data,
      };

    case MOVIE_SELECT_FAILURE:
      return {
        ...state,
        movie_select_loading: false,
        movie_select_done: false,
        movie_select_error: action.error,
      };
    default:
      return state;
  }
};
export default ticket;
