/* 
	23-01-08 회원가입 시 필요한 리듀서 작성(오병주)
  23-01-10 아이디 중복확인 함수 생성(오병주)
*/
export const USER_ID_REQUEST = "USER_ID_REQUEST";
export const USER_ID_SUCCESS = "USER_ID_SUCCESS";
export const USER_ID_FAILURE = "USER_ID_FAILURE";

const initalState = {
  ID_loading: false,
  ID_done: false,
  ID_error: null,
  uid: ''
};

const R_user_join = (state = initalState, action) => {
  switch (action.type) {
    case USER_ID_REQUEST:
      return {
        ...state,
        ID_loading: true,
        ID_done: false,
        ID_error: null,
      };
    case USER_ID_SUCCESS:
      return {
        ...state,
        ID_loading: false,
        ID_done: true,
        ID_error: null,
        uid: action.data
      };
    case USER_ID_FAILURE:
      return {
        ...state,
        ID_loading: false,
        ID_done: false,
        ID_error: action.error,
        uid: action.error
      };
    default:
      return state;
  }
};

export default R_user_join;
