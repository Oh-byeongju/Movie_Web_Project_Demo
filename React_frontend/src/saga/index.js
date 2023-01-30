import { all, fork } from "redux-saga/effects";
import S_user_joinSaga from "./S_user_join";
import ticketSaga from "./ticket";
import S_user_loginSaga from "./S_user_login";
import movieSaga from "./movie";
export default function* rootSaga() {
  yield all([
    fork(S_user_joinSaga),
    fork(ticketSaga),
    fork(S_user_loginSaga),
    fork(movieSaga),
  ]);
}

//사가 파일 추가 시 rootSaga 안에 fork해주면 됨
