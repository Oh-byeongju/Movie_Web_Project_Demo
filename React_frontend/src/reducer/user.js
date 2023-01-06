export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";

const initalState = {
  //리듀서에서 값을 쓰려면 여기 추가하면 됨
  login_loading: false,
  login_done: false,
  login_error: null,
};

export const Login_reducer = (data) => ({
  //컴포넌트나 페이지에서 사용하려고 만든 함수
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

    case USER_LOGIN_SUCCESS: //사가에서 실행되면 여기action 에 사가에서 준 data값이 저장됨 그래서 로그인 데이터가 필요할 때 LoginData: action.data 이런식으로 사용가능
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
