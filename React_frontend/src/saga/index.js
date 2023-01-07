import { all, fork } from "redux-saga/effects";
import ticketSaga from "./ticket";
import userSaga from "./user";
export default function* rootSaga() {
  yield all([fork(userSaga), fork(ticketSaga)]);
}

//사가 파알 추가 시 rootSaga 안에 fork해주면 됨
