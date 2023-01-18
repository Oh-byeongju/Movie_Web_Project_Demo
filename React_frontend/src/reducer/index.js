import { combineReducers } from "redux";
import ticket from "./ticket";
import R_user_join from "./R_user_join";
import R_user_login from "./R_user_login";

const rootReducer = combineReducers({
  R_user_join,
  ticket,
  R_user_login
});
//리듀서 파일 생성 시 여기 추가하면 됨.

export default rootReducer;
