import { combineReducers } from "redux";
import ticket from "./ticket";
import R_user_join from "./R_user_join";
import temp from "./temp";

const rootReducer = combineReducers({
  R_user_join,
  ticket,
  temp
});
//리듀서 파일 생성 시 여기 추가하면 됨.

export default rootReducer;
