import { all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
} from "../reducer/user";

function* Login(action) {
  //Login을 실행하는 함수
  try {
    yield put({
      type: USER_LOGIN_SUCCESS, //로그인 하는데 이상이 없으면 USER_LOGIN_SUCCESS 실행 , data 반환 reducer 폴더의 USER_LOGIN_SUCCESS로 이동
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
  //yield takeLatest(USER_LOGOUT_REQUEST, LogOut)
}
//리듀서 USER_LOGIN_REQUEST 실행되면 Login 함수 자동 실행
//만약 다른 함수 추가하려면 위에 같이 추가하면 됨

export default function* userSaga() {
  yield all([fork(user)]);
}
// 위에 user함수를 user사가에 추가함. rootSaga에서 하던거랑 똑같은 거
