import { all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
} from "../reducer/user";

function* Login(action) {
  try {
    yield put({
      type: USER_LOGIN_SUCCESS,
      data: action.data,
    });
    console.log(action.data);
  } catch (err) {
    yield put({
      type: USER_LOGIN_FAILURE,
      data: action.err.data,
    });
  }
}

function* user() {
  yield takeLatest(USER_LOGIN_REQUEST, Login);
}

export default function* userSaga() {
  yield all([fork(user)]);
}
