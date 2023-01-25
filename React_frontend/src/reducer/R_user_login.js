/*
 23-01-19 로그인 구현(오병주)
 23-01-24 로그인 상태확인 구현(오병주)
*/
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_LOGIN_STATUS_REQUEST = "USER_LOGIN_STATUS_REQUEST";
export const USER_LOGIN_STATUS_SUCCESS = "USER_LOGIN_STATUS_SUCCESS";
export const USER_LOGIN_STATUS_FAILURE = "USER_LOGIN_STATUS_FAILURE";

const initalState = {
  LOGIN_loading: false,
  LOGIN_done: false,
  LOGIN_error: null,
  LOGIN_data: [],
  LOGIN_STATUS_loading: false,
  LOGIN_STATUS_done: false,
  LOGIN_STATUS_error: null,
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
        LOGIN_data: action.data
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        LOGIN_loading: false,
        LOGIN_done: false,
        LOGIN_error: action.error,
        LOGIN_data: action.data 
      };
    // 로그인 상태확인 케이스들
    case USER_LOGIN_STATUS_REQUEST:
      return {
        ...state,
        LOGIN_STATUS_loading: true,
        LOGIN_STATUS_done: false,
        LOGIN_STATUS_error: null,
      };
    case USER_LOGIN_STATUS_SUCCESS:
      return {
        ...state,
        LOGIN_STATUS_loading: false,
        LOGIN_STATUS_done: true,
        LOGIN_STATUS_error: null,
        LOGIN_STATUS_data: action.data
      };
    case USER_LOGIN_STATUS_FAILURE:
      return {
        ...state,
        LOGIN_STATUS_loading: false,
        LOGIN_STATUS_done: false,
        LOGIN_STATUS_error: action.error,
        LOGIN_STATUS_data: action.data
      };
    default:
      return state;
  }
};

export default R_user_login;
