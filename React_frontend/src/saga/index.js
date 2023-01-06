import { all, fork } from "redux-saga/effects";
import userSaga from "./user";
import tempSaga from "./temp";

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(tempSaga)]
    );
}
