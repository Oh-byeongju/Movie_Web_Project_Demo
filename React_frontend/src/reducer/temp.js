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
};

export const Info_reducer = () => ({
  //컴포넌트나 페이지에서 사용하려고 만든 함수
  type: USER_INFO_REQUEST
});

const temp = (state = initalState, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return {
        ...state,
        info_loading: true,
        info_done: false,
        info_error: null,
      };

    case USER_INFO_SUCCESS: //사가에서 실행되면 여기action 에 사가에서 준 data값이 저장됨 그래서 로그인 데이터가 필요할 때 infoData: action.data 이런식으로 사용가능
      return {
        ...state,
        info_loading: false,
        info_done: true,
        info_error: null,
      };

    case USER_INFO_FAILURE:
      return {
        ...state,
        info_loading: false,
        info_done: false,
        info_error: action.error,
      };

    default:
      return state;
  }
};

export default temp;
