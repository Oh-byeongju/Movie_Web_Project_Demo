import { combineReducers } from "redux";
import ticket from "./ticket";
import R_user_join from "./R_user_join";
import R_user_login from "./R_user_login";
import R_user_movie from "./R_user_movie";
import movie from "./movie";
import seat from "./seat";
import TimeTable from "./TimeTable";
import R_mypage_movie from "./R_mypage_movie";
import Board from "./Board";
import R_mypage_reserve from "./R_mypage_reserve";
import R_manager_user from "./R_manager_user";
import R_manager_theater from "./R_manager_theater";
import R_manager_movieinfo from "./R_manager_movieinfo";
import R_manager_board from "./R_manager_board";

// 리듀서 파일 생성 시 여기 추가하면 됨.
const rootReducer = combineReducers({
  R_user_join,
  ticket,
  R_user_login,
  R_user_movie,
  movie,
  seat,
  TimeTable,
  R_mypage_movie,
  Board,
  R_mypage_reserve,
  R_manager_user,
  R_manager_theater,
  R_manager_movieinfo,
  R_manager_board
});

export default rootReducer;
