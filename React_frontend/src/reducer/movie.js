export const initalState = {
  allmovie_loading: false,
  allmovie_done: false,
  allmovie_error: null,
  movie_search_loading: false,
  movie_search_done: false,
  movie_search_error: null,

  allMovie: [],
  searchmovie: [],
};

//전체 영화 리스트
export const ALLMOVIE_REQUEST = "ALLMOVIE_REQUEST";
export const ALLMOVIE_SUCCESS = "ALLMOVIE_SUCCESS";
export const ALLMOVIE_FAILURE = "ALLMOVIE_FAILURE";

//검색한 영화 리스트
export const MOVIE_SEARCH_REQUEST = "MOVIE_SEARCH_REQUEST";
export const MOVIE_SEARCH_SUCCESS = "MOVIE_SEARCH_SUCCESS";
export const MOVIE_SEARCH_FAILURE = "MOVIE_SEARCH_FAILURE";

const movie = (state = initalState, action) => {
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
    /**-------------------------------------전체 영화 페이지에서 영화검색 */
    case MOVIE_SEARCH_REQUEST:
      return {
        ...state, //불변성 때문에 ...state case 추가할 시 무조건 첫줄에 추가해야 됨
        movie_search_loading: true,
        movie_search_done: false,
        movie_search_error: null,
      };

    case MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        movie_search_loading: false,
        movie_search_done: true,
        movie_search_error: null,
        allMovie: action.data,
      };

    case MOVIE_SEARCH_FAILURE:
      return {
        ...state,
        movie_search_loading: false,
        movie_search_done: false,
        movie_search_error: action.error,
      };

    default:
      return state;
  }
};
export default movie;
