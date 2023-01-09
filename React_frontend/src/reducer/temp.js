
export const USER_INFO_REQUEST = "USER_INFO_REQUEST";
export const USER_INFO_SUCCESS = "USER_INFO_SUCCESS";
export const USER_INFO_FAILURE = "USER_INFO_FAILURE";

// 이 파일 지금 수정 중 
// 이 파일 지금 수정 중 

const initalState = {
  //리듀서에서 값을 쓰려면 여기 추가하면 됨
  info_loading: false,
  info_done: false,
  info_error: null,
  Infos: [],
};


const temp = (state = initalState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        info_loading: true,
        info_done: false,
        info_error: null,
      };

    case USER_INFO_SUCCESS:

      console.log(action.data);
      console.log("위에껀 리듀서")
      return {
        ...state,
        info_loading: false,
        info_done: true,
        info_error: null,
        Infos: action.data,
      };

    case USER_INFO_FAILURE:
      return {
        ...state,
        info_loading: false,
        info_done: false,
        info_error: action.error,
      };

    default:
      return{
        ...state
      }
  }
};

export default temp;
