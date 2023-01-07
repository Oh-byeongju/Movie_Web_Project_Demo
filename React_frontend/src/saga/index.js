import { all, fork } from "redux-saga/effects";
<<<<<<< HEAD
import ticketSaga from "./ticket";
=======
>>>>>>> 3b9414709166e524783b8b514da5704e07baaaa0
import userSaga from "./user";
import tempSaga from "./temp";

export default function* rootSaga() {
<<<<<<< HEAD
  yield all([fork(userSaga), fork(ticketSaga)]);
=======
  yield all([
    fork(userSaga),
    fork(tempSaga)]
    );
>>>>>>> 3b9414709166e524783b8b514da5704e07baaaa0
}

//사가 파알 추가 시 rootSaga 안에 fork해주면 됨
