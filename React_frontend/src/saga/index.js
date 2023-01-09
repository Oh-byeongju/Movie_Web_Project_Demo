import { all, fork } from "redux-saga/effects";
import S_user_joinSaga from "./S_user_join";
import tempSaga from "./temp";
import ticketSaga from "./ticket"

export default function* rootSaga() {
  yield all([
    fork(S_user_joinSaga),
    fork(tempSaga),
    fork(ticketSaga)]
    );
}

//사가 파일 추가 시 rootSaga 안에 fork해주면 됨
