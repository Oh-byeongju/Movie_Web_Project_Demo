import { cardActionAreaClasses } from "@mui/material";

export const initalState = {
  select_theater_loading: false,
  select_theater_done: false,
  select_theater_error: null,
  selectTheater: [],
};

export const SELECT_THEATER_REQUEST = "SELECT_THEATER_REQUEST";
export const SELECT_THEATER_SUCCESS = "SELECT_THEATER_SUCCESS";
export const SELECT_THEATER_FAILURE = "SELECT_THEATER_FAILURE";

const ticket = (state = initalState, action) => {
  switch (action.type) {
    //영화에 대한 지역을 찾기 위한 리듀서

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
    default:
      return state;
  }
};
export default ticket;
