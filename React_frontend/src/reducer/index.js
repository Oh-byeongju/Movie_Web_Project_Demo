import { combineReducers } from "redux";
import ticket from "./ticket";
import user from "./user";
const rootReducer = combineReducers({
  user,
  ticket,
});
//리듀서 파일 생성 시 여기 추가하면 됨.

export default rootReducer;
