export const initalState = {
  allmovie_loading: false,
  allmovie_done: false,
  allmovie_error: false,
  allMovie: [],
  //내가 쓰려고 만든 더미 데이터
};

export const ALLMOVIE_REQUSET = "ALLMOVIE_REQUSET";
export const ALLMOVIE_SUCCESS = "ALLMOVIE_SUCCESS";
export const ALLMOVIE_FAILURE = "ALLMOVIE_FAILURE";

const ticket = (state = initalState, action) => {
  switch (action.type) {
    case ALLMOVIE_REQUSET:
      return {
        ...state, //불변성 때문에 ...state case 추가할 시 무조건 첫줄에 추가해야 됨
        allmovie_loading: true,
        allmovie_done: false,
        allmovie_error: null,
      };

    case ALLMOVIE_SUCCESS:
      console.log(action.data);
      console.log("heello");

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

    default:
      return state;
  }
};
export default ticket;
