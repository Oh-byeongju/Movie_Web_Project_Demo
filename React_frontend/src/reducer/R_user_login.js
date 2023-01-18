/*
 23-01-19 로그인 구현(오병주)
*/
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

const initalState = {
  LOGIN_loading: false,
  LOGIN_done: false,
  LOGIN_error: null,
  LOGIN_status: [],
};

const R_user_login = (state = initalState, action) => {
  switch (action.type) {
    // 로그인 케이스들
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        LOGIN_loading: true,
        LOGIN_done: false,
        LOGIN_error: null,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        LOGIN_loading: false,
        LOGIN_done: true,
        LOGIN_error: null,
        LOGIN_status: action.data
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        LOGIN_loading: false,
        LOGIN_done: false,
        LOGIN_error: action.error,
        LOGIN_status: action.data
      };
    default:
      return state;
  }
};

export default R_user_login;
