export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

const initalState = {
  login_loading: false,
  login_done: false,
  login_error: null,
};

export const Login_reduecer = (data) => ({
  type: USER_LOGIN_REQUEST,
  data,
});
const user = (state = initalState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        login_loading: true,
        login_done: false,
        login_error: null,
      };

    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        login_loading: false,
        login_done: true,
        login_error: null,
      };

    case USER_LOGIN_FAILURE:
      return {
        ...state,
        login_loading: false,
        login_done: false,
        login_error: action.error,
      };

    default:
      return state;
  }
};
export default user;
