/* 
	23-01-08 ~ 23-01-08 회원가입 시 필요한 사가 파일 작성(오병주)
*/

import { all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_ID_FAILURE,
  USER_ID_SUCCESS,
  USER_ID_REQUEST,
} from "../reducer/R_user_join";

function* IDcheck(action) {
  try {
    yield put({
      type: USER_ID_SUCCESS, //로그인 하는데 이상이 없으면 USER_LOGIN_SUCCESS 실행 , data 반환 reducer 폴더의 USER_LOGIN_SUCCESS로 이동
      data: action.data,
    });
    console.log(action.data);
  } catch (err) {
    yield put({
      type: USER_ID_FAILURE,
      data: action.err.data,
    });
  }
}

function* S_user_join() {
  yield takeLatest(USER_ID_REQUEST, IDcheck);
}

export default function* S_user_joinSaga() {
  yield all([fork(S_user_join)]);
}
