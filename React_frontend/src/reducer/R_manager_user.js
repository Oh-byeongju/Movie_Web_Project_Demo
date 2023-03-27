/*
	23-03-27 관리자 페이지 회원관리 구현(오병주)
*/
// 사용자 계정 조회 리스트
export const MANAGER_USER_LIST_REQUEST = "MANAGER_USER_LIST_REQUEST";
export const MANAGER_USER_LIST_SUCCESS = "MANAGER_USER_LIST_SUCCESS";
export const MANAGER_USER_LIST_FAILURE = "MANAGER_USER_LIST_FAILURE";

// 사용자 계정 삭제 리스트
export const MANAGER_USER_DROP_REQUEST = "MANAGER_USER_DROP_REQUEST";
export const MANAGER_USER_DROP_SUCCESS = "MANAGER_USER_DROP_SUCCESS";
export const MANAGER_USER_DROP_FAILURE = "MANAGER_USER_DROP_FAILURE";

const initalState = {
  USER_LIST_loading: false,
  USER_LIST_done: false,
  USER_LIST_error: false,
	USER_LIST: [],
	USER_DROP_loading: false,
  USER_DROP_done: false,
  USER_DROP_error: false,
};

const R_manager_user = (state = initalState, action) => {
  switch (action.type) {
    // 전체 회원 조회 케이스들
    case MANAGER_USER_LIST_REQUEST:
      return {
        ...state,
        USER_LIST_loading: true,
        USER_LIST_done: false,
        USER_LIST_error: false,
      };
    case MANAGER_USER_LIST_SUCCESS:
      return {
        ...state,
        USER_LIST_loading: false,
        USER_LIST_done: true,
        USER_LIST_error: false,
        USER_LIST: action.data
      };
    case MANAGER_USER_LIST_FAILURE:
      return {
        ...state,
        USER_LIST_loading: false,
        USER_LIST_done: false,
        USER_LIST_error: true,
      };
		// 회원 추방 케이스들
    case MANAGER_USER_DROP_REQUEST:
      return {
        ...state,
        USER_DROP_loading: true,
        USER_DROP_done: false,
        USER_DROP_error: false,
      };
    case MANAGER_USER_DROP_SUCCESS:
      return {
        ...state,
        USER_DROP_loading: false,
        USER_DROP_done: true,
        USER_DROP_error: false,
        USER_LIST: state.USER_LIST.filter(user => user.uid !== action.data)
      };
    case MANAGER_USER_DROP_FAILURE:
      return {
        ...state,
        USER_DROP_loading: false,
        USER_DROP_done: false,
        USER_DROP_error: true,
      };
    default:
      return state;
  }
};

export default R_manager_user;
