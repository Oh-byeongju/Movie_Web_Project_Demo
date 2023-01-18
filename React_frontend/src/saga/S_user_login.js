/*
 23-01-19 로그인 구현(오병주)
*/
import { call, all, takeLatest, fork, put } from "redux-saga/effects";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
} from "../reducer/R_user_login";
import axios from "axios";

const baseUrl = "http://localhost:8080";

// 로그인 함수
function* UserLogin(action) {
  const result = yield call(Login, action.data);
  if (result.status === 200) {
    yield put({
      type: USER_LOGIN_SUCCESS,
      data: result.data
    });
  }
  else {
    yield put({
      type: USER_LOGIN_FAILURE,
      data: result.data
    });
  }
}

// 디비에 로그인 정보를 전달하고 토큰을 리턴
async function Login(data) {
	return await axios.post(baseUrl + "/normal/login", data)
  .then((response) => {
    return response;
  })
  .catch((error)=>{
    return error.response;
  })
};


function* USER_LOGIN() {
  yield takeLatest(USER_LOGIN_REQUEST, UserLogin);
}

export default function* S_user_loginSaga() {
  yield all([fork(USER_LOGIN)]);
}
